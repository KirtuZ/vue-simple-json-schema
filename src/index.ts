import * as components from "./components";
import { App } from "vue";

const SJSLibraby = {
  install(app: App) {
    // Auto import all components
    for (const componentKey in components) {
      app.use((components as any)[componentKey]);
    }
  },
};

export default SJSLibraby;

// export all components as vue plugin
export * from "./components";
