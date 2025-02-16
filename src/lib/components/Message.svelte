<script>
  import { sessionState } from "$lib/state/auth.svelte";
  import { chatState } from "$lib/state/chat.svelte";

  /** @type {import('./$types').PageProps} */
  let { message, key } = $props();
  let ref = $state();

  $effect(() => {
    ref.scrollIntoView({ behavior: "smooth" });
  });
</script>

<div
  bind:this={ref}
  class="message {message.senderId === sessionState.user.uid ? 'owner' : ''}">
  <div class="messageInfo">
    <img
      src={message.senderId === sessionState.user.uid
        ? sessionState.user.photoURL
        : chatState.user.photoURL}
      alt="" />
    <span>just now</span>
  </div>
  <div class="messageContent">
    <p>{message.messageText}</p>
    <img src={message.img} alt="" />
  </div>
</div>

<style>
  .message {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }

  .messageInfo {
    display: flex;
    flex-direction: column;
    color: gray;
    font-weight: 300;
  }

  .messageInfo img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  .messageContent {
    max-width: 80%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .messageContent p {
    background-color: white;
    padding: 10px 20px;
    border-radius: 0px 10px 10px 10px;
    max-width: max-content;
  }

  .messageContent img {
    width: 30%;
    border-radius: 10px;
  }

  .message.owner {
    flex-direction: row-reverse;
  }

  .message.owner .messageContent {
    align-items: flex-end;
  }

  .message.owner .messageContent p {
    background-color: #8da4f1;
    color: white;
    border-radius: 10px 0px 10px 10px;
  }
</style>
