<script>
  import { getContext } from "svelte";
  import { sessionState } from "$lib/state/auth.svelte";
  import { chatState } from "$lib/state/chat.svelte";
  import {
    arrayUnion,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
  } from "firebase/firestore";
  import { db, storage } from "$lib/auth/firebase";
  import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
  import { v4 as uuid } from "uuid";

  const currentUser = getContext('user');

  let messageText = $state("");
  let messageImage = $state(null);

  const onFileSelected = (e) => {
    messageImage = e.target.files[0];
  };

  const handleSend = async () => {
    //const messageRef = doc(db, "chats", chatState.chatID)

    if (messageImage) {
      const storageRef = ref(storage, uuid());
      
      await uploadBytesResumable(storageRef, messageImage).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, 'chats', chatState.chatID), {
            messages: arrayUnion({
              id: uuid(),
              messageText,
              senderId: currentUser().uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      });
    } else {
      await updateDoc(doc(db, 'chats', chatState.chatID), {
        messages: arrayUnion({
          id: uuid(),
          messageText,
          senderId: currentUser().uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser().uid), {
      [chatState.chatID + ".lastMessage"]: {
        messageText,
      },
      [chatState.chatID + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", chatState.user.uid), {
      [chatState.chatID + ".lastMessage"]: {
        messageText,
      },
      [chatState.chatID + ".date"]: serverTimestamp(),
    });
    messageText = "";
    messageImage = null;
  } 
</script>

<div class="input">
  <input type="text" placeholder="Type something..." bind:value={messageText} />
  <div class="send">
    <input
      bind:this={messageImage}
      type="file"
      id="file"
      style="display: none"
      accept=".jpg, .jpeg, .png"
      onchange={(e) => onFileSelected(e)} />
    <label for="file">
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <i
        class="bi bi-paperclip"
        style="font-size: 24px"
        onclick={() => {
          file.click();
        }}
        bind:this={messageImage}></i>
    </label>
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button onclick={handleSend}>
      <i class="bi bi-send-fill"></i>
    </button>
  </div>
</div>

<style>
  .input {
    background-color: white;
    height: 50px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    input {
      width: 100%;
      border: none;
      outline: none;
      color: #2f2d52;
      font-size: 18px;
    }

    input::placeholder {
      color: rgb(172, 172, 172);
    }
  }

  .send {
    display: flex;
    align-items: center;
    gap: 10px;

    button {
      border-radius: 50%;
      border: none;
      padding: 10px;
      color: white;
      background-color: #8da4f1;
      cursor: pointer;
    }
  }
</style>
