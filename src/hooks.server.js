import { auth } from "$lib/auth/firebase";
import { onAuthStateChanged } from "firebase/auth";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  onAuthStateChanged(auth, (user) => {
    if(user) {
      event.locals.user = user;
    } else {
      event.locals.user = null;
    }
  });

  return await resolve(event);
}
