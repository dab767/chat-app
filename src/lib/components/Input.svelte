<script>
  import { sessionState } from "$lib/state/auth.svelte";
  import { chatState } from "$lib/state/chat.svelte";
  import {
    arrayUnion,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
  } from "firebase/firestore";
  import { db, storage } from "$lib/firebase";
  import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
  import { v4 as uuid } from "uuid";

  let messageText = $state("");
  let messageImage = $state(null);

  const onFileSelected = (e) => {
    messageImage = e.target.files[0];
  };

  const handleSend = async () => {
    if (messageImage) {
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, messageImage).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", chatState.chatID), {
            messages: arrayUnion({
              id: uuid(),
              messageText,
              senderId: sessionState.user.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      });
    } else {
      await updateDoc(doc(db, "chats", chatState.chatID), {
        messages: arrayUnion({
          id: uuid(),
          messageText,
          senderId: sessionState.user.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", sessionState.user.uid), {
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
  };
</script>

<div class="input">
  <input type="text" placeholder="Type something..." bind:value={messageText} />
  <div class="send">
    <i class="bi bi-paperclip"></i>
    <input
      bind:this={messageImage}
      type="file"
      id="file"
      style="display: none"
      accept=".jpg, .jpeg, .png"
      onchange={(e) => onFileSelected(e)} />
    <label for="file">
      <i
        class="bi bi-image-fill"
        onclick={() => {
          file.click();
        }}
        bind:this={messageImage}></i>
    </label>
    <button onclick={handleSend}>Send</button>
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
  }

  .input input {
    width: 100%;
    border: none;
    outline: none;
    color: #2f2d52;
    font-size: 18px;
  }

  .input input::placeholder {
    color: rgb(172, 172, 172);
  }

  .send {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .send i {
    font-size: 24px;
    cursor: pointer;
  }

  .send button {
    border: none;
    padding: 10px 15px;
    color: white;
    background-color: #8da4f1;
    cursor: pointer;
  }
</style>
