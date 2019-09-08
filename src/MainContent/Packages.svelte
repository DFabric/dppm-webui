<script context="module">
  import { authFetch } from "./store/loginState";

  const dataOrThowErrorFrom = json => {
    if (json.data) return json.data.sources;
    else throw json.errors;
  };
  const ListPackages = () =>
    authFetch("/src/?namespace=default-namespace")
      .then(result => result.json())
      .then(dataOrThowErrorFrom)
      .catch(console.error)
      .then(sources =>
        Promise.all(
          sources.map(source =>
            authFetch(`/pkg/${source}/?namespace=default-namespace`)
              .then(result => result.json())
              .then(json => ({
                data: dataOrThowErrorFrom(source),
                source
              }))
          )
        )
      );
  const install = pkg =>
    authFetch(`/pkg/${pkg.source}/${pkg.data.package}/${pkg.data.version}`)
      .then(console.log)
      .catch(console.debug);
</script>

<script>
  let packages = [];
  $: packages = packages;
  ListPackages().then(list => (packages = list));
</script>

<table class="table">
  {#each packages as pkg}
    <tr>
      <td>{pkg.data.package}</td>
      <td>{pkg.data.version}</td>
      <td>
        <button class="button" on:click={install(pkg)}>Install</button>
      </td>
    </tr>
  {/each}
</table>
