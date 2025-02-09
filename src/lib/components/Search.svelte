<script>
  import { collection, query, where, getDocs } from "firebase/firestore";
  import { db } from "$lib/firebase";

  let userSearch = $state();
  let user = $state();

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userSearch)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      user = doc.data();
    });
  };
</script>

<div class="search">
  <div class="searchForm">
    <input
      type="text"
      placeholder="Find a user"
      bind:value={userSearch}
      onchange={handleSearch} />
  </div>
  {#if user}
  <div class="userChat">
    <img src={user.photoURL} alt="" />
    <div class="userChatInfo">
      <span>{user.displayName}</span>
    </div>
  </div>
  {/if}
</div>

<style>
  .search {
    border-bottom: 1px solid gray;
  }

  .searchForm {
    padding: 10px;
  }

  .searchForm input {
    background-color: transparent;
    border: none;
    color: white;
    outline: none;
  }

  .search .userChat {
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
    cursor: pointer;
  }

  .search .userChat:hover {
    background-color: #2f2d52;
  }

  .search .userChat img {
    background-color: white;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
</style>
