<script>
  import { sessionState } from "$lib/state/auth.svelte";
  import { auth } from "$lib/firebase.js";
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { goto } from "$app/navigation";

  let email = $state("");
  let password = $state("");

  async function loginWithMail() {
    await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const { user } = userCredential;

      //-------New State
      sessionState.loggedIn = true;
      sessionState.user = user;

      goto("/");
    }).catch((error) => {
      return error;
    });
  }
</script>

<div class="home">
  <div class="registerForm">
    <form onsubmit={loginWithMail}>
      <h2>Login</h2>
      <input bind:value={email}
        type="text"
        name="email"
        placeholder="Your E-Mail-Address" />
      <input bind:value={password}
        type="password"
        name="password"
        placeholder="Your Password" />
      <button type="submit">Login</button>
    </form>
    <p>You don't have an account? <a href="/register">Register</a></p>
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

  .registerForm form button {
    background-color: #7b96ec;
    color: wheat;
    border: none;
    border-radius: 5px;
    outline: none;
    padding: 0.5rem;
    cursor: pointer;
  }

  .registerForm p {
    margin-top: 20px;
    font-size: 1rem;
  }
</style>
