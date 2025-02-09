<script>
  import Input from './Input.svelte';
  import Messages from './Messages.svelte';
</script>

<div class="chat">
  <div class="chatInfo">
    <span>Name</span>
    <div class="chatIcons">
      <i class="bi bi-camera-video-fill"></i>
      <i class="bi bi-person-fill-add"></i>
      <i class="bi bi-three-dots-vertical"></i>
    </div>
  </div>
  <Messages></Messages>
  <Input></Input>
</div>

<style>
  .chat .chatInfo {
    height: 50px;
    background-color: #5d5b8d;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    color: gainsboro
  }

  .chatIcons {
    display: flex;
    gap: 10px;
  }

  .chatIcons i{
    font-size: 24px;
    cursor: pointer;
  }
</style>