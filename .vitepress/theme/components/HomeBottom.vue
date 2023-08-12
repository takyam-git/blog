<script lang="ts" setup>
import { data } from "../../entries.data.ts";
import EditPageLink from "./EditPageLink.vue";
const entries = [...data].reverse().slice(0, 6);
</script>

<template>
  <div class="home-entries-container container">
    <h3 class="entries-title inner">
      <a href="/entries">Entries</a>
    </h3>

    <section class="home-entries inner">
      <a v-for="(entry, index) in entries" :key="index" :href="entry.url">
        <p class="article-title">{{ entry.frontmatter.title }}</p>
        <p v-if="entry.frontmatter.emoji" class="emoji">
          {{ entry.frontmatter.emoji }}
        </p>
        <p v-if="entry.frontmatter.date" class="date">
          {{ entry.frontmatter.date }}
        </p>
      </a>
    </section>
  </div>

  <div class="footer-container container">
    <div class="footer-inner inner">
      <div class="twitter-container">
        <ClientOnly>
          <a
            class="twitter-timeline"
            href="https://twitter.com/takos_dx?ref_src=twsrc%5Etfw"
          ></a>
        </ClientOnly>
      </div>
      <div class="footer-aside">
        <ClientOnly>
          <div class="edit-page-link-container">
            <EditPageLink label="新しい記事を書く" />
          </div>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding-left: 24px;
  padding-right: 24px;

  .inner {
    margin: 0 auto;
    max-width: 1152px;
  }
}
.home-entries-container {
  h3.entries-title {
    font-size: 1.4rem;
    font-weight: bolder;
    margin-bottom: 0.5rem;
  }

  .home-entries {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;

    a {
      display: flex;
      flex-direction: column;
      background-color: var(--vp-c-bg-soft);
      border: 1px solid var(--vp-c-border);
      padding: 24px;
      height: 100%;
      border-radius: 4px;

      &:hover {
        background-color: var(--vp-c-bg-soft-up);
      }

      .article-title {
        flex: 1;
      }

      .emoji {
        font-size: 64px;
        line-height: 64px;
        text-align: center;
        height: 100px;
        padding: 20px 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

.footer-container {
  margin-top: 3rem;
  padding: 0 24px;

  .footer-inner {
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;

    .twitter-container {
      width: 100%;
    }

    .footer-aside {
      .edit-page-link-container {
        text-align: center;
        padding-top: 3rem;
      }
    }
  }
}

@media (min-width: 640px) {
  .container {
    padding-left: 48px;
    padding-right: 48px;
  }
  .home-entries-container {
    h3.entries-title {
      grid-template-columns: 1fr 1fr;
    }

    .home-entries {
      grid-template-columns: 1fr 1fr;
    }
  }
}

@media (min-width: 960px) {
  .container {
    padding-left: 64px;
    padding-right: 64px;
  }
  .home-entries-container {
    h3.entries-title {
      grid-template-columns: 1fr 1fr 1fr;
    }

    .home-entries {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  .footer-container {
    .footer-inner {
      grid-template-columns: 1fr 1fr;

      .footer-aside {
        .edit-page-link-container {
          padding-top: 0;
        }
      }
    }
  }
}
</style>
