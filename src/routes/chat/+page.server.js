import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/firebase';

/** @type {import('./$types').PageServerLoad} */
export async function load({cookies}) {
  const isLoggedIn = cookies.get('logged_in');
   
  if(isLoggedIn) {
    const user = auth.currentUser;
  
    return {
      displayName: user.displayName,
      photoURL: user.photoURL,
    }
  } else {
    throw redirect(307, '/login')
  }   
}
