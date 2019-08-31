<script>
  import Burger from "./Navbar/Burger.svelte";
  export let user, path;
  $: endOfPath = path[path.length - 1];
</script>

<div class="navbar is-dark">
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
                  <div on:click={p.OnClick}>{p.title}</div>
                </li>
              {/each}
            {/if}
            <li>
              <div on:click={endOfPath.OnClick}>{endOfPath.title}</div>
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
