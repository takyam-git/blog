import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "takos.dev",
  description: "takos blog",
  lang: "ja",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Home", link: "/" }],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/takyam-git" },
      { icon: "twitter", link: "https://twitter.com/takos_dx" },
    ],
  },
});
