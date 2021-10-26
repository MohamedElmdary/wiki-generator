import type { default as Kubernetes, Base } from "../types/kubernetes";
import { HTTPMessageBusClient } from "ts-rmb-http-client";
import {
  GridClient,
  K8SModel,
  KubernetesNodeModel,
  NetworkModel,
} from "grid3_client_ts";

export default function deployKubernetes(data: Kubernetes) {
  /* Extract Data */
  const { configs, master, workers, network: nw, ...base } = data;
  const { secret, sshKey, description, metadata, name } = base;
  const { twinId, proxyURL, mnemonics, url } = configs;

  const http = new HTTPMessageBusClient(twinId, proxyURL);
  const grid = new GridClient(twinId, url, mnemonics, http, name);
  const masterNodes = [createNode(master)];
  const workerNodes = workers.map(createNode);

  const network = new NetworkModel();
  network.name = nw.name;
  network.ip_range = nw.ipRange;

  const k8s = new K8SModel();
  k8s.name = name;
  k8s.secret = secret;
  k8s.network = network;
  k8s.masters = masterNodes;
  k8s.workers = workerNodes;
  k8s.metadata = metadata;
  k8s.description = description;
  k8s.ssh_key = sshKey;

  return grid.k8s.deploy(k8s);
}

function createNode(data: Base) {
  const node = new KubernetesNodeModel();
  node.name = data.name;
  node.node_id = data.node;
  node.cpu = data.cpu;
  node.disk_size = data.diskSize;
  node.memory = data.memory;
  node.public_ip = data.publicIp;
  node.rootfs_size = data.rootFsSize;
  node.planetary = data.plantery;
  return node;
}
