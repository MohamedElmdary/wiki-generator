<script lang="ts">
  import Sidenav from "./elements/sidenav/Sidenav.wc.svelte";
  import yaml from "js-yaml";
  import sidenavStore from "./store/sidenav.store";
  import type { ISidenavRoute } from "./types";
  import Router from "./components/Router.svelte";

  fetch("/_sidenav.yaml")
    .then((res) => res.text())
    .then((res) => yaml.load(res) as ISidenavRoute[])
    .then(sidenavStore.init);

  $: routes = $sidenavStore.routes;
</script>

<!-- <main style="padding-left: 300px"> -->
<!-- <Sidenav {routes} /> -->
<Router />
<!-- </main> -->
