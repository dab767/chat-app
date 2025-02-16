<script>
  import { auth, db, storage } from "$lib/firebase";
  import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
  import { doc, setDoc } from "firebase/firestore";
  import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
  import { error } from "@sveltejs/kit";
  import { sessionState } from "$lib/state/session.svelte";
  import { goto } from "$app/navigation";

  /** @type {{ data: import('./$types').PageData }} */
  let { data } = $props();

  let username = $state();
  let email = $state();
  let password = $state();
  let file = $state();
  let avatar = $state();
	let image = $state();

  const onFileSelected = (e) => {
    image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      avatar = e.target.result;
    };
  };

  async function handleRegister(e) {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = result;

      sessionState.loggedIn = true;
      sessionState.user = user;

      //create unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${username + "_" + date}`);

      //upload image
      await uploadBytesResumable(storageRef, image).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //update profile
            await updateProfile(result.user, {
              displayName: username,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", user.uid), {
              displayName: username,
              email,
              photoURL: downloadURL,
              uid: user.uid,
            });

            await setDoc(doc(db, "userChats", result.user.uid), {});
          } catch (err) {
            error(404, { message: err });
          }
        });
        goto("/");
      });
    } catch (err) {
      error(404, { message: err });
    }
  }
</script>

<div class="home">
  <div class="registerForm">
    <div class="form">
      <h2>Register</h2>
      <input bind:value={username} type="text" placeholder="Username" />
      <input bind:value={email} type="email" placeholder="Email" />
      <input bind:value={password} type="password" placeholder="Password" />
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <div class="image-input">
        <i
          class="bi bi-file-earmark-plus-fill"
          onclick={() => {
            file.click();
          }}></i>
        {#if avatar}
          <img class="avatar" src={avatar} alt="d" />
        {:else}
          <img
            class="avatar"
            src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
            alt="" />
        {/if}
        <input
          style="display:none"
          type="file"
          accept=".jpg, .jpeg, .png"
					onchange={(e)=>onFileSelected(e)}
          bind:this={file} />
      </div>
      <button onclick={(e) => handleRegister(e)}>Register</button>
    </div>
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

  .registerForm .form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
  }

  .registerForm .form .image-input {
    display: flex;
    flex-direction: row;
		gap: 3rem;
  }

  .registerForm .form input {
    border: none;
    outline: none;
    height: 2rem;
    padding: 0.5rem;
    border-bottom: 1px solid #7b96ec;
    font-size: 1rem;
  }

  .registerForm .form .image-input input[type="file"] {
    display: none;
    border: none;
    outline: none;
    height: 2rem;
    padding: 0.5rem;
    border-radius: 5px;
  }

  .registerForm .form button {
    background-color: #7b96ec;
    color: wheat;
    border: none;
    border-radius: 5px;
    outline: none;
    padding: 0.5rem;
    cursor: pointer;
  }

  .registerForm .form i {
    color: #8da4f1;
    font-size: 1.8rem;
    cursor: pointer;
  }

  .registerForm p {
    margin-top: 20px;
    font-size: 1rem;
  }

  .avatar {
    display: flex;
    height: 36px;
    width: 36px;
  }
</style>
