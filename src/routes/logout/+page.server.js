import { redirect } from "@sveltejs/kit";
import { signOut } from "firebase/auth";
import { auth } from "$lib/firebase";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
  const isLoggedIn = cookies.get("logged_in");

  if (isLoggedIn) {
    throw redirect(307, "/chat");
  } else {
    throw redirect(307, "/login");
  }
  return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ cookies }) => {
    await signOut(auth)
      .then(() => {
        cookies.delete('logged_in', {path: '/'})
      })
      .catch((error) => {
        // An error happened.
      });
  },
};
