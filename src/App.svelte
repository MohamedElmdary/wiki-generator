<script lang="ts">
  import Sidenav from "./elements/sidenav/Sidenav.wc.svelte";
  import yaml from "js-yaml";
  import type { ISidenavRoute } from "./types";

  let routes: ISidenavRoute[];
  fetch("/_sidenav.yaml")
    .then((res) => res.text())
    .then((res) => yaml.load(res) as ISidenavRoute[])
    .then((_routes) => (routes = _routes));
</script>

{#if routes}
  <Sidenav {routes} />
{/if}
