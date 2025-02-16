<script>
  import {
    collection,
    query,
    where,
    getDocs,
    getDoc,
    doc,
    setDoc,
    updateDoc,
    serverTimestamp,
  } from "firebase/firestore";
  import { db } from "$lib/firebase";
  import { sessionState } from "$lib/state/auth.svelte";

  let searchInput = $state();
  let searchUser = $state();

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", searchInput)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      searchUser = doc.data();
    });
  };

  const handleClick = async () => {
    const combinedId =
      sessionState.user.uid > searchUser.uid
        ? sessionState.user.uid + searchUser.uid
        : searchUser.uid + sessionState.user.uid;

    const docRef = doc(db, "chats", combinedId);

    try {
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", sessionState.user.uid), {
          [combinedId + ".userInfo"]: {
            uid: searchUser.uid,
            displayName: searchUser.displayName,
            photoURL: searchUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", searchUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: sessionState.user.uid,
            displayName: sessionState.user.displayName,
            photoURL: sessionState.user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }

    searchUser = null;
    searchInput = "";
  };
</script>

<div class="search">
  <div class="searchForm">
    <input
      type="text"
      placeholder="Find a user"
      bind:value={searchInput}
      onchange={handleSearch} />
  </div>
  {#if searchUser}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="userChat" onclick={handleClick}>
      <img src={searchUser.photoURL} alt="" />
      <div class="userChatInfo">
        <span>{searchUser.displayName}</span>
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
