<script setup lang="ts">
import { computed } from "vue";
import VPDoc from "vitepress/dist/client/theme-default/components/VPDoc.vue";
import { useData, useRoute } from "vitepress";
import { data as entries } from "../entries.data.ts";
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
      },
);
// 古いのが「次」扱い
const next = computed(() =>
  pageIndex.value <= 0
    ? null
    : {
        text: entries[pageIndex.value - 1]?.frontmatter?.title ?? "-",
        link: entries[pageIndex.value - 1]?.url,
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
      <div v-if="prev || next" class="prev-next-container">
        <a v-if="prev" :href="prev.link" class="prev-next prev">
          <i class="material-icons">arrow_back</i>
          <span>{{ prev.text }}</span>
        </a>
        <span v-if="!prev || !next" class="spacer" />
        <a v-if="next" :href="next.link" class="prev-next next">
          <span>{{ next.text }}</span>
          <i class="material-icons">arrow_forward</i>
        </a>
      </div>
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
    }
    &.next {
      justify-content: flex-end;
      text-align: right;
    }

    i.material-icons {
      flex: 0 0 auto;
    }

    span {
      flex: 1;
    }
  }
}
</style>
