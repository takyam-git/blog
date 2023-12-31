<script setup lang="ts">
import { computed, ref } from "vue";
import VPDoc from "vitepress/dist/client/theme-default/components/VPDoc.vue";
import { useData, useRoute } from "vitepress";
import { data as entries } from "../entries.data.ts";
import EditPageLink from "./components/EditPageLink.vue";
const data = useData();
const route = useRoute();
const title = computed(() => data.frontmatter?.value?.title ?? null);
const emoji = computed(() => data.frontmatter?.value?.emoji ?? null);
const date = computed(() => data.frontmatter?.value?.date ?? null);
const pageIndex = computed<number>(() =>
  (entries as { url: string }[]).findIndex((entry) => entry.url === route.path),
);
// 新しいのが「前」扱い
const prev = computed(() =>
  pageIndex.value >= entries.length - 1
    ? null
    : {
        text: entries[pageIndex.value + 1]?.frontmatter?.title ?? "-",
        link: entries[pageIndex.value + 1]?.url,
        emoji: entries[pageIndex.value + 1]?.frontmatter?.emoji ?? null,
      },
);
// 古いのが「次」扱い
const next = computed(() =>
  pageIndex.value <= 0
    ? null
    : {
        text: entries[pageIndex.value - 1]?.frontmatter?.title ?? "-",
        link: entries[pageIndex.value - 1]?.url,
        emoji: entries[pageIndex.value - 1]?.frontmatter?.emoji ?? null,
      },
);
</script>

<template>
  <VPDoc>
    <template #doc-before>
      <div class="entry-header">
        <p v-if="emoji" class="entry-emoji">{{ emoji }}</p>
        <div v-if="title || date" class="entry-title-date">
          <h1 v-if="title" class="entry-title">{{ title }}</h1>
          <div class="entry-date-container">
            <a v-if="prev" :href="prev.link" class="prev-next prev">
              <i class="material-icons">arrow_back</i>
            </a>
            <p v-if="date" class="entry-date">{{ date }} 投稿</p>
            <a v-if="next" :href="next.link" class="prev-next next">
              <i class="material-icons">arrow_forward</i>
            </a>
          </div>
        </div>
      </div>
    </template>
    <template #doc-after>
      <div class="footer-buttons-container">
        <a href="/"><i class="material-icons">home</i></a>
        <div class="twitter-share-button-container">
          <a
            href="https://twitter.com/share?ref_src=twsrc%5Etfw"
            class="twitter-share-button"
            data-show-count="false"
            data-size="large"
            >Tweet</a
          >
        </div>
      </div>
      <div v-if="prev || next" class="prev-next-container">
        <a v-if="prev" :href="prev.link" class="prev-next prev">
          <i class="material-icons">arrow_back</i>
          <span
            ><i v-if="prev.emoji">{{ prev.emoji }}</i
            >{{ prev.text }}</span
          >
        </a>
        <span v-if="!prev || !next" class="spacer" />
        <a v-if="next" :href="next.link" class="prev-next next">
          <span
            >{{ next.text }}<i v-if="next.emoji">{{ next.emoji }}</i></span
          >
          <i class="material-icons">arrow_forward</i>
        </a>
      </div>
    </template>
    <template #doc-bottom>
      <ClientOnly>
        <div class="edit-page-link-container">
          <edit-page-link :path="route.path" label="編集する" />
        </div>
      </ClientOnly>
    </template>
  </VPDoc>
</template>

<style lang="scss" scoped>
.entry-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 3rem;

  p.entry-emoji {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 6rem;
    line-height: 6rem;
  }

  .entry-title-date {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h1.entry-title {
      font-size: 2.2rem;
      line-height: 2.2rem;
      font-weight: bolder;
    }

    .entry-date-container {
      display: flex;
      gap: 1rem;

      p.entry-date {
        font-size: 0.8rem;
      }

      .prev-next {
        .material-icons {
          font-size: 0.8rem;
        }
      }
    }
  }
}
.footer-buttons-container {
  padding: 2rem 0;
  border-top: 1px solid var(--vp-c-border);
  display: flex;
  align-items: center;
  gap: 1rem;

  .twitter-share-button-container {
    background-color: white;
    border-radius: 22px;
    padding: 2px;
    overflow: hidden;
  }
}
.prev-next-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  a.prev-next {
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-border);
    border-radius: 8px;
    padding: 1.4rem;
    height: 100%;

    &:hover {
      background-color: var(--vp-c-bg-soft-up);
    }

    &.prev {
      justify-content: flex-start;
      text-align: left;

      span {
        i {
          margin-right: 0.5rem;
        }
      }
    }
    &.next {
      justify-content: flex-end;
      text-align: right;

      span {
        i {
          margin-left: 0.5rem;
        }
      }
    }

    i.material-icons {
      flex: 0 0 auto;
    }

    span {
      flex: 1;

      i {
        font-weight: normal;
        font-style: normal;
      }
    }
  }
}
.edit-page-link-container {
  padding: 3rem 0;
  text-align: center;
}
</style>
