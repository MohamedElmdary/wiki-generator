<script lang="ts">
  import DeployedList from "../elements/DeployedList/DeployedList.svelte";
  export let ctx: PageJS.Context;
  console.log(ctx);
  import K from "../elements/kubernetes/Kubernetes.wc.svelte";
</script>

<div style="padding: 20px;">
  <!-- <DeployedList /> -->
  <K />
</div>
