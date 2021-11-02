import type { default as VM, Disk, Env } from "../types/vm";
import createNetwork from "./createNetwork";
import { HTTPMessageBusClient } from "ts-rmb-http-client";
import {
  DiskModel,
  MachineModel,
  MachinesModel,
  GridClient,
} from "grid3_client_ts";

export default function deployVM(data: VM) {
  const { configs, envs, disks, ...base } = data;
  const { name, flist, cpu, memory, entrypoint, network: nw } = base;
  const { publicIp, planetary, nodeId, rootFsSize } = base;
  const { mnemonics, proxyURL, url, twinId } = configs;

  const http = new HTTPMessageBusClient(twinId, proxyURL);
  const grid = new GridClient(twinId, url, mnemonics, http, name);

  const vm = new MachineModel();
  vm.name = name;
  vm.node_id = nodeId;
  vm.disks = disks.map(createDisk);
  vm.public_ip = publicIp;
  vm.planetary = planetary;
  vm.cpu = cpu;
  vm.memory = memory;
  vm.rootfs_size = rootFsSize;
  vm.flist = flist;
  vm.entrypoint = entrypoint;
  vm.env = createEnvs(envs);

  const vms = new MachinesModel();
  vms.name = name;
  vms.network = createNetwork(nw);
  vms.machines = [vm];

  return grid.machines.deploy(vms);
}

function createDisk({ name, size, mountpoint }: Disk): DiskModel {
  const disk = new DiskModel();
  disk.name = name;
  disk.size = size;
  disk.mountpoint = mountpoint;
  return disk;
}

function createEnvs(envs: Env[]): { [key: string]: string } {
  return envs.reduce((res, env) => {
    res[env.key] = env.value;
    return res;
  }, {});
}
