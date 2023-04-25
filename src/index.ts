import { App } from "vue";
import { SimpleJsonSchema } from "./components";

export default {
  install(app: App) {
    app.component("SimpleJsonSchema", SimpleJsonSchema);
  },
};
