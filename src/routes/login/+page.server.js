import { auth } from '$lib/auth/firebase';
import { redirect } from '@sveltejs/kit';
import { signInWithEmailAndPassword } from 'firebase/auth';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	if (!locals.user) {
		return { user: null };
	}

	const { uid, email, displayName, photoURL } = locals.user;

	return { user: { uid, email, displayName, photoURL } };
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		const user = await signInWithEmailAndPassword(auth, email, password)
		
		return redirect(302, '/');
	},
};
