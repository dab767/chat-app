<script>
  import Message from "./Message.svelte";

</script>
<div class="messages">
  <Message></Message>
  <Message></Message>
  <Message></Message>
  <Message></Message>
  <Message></Message>
  <Message></Message>
  <Message></Message>
  <Message></Message>
</div>

<style>
  .messages{
    background-color: #ddddf7;
    padding: 10px;
    height: calc(100% - 100px);
    overflow: scroll;
  }
</style>