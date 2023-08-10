import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "takos.dev",
  description: "takos blog",
  lang: "ja",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    head: [["link", { rel: "icon", href: "/favicon.ico" }]],
    nav: [{ text: "Entries", link: "/entries" }],

    search: {
      provider: "local",
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/takyam-git" },
      { icon: "twitter", link: "https://twitter.com/takos_dx" },
      {
        icon: {
          svg: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 88.3 88.3" style="enable-background:new 0 0 88.3 88.3;" xml:space="preserve"><g><path class="st0" d="M3.9,83.3h17c0.9,0,1.7-0.5,2.2-1.2L69.9,5.2c0.6-1-0.1-2.2-1.3-2.2H52.5c-0.8,0-1.5,0.4-1.9,1.1L3.1,81.9 C2.8,82.5,3.2,83.3,3.9,83.3z"/><path class="st0" d="M62.5,82.1l22.1-35.5c0.7-1.1-0.1-2.5-1.4-2.5h-16c-0.6,0-1.2,0.3-1.5,0.8L43,81.2c-0.6,0.9,0.1,2.1,1.2,2.1 h16.3C61.3,83.3,62.1,82.9,62.5,82.1z"/></g></svg>',
        },
        link: "https://zenn.dev/takos",
      },
    ],
  },
});
