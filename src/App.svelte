<script lang="ts">
  import { onMount } from "svelte";
  import loadFile from "./utils/loadFile";

  onMount(async () => {
    const sidenav = await loadFile("/markdown/pages/sidenav.md");
    console.log(sidenav);
  });
</script>

<!-- <svelte:head>
  <script src="./build/elements/sidenav.wc.js"></script>
</svelte:head>

<tf-sidenav routes={JSON.stringify(routes)} /> -->
