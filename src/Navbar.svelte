<script>
  import Burger from "./Navbar/Burger.svelte";
  export let user, pathStore;
  let path;
  pathStore.subscribe(newPath => (path = newPath));
  $: endOfPath = path[path.length - 1];
  // insert the appropriate padding for the fixed-position navbar. See
  // https://bulma.io/documentation/components/navbar/#fixed-navbar
  document.getElementsByTagName("body")[0].className = "has-navbar-fixed-top";
</script>

<div class="navbar is-dark is-fixed-top">
  <div class="navbar-brand">
    <a class="navbar-item" href="/index.html">
      <img src="/logo.png" alt="DPPM" />
    </a>
  </div>
  <Burger />
  <div class="navbar-menu">
    <div class="navbar-start">
      <div class="navbar-item">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            {#if path.length > 1}
              {#each path.slice(0, path.length - 1) as p}
                <li>
                  <div on:click={p.action}>{p.name}</div>
                </li>
              {/each}
            {/if}
            <li class="is-active">
              <div>{endOfPath.name}</div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          {#if user}
            <div class="button is-primary">Welcome, {user.name}!</div>
            <div class="button is-black">Sign out</div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
