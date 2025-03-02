<script>
  /** @type {{ data: import('./$types').PageData }} */
  let { data } = $props();
</script>

<div class="home">
  <div class="registerForm">
    <form method="post">
      <h2>Login</h2>
      <input
        type="text"
        name="email"
        placeholder="Your E-Mail-Address" />
      <input
        type="password"
        name="password"
        placeholder="Your Password" />
      <button type="submit">Login</button>
    </form>
    <p>You don't have an account? <a href="/register">Register</a></p>
  </div>
</div>

<style lang="scss">
  .registerForm {
    border: 1px solid white;
    border-radius: 10px;
    padding: 1.5rem;
    background-color: white;
    width: 30rem;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 1px 0px 26px 12px rgba(0, 0, 0, 0.51);

    form {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      width: 100%;

      input {
        height: 3rem;
        padding: 0.5rem;
        border: 1px solid #7b96ec;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: bold;
      }

      button {
        background-color: #7b96ec;
        color: wheat;
        border: none;
        border-radius: 10px;
        outline: none;
        padding: 0.5rem;
        cursor: pointer;
        height: 3rem;
      }
    }

    p {
      margin-top: 20px;
      font-size: 1rem;
    }
  }
</style>