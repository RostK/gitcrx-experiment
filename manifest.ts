import { ManifestV3Export } from "@crxjs/vite-plugin";
import { POPUP_PATH, SIDEPANEL_PATH } from "./src/consts";

export const manifest: ManifestV3Export = {
  manifest_version: 3,
  name: "GitHub repo info",
  version: "1.0.0",
  permissions: [
    "contextMenus",
    "sidePanel",
    "tabs",
    "storage",
    "activeTab",
    "scripting",
  ],
  background: {
    service_worker: "src/entrypoints/worker.ts",
    type: "module",
  },
  side_panel: {
    default_path: SIDEPANEL_PATH,
  },
  action: {
    default_title: "GitHub repos mentioned",
    default_popup: POPUP_PATH,
  },
};
