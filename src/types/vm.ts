import { v4 } from "uuid";
import BaseConfig from "./baseConfig";
import { Network } from "./kubernetes";

export class Mount {
  constructor(
    public id = v4(),
    public disk_name = id.split("-")[0],
    public mount_point = "/opt"
  ) {}
}

export class Env {
  constructor(
    public id = v4(),
    public key = "SSH_KEY",
    public value = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDTwULSsUubOq3VPWL6cdrDvexDmjfznGydFPyaNcn7gAL9lRxwFbCDPMj7MbhNSpxxHV2+/iJPQOTVJu4oc1N7bPP3gBCnF51rPrhTpGCt5pBbTzeyNweanhedkKDsCO2mIEh/92Od5Hg512dX4j7Zw6ipRWYSaepapfyoRnNSriW/s3DH/uewezVtL5EuypMdfNngV/u2KZYWoeiwhrY/yEUykQVUwDysW/xUJNP5o+KSTAvNSJatr3FbuCFuCjBSvageOLHePTeUwu6qjqe+Xs4piF1ByO/6cOJ8bt5Vcx0bAtI8/MPApplUU/JWevsPNApvnA/ntffI+u8DCwgP"
  ) {}
}

export class Disk {
  constructor(
    public id = v4(),
    public name = id.split("-")[0],
    public size = 2,
    public description = "this is my disk description"
  ) {}
}

export default class VM {
  constructor(
    /* Base */
    public id = v4(),
    public name = id.split("-")[0],
    public flist = "https://hub.grid.tf/tf-official-apps/base:latest.flist",
    public cpu = 1,
    public memory = 1024,
    public entrypoint = "/sbin/zinit init",

    /* Network */
    public network = new Network(),

    public mounts: Mount[] = [new Mount()],
    public envs: Env[] = [new Env()],
    public disks: Disk[] = [new Disk()],
    public publicIp = false,

    /* Configs */
    public configs = new BaseConfig()
  ) {}
}
