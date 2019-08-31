<script>
  import Navbar from "./Navbar.svelte";
  import { authFetch } from "./login";
  let me;
  const resetDisplay = () => (path = defaultNavbarPath);
  export const defaultNavbarPath = [
    {
      title: "DPPM",
      OnClick: resetDisplay
    }
  ];
  let path = defaultNavbarPath;
  authFetch("/user/me")
    .then(response => {
      if (!response.ok) {
        alert(`request for /user/me got code ${response.statusText}`);
        throw response.json();
      }
      return response.json();
    })
    .then(({ data }) => (me = data.currentUser))
    .catch(error =>
      error.errors && Array.isArray(error.errors)
        ? error.errors.forEach(console.error)
        : nil
    );
</script>

<Navbar user={me} {path} />
{#if me}Welcome, {me.name}!{:else}Loading...{/if}
