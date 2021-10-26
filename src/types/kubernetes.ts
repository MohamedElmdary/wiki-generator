import { v4 } from "uuid";

abstract class Base {
  public constructor(
    public id = v4(),
    public name: string = `Worker ${id}`,
    public node: number = 0,
    public cpu: number = 0,
    public diskSize: number = 0,
    public publicIp: boolean = false,
    public memory: number = 0,
    public rootFsSize: number = 0,
    public plantery: boolean = false
  ) {}
}

export class Master extends Base {}
export class Worker extends Base {}

export default class Kubernetes {
  public constructor(
    public id = v4(),
    public master = new Master(),
    public workers = [new Worker()],
    public secret: string = "",
    public sshKey: string = "",
    public metadata: string = "",
    public description: string = ""
  ) {}
}
