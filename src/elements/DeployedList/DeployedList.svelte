<script lang="ts">
  import type { IFormField } from "../../types";

  import BaseConfig from "../../types/baseConfig";

  //   import DeployedList from "../../types/deployedList";
  //   import { HTTPMessageBusClient }  from 'ts-rmb-http-client';
  //   import { GridClient } from 'grid3_client';

  /* const http = new HTTPMessageBusClient(0, proxyURL);
  const grid = new GridClient(url, mnemonics, http, name); */

  // prettier-ignore
  const tabs = [
    { label: "Kubernetes", icon: "fab fa-docker" },
    { label: "Virtual Machines", icon: "fas fa-server" },
  ];
  let active: string = "Kubernetes";

  const data = new BaseConfig();
  let loading = false;
  let configed = false;
  //   let list: DeployedList;

  // prettier-ignore
  const configFields: IFormField[] = [
    { label: "Proxy URL", symbol: "proxyURL", placeholder: "Your Proxy URL." },
    { label: "URL", symbol: "url", placeholder: "Your substrate URL." },
    { label: "Mnemonics", symbol: "mnemonics", placeholder: "Your Mnemonics." },
  ];

  function onConfigHandler() {
    configed = true;
    // list = new DeployedList(data);
  }
</script>

<section class="box">
  <h4 class="is-size-4 mb-4">List Deployed Elements</h4>

  {#if !configed}
    <form on:submit|preventDefault={onConfigHandler}>
      {#each configFields as field (field.symbol)}
        <div class="field">
          <p class="label">{field.label}</p>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder={field.placeholder}
              bind:value={data[field.symbol]}
            />
          </div>
        </div>
      {/each}
      <div style="display: flex; justify-content: center;">
        <button disabled={!data.valid} type="submit" class="button is-primary">
          List Elements
        </button>
      </div>
    </form>
    <!--  -->
  {:else}
    <!--  -->
    <div class="tabs is-centered is-boxed is-medium">
      <ul>
        {#each tabs as tab (tab.label)}
          <li class={active === tab.label ? "is-active" : ""}>
            <a href="#!" on:click|preventDefault={() => (active = tab.label)}>
              <span class="icon is-small">
                <i class={tab.icon} aria-hidden="true" />
              </span>
              <span>{tab.label}</span>
            </a>
          </li>
        {/each}
      </ul>
    </div>

    {#if active === "Kubernetes"}
      <ul />
    {/if}
  {/if}
</section>
