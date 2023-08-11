<script lang="ts" setup>
import { ref, defineProps, computed } from "vue";
import queryString from "query-string";
const props = defineProps<{ path?: string }>();
const token = ref(window.localStorage.getItem("github_token") ?? "");
const editPageUrl = computed(() =>
  token ? `/edit/?${queryString.stringify({ path: props.path })}}` : null,
);
</script>

<template>
  <div class="edit-link-container">
    <div v-if="editPageUrl" class="edit-link-container">
      <a :href="editPageUrl"><i class="material-icons">edit</i> 編集する</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.edit-link-container {
  display: flex;
  justify-content: center;

  a {
    font-size: 0.8rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      color: var(--vp-c-text-2);
    }

    i.material-icons {
      font-size: 0.8rem;
    }
  }
}
</style>
