// https://vitepress.dev/guide/custom-theme
import { h, watch } from "vue";
import Theme from "vitepress/theme";
import "./style.css";
import Entry from "./Entry.vue";
import Editor from "./Editor.vue";

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.component("entry", Entry);
    app.component("editor", Editor);
    if (globalThis && globalThis.gtag) {
      watch(router.route, () => {
        globalThis.gtag("config", globalThis.GA_MEASUREMENT_ID, {
          page_path: router.route.path,
        });
      });
    }
  },
};
