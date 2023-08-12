<script lang="ts" setup>
import { ref, computed } from "vue";
import queryString from "query-string";
const props = withDefaults(defineProps<{ path?: string; label: string }>(), {
  label: "編集する",
});
const token = ref(window.localStorage.getItem("github_token") ?? "");
const queryValue = computed(() => queryString.stringify({ path: props.path }));
const editPageUrl = computed(() =>
  token.value
    ? `/edit/${queryValue.value ? `?${queryValue.value}` : ""}`
    : null,
);
</script>

<template>
  <a :href="editPageUrl"
    ><i class="material-icons">edit</i> {{ props.label }}</a
  >
</template>

<style lang="scss" scoped>
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
</style>
