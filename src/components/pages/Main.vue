<template>
  <div class="flex md:flex-row flex-col w-full h-full transit text-black">
    <div id="md" class="md:w-auto !w-full h-full overflow-hidden flex flex-col bg-slate-300">
      <div
        class="uppercase font-medium text-sm bg-slate-500 px-3 py-1 text-white"
      >
        markdown
      </div>
      <textarea
        class="p-3 w-full h-full items-stretch overflow-y-auto bg-transparent"
        v-model="content"
        resize-x="false"
      ></textarea>
    </div>

    <div id="preview" class="md:w-auto !w-full h-full flex flex-col overflow-hidden bg-slate-300">
      <div
        class="uppercase font-medium text-sm bg-slate-500 px-3 py-1 text-white"
      >
        preview
      </div>
      <div
        class="p-3 h-full overflow-y-auto"
        id="render-board"
        v-html="preview"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { fileName, content } from "../../store";
import { marked } from "marked";
import Split from "split.js";


type Orientation = 'horizontal' | 'vertical'
const orientation = ref<Orientation>();

const mediaQuery = () => {
  const mediaQuery = window.matchMedia('(min-width: 768px)')
  if (mediaQuery.matches) orientation.value = 'vertical';
  else orientation.value = 'horizontal';
}

onMounted(() => {
  Split(["#md", "#preview"], {
    direction: "horizontal",
    sizes: [100, 100],
    gutterSize: 2,
  });
  window.addEventListener("resize",() => {
    mediaQuery();
  })
});
const preview = computed(() => marked.parse(content.value));

</script>

<style>
.transit * {
  transition: all 0.2s;
}

textarea {
  resize: none;
  appearance: none;
  outline: none !important;
}

#render-board h1 {
  @apply text-3xl my-3;
}

#render-board h2 {
  @apply text-2xl my-2;
}

#render-board h3 {
  @apply text-xl my-1;
}

#render-board h4 {
  @apply text-lg;
}

#render-board h5 {
  @apply text-base;
}

#render-board p {
  @apply text-sm;
}
#render-board pre {
  @apply bg-slate-500 py-1 break-words text-white overflow-x-auto;
}
#render-board code,
#render-board blockquote {
  @apply text-sm;
}

#render-board ul {
  list-style-type: disc;
  @apply pl-5;
}
#render-board pre {
  @apply text-sm;
}

#render-board table {
  border: 1px solid #575757;
  @apply mt-1;
}

#render-board table tr {
  border: 1px solid #575757;
}

#render-board table td {
  border: 1px solid #575757;
  @apply p-1 px-2;
}

#render-board table th {
  border: 1px solid #575757;
  @apply p-1 px-2;
}

#render-board blockquote {
  @apply bg-slate-400 border-l-4 border-slate-700 pl-2;
}

#render-board blockquote blockquote {
  @apply bg-slate-400 border-l-0 pl-0;
}
</style>
