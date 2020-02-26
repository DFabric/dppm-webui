<script>
  import Router from 'svelte-spa-router';
  import MainView from "./MainView.svelte";
  import Notifications from "./Notifications.svelte";
  import LoginForm from "./LoginForm.svelte";
  import { login } from "./store/loginState";
  import loginState from "./store/loginState";
  let loggedIn = false;
  loginState.subscribe(token => (loggedIn = token));
  const routes = {
    '/': MainView,
    '/login': LoginForm
  }
</script>

<Notifications />
<Router {routes} />
{#if loggedIn}
  <MainView />
{:else}
  <LoginForm on:submitted={login} ButtonLabel="Log In..." />
{/if}
