import isValidInteger from "../utils/isValidInteger";

export default class BaseConfig {
  public constructor(
    public twinId: number = 0,
    public url: string = "",
    public proxyURL: string = "https://rmbproxy1.devnet.grid.tf",
    public mnemonics: string = ""
  ) {}

  public get valid(): boolean {
    const { twinId, proxyURL, mnemonics, url } = this;
    return (
      proxyURL !== "" &&
      mnemonics !== "" &&
      url !== "" &&
      isValidInteger(twinId)
    );
  }
}
