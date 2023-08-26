import type { DataInitializer } from "./interfaces";

export const initState: DataInitializer = () => ({});

export const info = {
  type: "CDA_ELEMENT",
  version: "1.0",
  name: "Custom element",
  initState,
};
