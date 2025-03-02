<script>
  import { getContext } from "svelte";
  let user = getContext('user');
</script>

<div class="navbar">
  <span class="logo">NetSys Messenger</span>
  <div class="user">
    <img src={user().photoURL} alt="" />
    <span>{user().displayName}</span>
    <form action="/logout" method="post">
      <button>Logout</button>
    </form>
  </div>
</div>

<style>
  .navbar img {
    background-color: aliceblue;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
  }

  .navbar {
    display: flex;
    align-items: center;
    background-color: #2f2d52;
    height: 50px;
    padding: 10px;
    justify-content: space-between;
    color: #ddddf7;
  }

  .logo {
    font-weight: bold;
  }

  .user {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .navbar button {
    background-color: #5d5b8d;
    color: #ddddf7;
    font-size: 10px;
    border: none;
    cursor: pointer;
    padding: 10px;
  }
</style>
