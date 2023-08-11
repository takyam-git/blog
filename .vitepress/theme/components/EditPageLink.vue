<script lang="ts" setup>
import { ref, computed } from "vue";
import queryString from "query-string";
const props = defineProps<{ path?: string }>();
const token = ref(window.localStorage.getItem("github_token") ?? "");
const queryValue = computed(() => queryString.stringify({ path: props.path }));
const editPageUrl = computed(() =>
  token.value
    ? `/edit/${queryValue.value ? `?${queryValue.value}` : ""}`
    : null,
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
  padding: 3rem 0;

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
