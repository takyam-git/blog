<script setup lang="ts">
import { computed, ref } from "vue";
import axios from "axios";
import queryString from "query-string";
import dayjs from "dayjs";
import { data as entries } from "../../entries.data.ts";

const TOKEN_KEY = "github_token";

const query = ref(
  queryString.parse((window?.location.search ?? "").replace(/^\?/, "")),
);
const queryPath = computed(() => query.value?.path ?? null);
const targetEntry = computed(
  () =>
    (queryPath && entries.find((entry) => entry.url === queryPath.value)) ??
    null,
);
const toMarkdownPath = (url: string | null | undefined) =>
  url?.replace(/^\/entries\//, "").replace(/\.html/, ".md");
const createNewFilePath = () => {
  let newFileName = null;
  let number = 1;
  while (
    !newFileName ||
    entries.find((entry) => toMarkdownPath(entry.url) === newFileName)
  ) {
    newFileName = `${dayjs().format("YYYY/MM-DD")}-${number++}.md`;
  }
  return newFileName;
};
const filePath = ref<string>(
  (toMarkdownPath(targetEntry.value?.url) ?? createNewFilePath()).replace(
    /\.md/,
    "",
  ),
);

const body = ref<string>(
  targetEntry.value
    ? targetEntry.value.src
    : [
        "---",
        "layout: entry",
        "title: ",
        "emoji: ",
        `date: ${dayjs().format("YYYY年MM月DD日 HH時頃")}`,
        "---",
      ].join("\n"),
);

const token = ref(window?.localStorage.getItem(TOKEN_KEY) ?? "");
const tmpToken = ref(token.value);
const saveToken = () => {
  if (tmpToken.value.trim() === "") {
    return;
  }
  token.value = tmpToken.value.trim();
  window?.localStorage.setItem(TOKEN_KEY, token.value);
};
const clearToken = () => {
  if (!window.confirm("Do you want to clear token?")) {
    return;
  }
  token.value = "";
  tmpToken.value = "";
  window.localStorage.setItem(TOKEN_KEY, "");
};

const encodeBase64 = async (...text): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const value = reader.result as string;
      const offset = value.indexOf(",") + 1;
      resolve(value.slice(offset));
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(new Blob(text));
  });
};

const disabled = ref(false);
const onSaveEntry = async () => {
  if (disabled.value || body.value.trim() === "") {
    return;
  }
  const base64body = await encodeBase64(body.value);
  if (!window.confirm("Do you want to save entry?")) {
    return;
  }
  disabled.value = true;
  try {
    const apiUrl = `https://api.github.com/repos/takyam-git/blog/contents/entries/${filePath.value}.md`;
    const payload: Record<string, string> = {
      message: "save document from editor",
      branch: "main",
      content: base64body,
    };
    if (targetEntry.value) {
      const fileMetaResponse = await axios.get(apiUrl);
      payload.sha = fileMetaResponse.data.sha;
    }
    const res = await axios.put(apiUrl, payload, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token.value}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    window.alert("save succeed!");
  } catch (error) {
    console.error(error);
    window.alert(`save failed: ${error.message}`);
  } finally {
    disabled.value = false;
  }
};
</script>

<template>
  <ClientOnly>
    <div class="container">
      <form v-if="!token" class="token-form" @submit.prevent="saveToken">
        <div class="input-container">
          <label for="token-input">Input Github personal access token</label>
          <p>
            <a
              href="https://github.com/settings/tokens?type=beta"
              target="_blank"
              rel="noreferrer noopener nofollow"
              >Generate Github Token</a
            >
          </p>
          <input
            id="token-input"
            type="text"
            placeholder="input your personal access token"
            required
            v-model="tmpToken"
          />
        </div>
        <button type="submit" class="primary-button">save</button>
      </form>

      <div v-if="token" class="editor-container">
        <div class="editor-header">
          <a
            href="#"
            class="alt-button clear-button"
            @click.prevent="clearToken"
            >Clear Github token</a
          >
        </div>
        <div class="editor-body">
          <form class="edit-form" @submit.prevent="onSaveEntry">
            <input
              id="edit-file-name"
              v-model="filePath"
              type="text"
              pattern="^20[0-9]{2}/[0-9][0-9\-]+[0-9]$"
              :disabled="disabled"
            />
            <textarea
              v-model="body"
              class="body-textarea"
              :disabled="disabled"
            />
            <button type="submit" class="primary-button" :disabled="disabled">
              save
            </button>
          </form>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  max-width: 1152px;
  padding: 0 24px;

  form.token-form {
    display: flex;
    flex-direction: column;
    gap: 16px;

    label {
      font-weight: bold;
    }

    p {
      font-size: 0.8rem;
      margin-bottom: 0.2rem;
    }

    input {
      width: 100%;
    }
  }

  .editor-container {
    .editor-header {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-bottom: 2rem;

      a.clear-button {
        font-size: 0.6rem;
        padding: 0.1rem 0.6rem;
      }
    }
    .editor-body {
      form.edit-form {
        display: flex;
        flex-direction: column;
        gap: 16px;

        textarea.body-textarea {
          width: 100%;
          min-height: max(10rem, 55vh);
          padding: 1.2rem;
          border-radius: 0.4rem;
        }
      }
    }
  }
}
@media (min-width: 640px) {
  .container {
    padding: 0 48px;
  }
}
@media (min-width: 960px) {
  .container {
    padding: 0 64px;

    .editor-container {
      .editor-body {
        padding: 2rem;

        textarea.body-textarea {
        }
      }
    }
  }
}
</style>
