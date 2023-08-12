<script setup>
import { data } from "../../entries.data.ts";
const entries = [...data].reverse();
</script>

<template>
  <ul class="entries-container">
    <li v-for="(entry, index) in entries" :key="index" class="entry">
      <a :href="entry.url" class="link">
        <span v-if="entry.frontmatter.emoji" class="emoji">{{
          entry.frontmatter.emoji
        }}</span>
        <span class="title">{{ entry.frontmatter.title }}</span>
        <span v-if="entry.frontmatter.date" class="date">{{
          entry.frontmatter.date
        }}</span>
      </a>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.entries-container {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .entry {
    a.link {
      display: inline-flex;
      flex-direction: column;
      gap: 0.5rem;
      align-items: center;
      text-decoration: none;
      color: var(--vp-c-text-1);
      width: 100%;

      &:hover {
        color: var(--vp-c-text-2);
      }

      .emoji {
        flex: 0 0 auto;
        font-size: 48px;
        line-height: 48px;
      }

      .title {
        flex: 1;
      }

      .date {
        flex: 0 0 auto;
        font-size: 0.8rem;
      }
    }
  }
}

@media (min-width: 960px) {
  .entries-container {
    .entry {
      a.link {
        flex-direction: row;
        gap: 1rem;
      }
    }
  }
}
</style>
