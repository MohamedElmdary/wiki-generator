import type { Network } from "../types/kubernetes";
import { NetworkModel } from "grid3_client";

export default function createNetwork(nw: Network): NetworkModel {
  const network = new NetworkModel();
  network.name = nw.name;
  network.ip_range = nw.ipRange;
  return network;
}
