import { createContentLoader } from "vitepress";

export default createContentLoader("entries/**/*.md", { includeSrc: true });
