<script>
	import { enhance } from '$app/forms';
	import { auth } from '$lib/firebase';
	import { createUserWithEmailAndPassword } from 'firebase/auth';

	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();
</script>

<div class="home">
	<div class="registerForm">
		<form autocomplete="off" method="post" enctype="multipart/form-data" use:enhance>
			<h2>Register</h2>
			<input
				type="text"
        name="username"
				placeholder="Username" />
			<input
				type="text"
        name="email"
				placeholder="Email" />
			<input
				type="password"
        name="password"
				placeholder="Password" />
			<label for="pictfile">
				<i class="bi bi-file-earmark-plus-fill"></i>
				<span>Add an avatar</span>
			</label>
			<input
				type="file"
        name="pictfile"
				id="pictfile" />
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
