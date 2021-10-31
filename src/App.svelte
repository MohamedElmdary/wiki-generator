<script lang="ts">
  import Notification from "./elements/notification/Notification.wc.svelte";
  import Button from "./elements/button/Button.wc.svelte";
  import K from "./elements/kubernetes/Kubernetes.wc.svelte";

  import markdownParser from "./utils/markdownParser";

  fetch("/seed.md")
    .then((res) => res.text())
    .then(markdownParser)
    .then(console.log)
    .catch(console.error);
</script>

<Notification deletable color="danger">
  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error vero
  voluptatibus eos ducimus. Fuga beatae a perferendis aspernatur neque, id quo
  deleniti aliquid <strong> voluptatum sequi</strong>, eveniet, iste officiis
  asperiores.
</Notification>

<Button color="primary" light>Hello world</Button>
<K />
