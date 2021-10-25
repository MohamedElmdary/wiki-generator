import { URL } from "../constants";
import yaml from "js-yaml";

export default function loadFile(path: string) {
  const isJson = path.endsWith(".json");
  return fetch(URL + path)
    .then((res) => res.text())
    .then((res) => (isJson ? JSON.parse(res) : yaml.load(res)))
    .catch(() => `Failed to load file '${path}'`);
}
