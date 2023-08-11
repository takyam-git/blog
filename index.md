---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "takos.dev"
  text: "blog"
  tagline: WEB DEV in Tokyo.
  image:
    src: /images/takos.jpg
    style: "border-radius: 50%;"
---

<script setup>
import { data } from '.vitepress/entries.data.ts'; 
import EditPageLink from ".vitepress/theme/components/EditPageLink.vue"; 
const entries = [...data].reverse().slice(0, 6);
</script>

<div class="home-entries-container">
    <h3 class="entries-title">
        <a href="/entries">Entries</a>
    </h3>
    <section class="home-entries">
        <a v-for="(entry, index) in entries" :key="index" :href="entry.url">
            <p class="article-title">{{ entry.frontmatter.title }}</p>
            <p v-if="entry.frontmatter.emoji" class="emoji">{{ entry.frontmatter.emoji }}</p>
            <p v-if="entry.frontmatter.date" class="date">{{ entry.frontmatter.date }}</p>
        </a>
    </section>
</div>
<ClientOnly>
    <EditPageLink />
</ClientOnly>

<style>
.home-entries-container {
    padding: 0 24px;
}

.home-entries-container h3.entries-title {
    margin: 0 auto;
    max-width: 1152px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 16px;
    font-size: 1.4rem;
    font-weight: bolder;
}

.home-entries-container .home-entries {
    margin: 0 auto;
    max-width: 1152px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}

.home-entries-container .home-entries a {
    display: flex;
    flex-direction: column;
    background-color: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-border);
    padding: 24px;
    height: 100%;
    border-radius: 4px; 
}
.home-entries-container .home-entries a:hover {
    background-color: var(--vp-c-bg-soft-up);
}

.home-entries-container .home-entries a .article-title {
    flex: 1;
}

.home-entries-container .home-entries a .emoji {
    font-size: 64px;
    line-height: 64px;
    text-align: center;
    height: 100px;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.edit-link-container {
    margin-top: 5rem;
    text-align: center;
}

@media (min-width: 640px) {
    .home-entries-container {
        padding: 0 48px;
    }
    .home-entries-container h3.entries-title {
        grid-template-columns: 1fr 1fr;    
    }
    .home-entries-container .home-entries {
        grid-template-columns: 1fr 1fr;    
    }
}
@media (min-width: 960px) {
    .home-entries-container {
        padding: 0 64px;
    }
    .home-entries-container h3.entries-title {
        grid-template-columns: 1fr 1fr 1fr;    
    }
    .home-entries-container .home-entries {
        grid-template-columns: 1fr 1fr 1fr;    
    }
}
</style>
