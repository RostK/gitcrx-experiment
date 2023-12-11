import { ManifestV3Export } from "@crxjs/vite-plugin";

export const manifest: ManifestV3Export = {
  manifest_version: 3,
  name: "GitHub repo info",
  version: "1.0.0",
  permissions: ["contextMenus", "sidePanel", "tabs"],
  background: {
    service_worker: "src/worker.ts",
    type: "module",
  },
  side_panel: {
    default_path: "index.html",
  },
};
