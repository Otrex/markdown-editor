<template>
  <component :is="svg" v-bind="$attrs" />
</template>
<script setup lang="ts">
import { computed } from "vue";
import $vue from "../../assets/vue.svg";
import menu from "../../assets/menu.svg";
import file from "../../assets/file.svg";
import $delete from "../../assets/delete.svg";
import save from "../../assets/save.svg";
import app from "../../assets/app.svg";
import draft from "../../assets/draft.svg";
import close from "../../assets/close.svg";
import download from "../../assets/download.svg";

const data = {
  delete: $delete,
  download,
  menu,
  file,
  app,
  draft,
  save,
  close,
};

const props = defineProps<{ name: keyof typeof data }>();
const svg = computed(() => data[props.name] || $vue);
</script>
