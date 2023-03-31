<template>
  <div
    class="w-[20rem] max-w-[20rem] h-screen bg-slate-700 md:relative flex flex-col justify-between absolute text-white"
  >
    <div
      class="md:hidden block absolute top-0 right-0 p-4 hover:bg-slate-500"
      @click="showSideBar = false"
    >
      <app-svg name="close" class="w-[1.5rem] h-[1.5rem] fill-white" />
    </div>
    <div>
      <div class="tracking-[.3rem] font-medium uppercase py-7 text-center">
        Saved files
      </div>
      <div class="px-4 mt-4 text-center" v-show="!files.length">
        No Saved files
      </div>
      <ul class="px-4" v-show="files.length">
        <li
          class="flex flex-row items-center mb-2 justify-between"
          v-for="(file, idx) in files"
          :key="idx"
        >
          <div class="flex items-center">
            <a
              :class="[
                'flex flex-row items-center text-white gap-2  hover:text-white border-l-slate-300 hover:border-l-orange-300  border-l-[.5rem] pl-3',
                file.isActive && ' border-l-green-500 hover:border-l-green-300',
              ]"
              @click="previewDocument(idx)"
            >
              <app-svg name="file" class="fill-white w-[1.2rem] h-[1.2rem]" />
              {{ file.fileName }}
            </a>
          </div>
          <div class="inline-block">
            <input type="checkbox" v-model="file.isSelected" />
          </div>
        </li>
      </ul>
    </div>

    <div class="px-4 mb-8" v-show="files.length">
      <a
        @click="deleteSeleted"
        class="bg-red-600 flex flex-row p-[.45rem] px-3 hover:text-white hover:bg-orange-700 cursor-pointer text-white rounded-sm items-center gap-2"
      >
        <div class="">
          <app-svg name="delete" class="w-[1.2rem] h-[1.2rem] fill-white" />
        </div>
        <div>Delete Selected</div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  files,
  previewDocument,
  deleteSeleted,
  showSideBar,
} from "../../store";
</script>

<style></style>
