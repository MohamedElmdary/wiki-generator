import type { IGlobalOptions } from "../types";

type Themes = IGlobalOptions["theme"];
export default function resolveTheme(theme: Themes): Themes {
  return "bulma";
}
