import type BaseConfig from "./baseConfig";
import { HTTPMessageBusClient } from "ts-rmb-http-client";
import { GridClient } from "grid3_client";

interface IData {
  k8s?: any;
  machines?: any;
}

export default class DeployedList {
  private data: IData = {};
  private readonly grid: GridClient;

  constructor(readonly configs: BaseConfig) {
    const { proxyURL, url, mnemonics } = configs;
    const http = new HTTPMessageBusClient(0, proxyURL);
    this.grid = new GridClient(url, mnemonics, http);
    console.log(this.grid.machines.list());
  }

  public get kubernetes(): IData["k8s"] {
    return this._fallBackData("k8s");
  }

  public get vms(): IData["machines"] {
    return this._fallBackData("machines");
  }

  private _fallBackData<T extends keyof IData>(key: T) {
    // console.log(this.grid[key].list());
    // return this.grid[key].list();
    // return this.data[key] ?? [];
  }
}
