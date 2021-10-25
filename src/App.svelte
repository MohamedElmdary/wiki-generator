<script lang="ts">
  import { onMount } from "svelte";
  import markdownParser from "./utils/markdownParser";

  onMount(() => {
    fetch(
      "https://raw.githubusercontent.com/threefoldfoundation/info_threefold_pub/main/wiki/qss/product/qss_algorithm.md"
    )
      .then((res) => res.text())
      .then((md) => {
        console.log(md);

        console.log(markdownParser(md));
      });
  });
</script>
