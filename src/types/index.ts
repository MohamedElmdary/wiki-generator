export interface IGlobalOptions {
  title?: string;
  theme?: "default" | "bulma";
  sidenav?: string | boolean;
}

export interface ISidenavRoute {
  label: string;
  path?: string;
  to?: string;
  disabled?: boolean;
  children?: ISidenavRoute[];
}
