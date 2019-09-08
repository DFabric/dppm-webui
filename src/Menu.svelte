<script>
  import { activeMenuItem } from "./store/menu";
  import Heading from "./Menu/Heading.svelte";
  import SubHeadings from "./Menu/SubHeadings.svelte";
  import SubHeading from "./Menu/SubHeading.svelte";
  const setActive = (item, depth = 0) => activeMenuItem.set({ item, depth });
</script>

<aside class="menu">
  <ul class="menu-list">
    <Heading text="Applications" action={() => setActive('Applications')} />
    <Heading text="Packages" action={() => setActive('Packages')} />
    <Heading text="Services" action={() => setActive('Services')} />
    <Heading text="Users" action={() => setActive('Users')}>
      <SubHeadings>
        <SubHeading
          text="Add"
          action={() => setActive('Users::Add', 1)}
          depth="1" />
      </SubHeadings>
    </Heading>
  </ul>
</aside>
