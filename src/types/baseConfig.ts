import isValidInteger from "../utils/isValidInteger";

export default class BaseConfig {
  public constructor(
    public twinId: number = 0,
    public proxyURL: string = "",
    public mnemonics: string = ""
  ) {}

  public get valid(): boolean {
    const { twinId, proxyURL, mnemonics } = this;
    return proxyURL !== "" && mnemonics !== "" && isValidInteger(twinId);
  }
}
