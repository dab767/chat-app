import { auth, db, storage } from '$lib/firebase';
import { redirect } from '@sveltejs/kit';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({cookies}) {
  const isLoggedIn = cookies.get("logged_in");

  if (isLoggedIn) {
    throw redirect(307, "/chat");
  }

	return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
		let data = await request.formData();

		let username = data.get('username');
		let email = data.get('email');
		let password = data.get('password');
		let pictfile = data.get('pictfile');
  
		try {
      //create User
			const res = await createUserWithEmailAndPassword(auth, email, password);

      //create unique image name
      const date = new Date().getTime();
			const storageRef = ref(storage, `${username + '_' + date}`);
			
      //upload image
      await uploadBytesResumable(storageRef, pictfile).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try{
            //update profile
            await updateProfile(res.user, {
              displayName: username,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              displayName: username,
              email,
              photoURL: downloadURL,
            })

            await setDoc(doc(db, "userChats", res.user.uid), {});

          } catch (error) {
            error(404, {message: error});
            
          }
        })
      });			
		} catch (error) {
			error(404, {message: error});
		}

    cookies.set("logged_in", true, {path: "/", maxAge: 86400})
	},
};
