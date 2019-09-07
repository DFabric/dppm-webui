<script>
  import { activeMenuItem } from "../store/menu";
  import { default as Heading } from ".";
  import Category from "./Category";
  export let heading,
    action,
    subheadings = [],
    depth = 0;
  // The "::"-separated path the user has selected in the menu.
  let active = "Applications";
  activeMenuItem.subscribe(item => (active = item));
  const activeModifier = () => {
    const split = active.split("::");
    if (split.length < depth && split[depth] === header) return "is-active";
    return "";
  };
</script>

<li class={activeModifier()}>
  <div on:click={action}>{heading}</div>
  {#each subheadings as sh}
    {#if sh instanceof Category}
      <ul>
        <Heading {...sh} depth={depth + 1} />
      </ul>
    {:else}{console.error(sh)}{/if}
  {/each}
</li>
