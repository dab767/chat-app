<script>
  import Message from "./Message.svelte";
  import { db } from "$lib/auth/firebase";
  import { doc, onSnapshot } from "firebase/firestore";
  import { sessionState } from "$lib/state/auth.svelte";
  import { chatState } from "$lib/state/chat.svelte";

  let messages = $state();

  $effect(() => {
    const unsub = onSnapshot(doc(db, "chats", chatState.chatID), (doc) => {
      if (doc.exists()) {
        messages = doc.data().messages;
      }
    });
    return () => {
      unsub();
    };
  });
</script>

<div class="messages">
  {#each messages as message}
    <Message message={message} key={message.id}></Message>
  {/each}
</div>

<style>
  .messages {
    background-color: #ddddf7;
    padding: 10px;
    height: calc(100% - 100px);
    overflow: scroll;
  }
</style>
