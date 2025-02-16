<script>
  import { db } from "$lib/firebase";
  import { doc, onSnapshot } from "firebase/firestore";
  import { sessionState } from "$lib/state/session.svelte";

  let chats = $state();

  $effect(() => {
    const unsub = onSnapshot(doc(db, "userChats", sessionState.user.uid), (doc) => {
      chats = Object.entries(doc.data());
    });

    return () => {
      unsub();
    }
  });
</script>

<div class="chats">

  {#each chats as chat}
  <div class="userChat" key={chat[0]}>
    <img src={chat[1].userInfo.photoURL} alt="" />
    <div class="userChatInfo">
      <span>{chat[1].userInfo.displayName}</span>
      <p>{chat[1].userInfo?.lastMessage}</p>
    </div>
  </div>
  {/each}
</div>

<style>
  .userChat {
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
    cursor: pointer;
  }

  .userChat:hover {
    background-color: #2f2d52;
  }

  .userChat img {
    background-color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }

  .userChat span {
    font-size: 18px;
    font-weight: 500;
  }

  .userChat p {
    font-size: 14px;
    color: #858585;
  }
</style>
