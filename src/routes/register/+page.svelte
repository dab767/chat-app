<script>
	import { auth,db,storage } from '$lib/firebase';
	import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
	import { doc , setDoc} from "firebase/firestore";
	import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
	import { error } from '@sveltejs/kit';
	import { session } from "$lib/session.js";
	import { goto } from "$app/navigation";

	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();

	let username = $state('username');
	let email = $state('email');
	let password = $state('password');
	let file = $state('file');

	async function handleRegister() {
		try {
		const result = await createUserWithEmailAndPassword(auth, email, password);
		const { user } = result;

		session.update((cur) => {
			return {
				...cur,
				user,
				loggedIn: true,
				loading: false
			};
		});

		//create unique image name
		const date = new Date().getTime();
		const storageRef = ref(storage, `${username + '_' + date}`);

		//upload image
		await uploadBytesResumable(storageRef, file).then(() => {
			getDownloadURL(storageRef).then(async (downloadURL) => {
				try{
					//update profile
					await updateProfile(result.user, {
						displayName: username,
						photoURL: downloadURL,
					});
					//create user on firestore
					await setDoc(doc(db, "users", result.user.uid), {
						displayName: username,
						email,
						photoURL: downloadURL,
					})

					await setDoc(doc(db, "userChats", result.user.uid), {});

				} catch (err) {
					error(404, {message: err});
				}
			})
			goto('/');
		});
	} catch (err) {
		error(404, {message: err});
		}
	}
</script>

<div class="home">
	<div class="registerForm">
		<form enctype="multipart/form-data" onSubmit={handleRegister}>
			<h2>Register</h2>
			<input bind:value={username}
				type="text"
				placeholder="Username" />
			<input bind:value={email}
				type="text"
				placeholder="Email" />
			<input bind:value={password}
				type="password"
				placeholder="Password" />
			<label for="file">
				<i class="bi bi-file-earmark-plus-fill"></i>
				<span>Add an avatar</span>
			</label>
			<input bind:value={file}
				type="file"
        		name="file"
				id="file" />
			<button type="submit">Register</button>
		</form>
		<p>You have an account? <a href="/login">Login</a></p>
	</div>
</div>

<style>
	.registerForm {
		border: 1px solid white;
		border-radius: 10px;
		padding: 1.5rem;
		background-color: white;
		width: 30rem;
		font-size: 18px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.registerForm form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		width: 100%;
	}

	.registerForm form input {
		border: none;
		outline: none;
		height: 2rem;
		padding: 0.5rem;
		border-bottom: 1px solid #7b96ec;
		font-size: 1rem;
	}

	.registerForm form input[type='file'] {
		display: none;
		border: none;
		outline: none;
		height: 2rem;
		padding: 0.5rem;
		border-radius: 5px;
	}

	.registerForm form button {
		background-color: #7b96ec;
		color: wheat;
		border: none;
		border-radius: 5px;
		outline: none;
		padding: 0.5rem;
		cursor: pointer;
	}

	label {
		display: flex;
		justify-content: start;
		align-items: center;
		gap: 10px;
		cursor: pointer;
	}

	label i {
		color: #8da4f1;
		font-size: 1.5rem;
	}

	label span {
		color: #8da4f1;
	}

	.registerForm p {
		margin-top: 20px;
		font-size: 1rem;
	}
</style>
