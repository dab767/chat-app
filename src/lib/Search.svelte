<div class="search">
  <div class="searchForm">
    <input type="text" name="" id="" placeholder="Find a user">
  </div>
  <!--
  <div class="userChat">
    <img src="/images/avatar/robot.png" alt="">
    <div class="userChatInfo">
      <span>Dello</span>
    </div>
  </div>
  -->
</div>

<style>
  .search {
    border-bottom: 1px solid gray;
  }

  .searchForm {
    padding: 10px;
  }

  .searchForm input{
    background-color: transparent;
    border: none;
    color: white;
    outline: none;
  }
  
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

  .userChat img{
    background-color: white;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
</style>