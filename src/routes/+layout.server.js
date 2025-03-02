/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
  if (locals.user) {
    const { uid, email, displayName, photoURL } = locals.user;

    return { user: { uid, email, displayName, photoURL } };
  }

  return {}
}
