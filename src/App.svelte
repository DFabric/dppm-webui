<script>
  import MainView from "./MainView.svelte";
  import LoginForm from "./LoginForm.svelte";
  import { login } from "./store/loginState";
  import loginState from "./store/loginState";
  let loggedIn = false;
  loginState.subscribe(token => (loggedIn = token));
</script>

{#if loggedIn}
  <MainView />
{:else}
  <LoginForm on:submitted={login} ButtonLabel="Log In..." />
{/if}
