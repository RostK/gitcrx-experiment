import { ManifestV3Export } from "@crxjs/vite-plugin";

export const manifest: ManifestV3Export = {
  manifest_version: 3,
  name: "GitHub repo info",
  version: "1.0.0",
  permissions: ["contextMenus", "sidePanel", "tabs", "storage"],
  background: {
    service_worker: "src/worker.ts",
    type: "module",
  },
  side_panel: {
    default_path: "index.html",
  },
  action: {
    default_title: "Click to open favourite repos",
  },
};
