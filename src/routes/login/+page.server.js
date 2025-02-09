import { redirect } from "@sveltejs/kit";
import { auth } from "$lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
  const isLoggedIn = cookies.get("logged_in");

  if (isLoggedIn) {
    throw redirect(307, "/chat");
  }
  return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        cookies.set('logged_in', true, {path: '/', maxAge: 86400})
      })
      .catch((e) => {
        const errorCode = e.code;
        const errorMessage = e.message;
        
        error(404, {message: errorMessage});
      });
  },
};
