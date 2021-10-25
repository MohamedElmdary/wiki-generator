import { writable } from "svelte/store";
import type { IGlobalOptions } from "../types";

function globalStore() {
  const { subscribe, set } = writable<IGlobalOptions>();

  return {
    subscribe,
    init(options?: IGlobalOptions) {
      const theme = options?.theme && options.theme === "default" ? "bulma" : options.theme; // prettier-ignore
      let sidenav = !options || options.sidenav === true ? '/configs/sidenav.yaml' : options.sidenav; // prettier-ignore

      set({
        title: options?.title ?? "$title",
        theme,
        sidenav,
      });
    },
  };
}

export default globalStore();
