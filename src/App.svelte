<svelte:head>
  <script src="./build/elements/textarea.wc.js"></script>
</svelte:head>

<tf-textarea classes="is-primary" placeholder="hello world" />

<!-- <script lang="ts">
  import globalStore from "./store/global.store";
  import { onMount } from "svelte";
  import loadFile from "./utils/loadFile";

  let routes: string;
  onMount(async () => {
    const configs = await loadFile("/markdown/configs.yaml");
    globalStore.init(JSON.parse(configs));

    const data = $globalStore;
    if (data.sidenav) {
      routes = await loadFile(data.sidenav as string);
    }
  });
</script>

<svelte:head>
  <script src="./build/elements/sidenav.wc.js"></script>
</svelte:head>

{#if routes}
  <tf-sidenav {routes} />
{/if} -->
