<script>
  import Attache from '$lib/assets/icons/paperclip.svg'
  import Image from '$lib/assets/icons/image.svg'
</script>

<div class="input">
  <input type="text" placeholder="Type something...">
  <div class="send">
    <i class="bi bi-paperclip"></i>
    <input type="file" id="file" style="display: none">
    <label for="file">
      <i class="bi bi-image-fill"></i>
    </label>
    <button>Send</button>
  </div>
</div>

<style>
  .input{
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

  .input input::placeholder{
    color:rgb(172, 172, 172)
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