<svelte:options tag={null} />

<script lang="ts">
  import type { IGlobalOptions } from "../../types";
  import resolveTheme from "../../utils/resolveTheme";
  import Kubernetes from "../../types/kubernetes";

  export let theme: IGlobalOptions["theme"];
  $: _theme = resolveTheme(theme);

  const data = new Kubernetes();

  interface IFormField {
    label: string;
    placeholder?: string;
    symbol: string;
    textarea?: boolean;
    type?: "text" | "number" | "checkbox";
  }

  const ID = new Date().getTime();

  // prettier-ignore
  const kubernetesFields: IFormField[] = [
    { label: "Secret", symbol: "secret", placeholder: "Your Secret." },
    { label: "SSH Key", symbol: "sshKey", placeholder: "Your SSH Key." },
    { label: "Metadata", symbol: "metadata", placeholder: "Your Metadata." },
    { label: "Description", symbol: "description", placeholder: "Your Description.", textarea: true },
  ];

  // prettier-ignore
  const baseFields: IFormField[] = [
    { label: "Name", symbol: "name", placeholder: "Enter name." },
    { label: "Node", symbol: "node", placeholder: "Node ID.", type: 'number' },
    { label: "CPU", symbol: "cpu", placeholder: "CPU Size.", type: 'number' },
    { label: "Disk Size", symbol: "diskSize", placeholder: "Disk Size.", type: 'number' },
    { label: "Public IP", symbol: "publicIp", placeholder: "", type: 'checkbox' },
    { label: "Memory", symbol: "memory", placeholder: "Memory Size.", type: 'number' },
    { label: "Root FS Size", symbol: "rootFsSize", placeholder: "Root File System Size.", type: 'number' },
    { label: "Plantery", symbol: "plantery", placeholder: "", type: 'checkbox' },
  ];

  function onDeployHandler() {
    console.log(data);
  }
</script>

{#if _theme === "bulma"}
  <h4 class="is-size-4">Deploy a Kubernetes</h4>
  <form on:submit|preventDefault={onDeployHandler}>
    {#each kubernetesFields as field (field.symbol)}
      <div class="field">
        <label class="label" for={`${field.symbol}-${ID}`}>
          {field.label}
        </label>
        <div class="control">
          {#if !field.textarea}
            <input
              id={`${field.symbol}-${ID}`}
              class="input"
              type="text"
              placeholder={field.placeholder}
              bind:value={data[field.symbol]}
            />
          {:else}
            <textarea
              class="textarea"
              placeholder={field.placeholder}
              bind:value={data[field.symbol]}
            />
          {/if}
        </div>
      </div>
    {/each}

    {#each data.workers as worker, wIdx}
      {#each baseFields as field}
        <div class="field">
          {#if field.type === "checkbox"}
            <label class="checkbox" for={`${field.symbol}-${ID}`}>
              <input type="checkbox" id={`${field.symbol}-${ID}`} />
              {field.label}
            </label>
          {:else if field.type === "number"}
            <label class="label" for={`${field.symbol}-${ID}`}>
              {field.label}
            </label>
            <div class="control">
              <input
                id={`${field.symbol}-${ID}`}
                class="number"
                type="text"
                placeholder={field.placeholder}
              />
              <!-- bind:value={data[field.symbol]} -->
            </div>
          {/if}

          <!-- <label class="label" for={`${field.symbol}-${ID}`}>
          {field.label}
        </label>

        <div class="control">
          {#if field.type === "checkbox"}
            checkbox

            {:else}
            <input
              id={`${field.symbol}-${ID}`}
              class="input"
              type="text"
              placeholder={field.placeholder}
              bind:value={data[field.symbol]}
            />
          {/if}
        </div> -->
        </div>
      {/each}
    {/each}

    <div class="actions">
      <button class="button is-primary" type="submit"> Deploy </button>
    </div>
  </form>
{/if}

<style lang="scss" scoped>
  @import "bulma/bulma.sass";

  .actions {
    display: flex;
    justify-content: flex-end;
  }
</style>
