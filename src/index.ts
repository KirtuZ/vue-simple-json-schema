import { App } from "vue";
import { VueSimpleJsonSchema } from "./components";

export default {
  install(app: App) {
    app.component("VueSimpleJsonSchema", VueSimpleJsonSchema);
  },
};

export { VueSimpleJsonSchema };
