<script lang="ts">
  export let ctx: PageJS.Context;
  $: {
    console.log(ctx);
  }
</script>

<h1>md viewer working! {ctx?.hash}</h1>
