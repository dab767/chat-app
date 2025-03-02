import { auth } from "$lib/auth/firebase";
import { redirect } from "@sveltejs/kit";
import { signOut } from "firebase/auth";

/** @type {import('./$types').Actions} */
export const actions = {
  default: async () => {
    const user = await signOut(auth);

    return redirect(302, "/login");
  },
};
