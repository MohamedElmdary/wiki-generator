class Worker {
  public constructor(
    public id: number = new Date().getTime(),
    public name: string = "",
    public node: number = 0,
    public cpu: number = 0,
    public diskSize: number = 0,
    public publicIp: boolean = false,
    public memory: number = 0,
    public rootFsSize: number = 0,
    public plantery: boolean = false
  ) {}
}

export default class Kubernetes {
  public constructor(
    /**
     * @INFO instead of adding master
     * we assume that 1st not in workers is the master
     * and 2nd one is a permenant worker
     */
    public workers: Worker[] = [
      new Kubernetes.Worker(),
      new Kubernetes.Worker(),
    ],
    public secret: string = "",
    public sshKey: string = "",
    public metadata: string = "",
    public description: string = ""
  ) {}

  public static get Worker() {
    return Worker;
  }
}
