<script>
  import { activeMenuItem } from "./store/menu";
  import Category from "./Menu/Category";
  import Heading from "./Menu/Heading.svelte";
  const categories = [
    new Category("Applications", () => activeMenuItem.set("Applications")),
    new Category("Packages", () => activeMenuItem.set("Packages")),
    new Category("Sources", () => activeMenuItem.set("Sources")),
    new Category("Services", () => activeMenuItem.set("Services")),
    new Category("Users", () => activeMenuItem.set("Users"), [
      new Category("Add", () => activeMenuItem.set("Users::Add"))
    ]),
    new Category("Groups", () => activeMenuItem.set("Groups"))
  ];
</script>

<aside class="menu">
  <ul class="menu-list">
    {#each categories as category}
      <Heading {...category} />
    {/each}
  </ul>
</aside>
