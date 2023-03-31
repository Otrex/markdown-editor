<template>
  <div
    class="bg-slate-500 uppercase tracking-widest text-xs px-3 py-1 text-white"
  >
    Word Count: {{ wordcount || 0 }}
  </div>
</template>
<script setup lang="ts">
import { wordcount } from "../../store";
</script>
