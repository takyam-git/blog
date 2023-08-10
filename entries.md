---
theme: page
title: 最初のテスト投稿最初のテスト投稿最初のテスト投稿最初のテスト投稿最初のテスト投稿最初のテスト投稿最初のテスト投稿最初のテスト投稿
emoji: 👾
date: 2023/08/01 21:00
next: false
prev: false
---


<script setup>
import { data } from '.vitepress/entries.data.ts';
const entries = data.reverse();
</script>

<ul class="entries-container">
    <li v-for="(entry, index) in entries" :key="index" class="entry">
        <a :href="entry.url" class="link">
            <span v-if="entry.frontmatter.emoji" class="emoji">{{ entry.frontmatter.emoji }}</span>
            <span class="title">{{ entry.frontmatter.title }}</span>
            <span v-if="entry.frontmatter.date" class="date">{{ entry.frontmatter.date }}</span>
        </a>
    </li>
</ul>

<style scoped>
.entries-container {
    list-style: none;    
}
.entries-container a.link {
    display: inline-flex;
    column-gap: 16px;
    align-items: center;
    text-decoration: none;
    color: var(--vp-c-text-1);
}
.entries-container a.link:hover {
    color: var(--vp-c-text-2);
}
.entries-container a.link .emoji {
    flex: 0 0 auto;
    font-size: 48px;
}
.entries-container a.link .title {
    flex: 1;
}
.entries-container a.link .date {
    flex: 0 0 auto;
    font-size: 0.8rem;
}
</style>