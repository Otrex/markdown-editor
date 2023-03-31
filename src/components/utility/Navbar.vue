<template>
  <div class="flex flex-row justify-between bg-gray-600">
    <div class="flex flex-row">
      <a class="cursor-pointer" @click="() => (showSideBar = !showSideBar)">
        <div class="p-3 bg-slate-500">
          <app-svg name="menu" class="w-[2rem] h-[2rem] fill-white" />
        </div>
      </a>
      <div class="md:flex flex-row items-center hidden">
        <div
          class="inline-block text-white uppercase px-4 tracking-[.3rem] font-medium border-r border-r-slate-400 border-r-solid"
        >
          markdown
        </div>
        <div class="flex flex-row items-center">
          <a>
            <div class="p-3">
              <app-svg name="draft" class="w-[1.2rem] h-[1.2rem] fill-white" />
            </div>
          </a>
          <div class="flex flex-col text-white">
            <span class="text-xs font-extralight"> Document Name </span>
            <input v-model="fileName" class="bg-transparent text-sm" />
          </div>
        </div>
      </div>
      <div class="flex flex-row items-center md:hidden">
        <a>
          <div class="p-3">
            <app-svg name="draft" class="w-[1.5rem] h-[1.5rem] fill-white" />
          </div>
        </a>
        <div class="inline-block text-white">
          <input v-model="fileName" class="bg-transparent" />
        </div>
      </div>
    </div>
    <div class="flex flex-row items-center mr-0 md:mr-3">
      <a class="cursor-pointer" @click="triggerDownload">
        <div class="p-3">
          <app-svg
            name="download"
            class="w-[1.5rem] md:w-[1.2rem] h-[1.5rem] md:h-[1.2rem] fill-white"
          />
        </div>
      </a>
      <a class="cursor-pointer" @click="triggerDelete">
        <div class="p-3">
          <app-svg
            name="delete"
            class="w-[1.5rem] md:w-[1.2rem] h-[1.5rem] md:h-[1.2rem] fill-white"
          />
        </div>
      </a>
      <a
        @click="triggerSave"
        class="bg-orange-600 hidden md:flex flex-row p-[.45rem] px-3 hover:text-white hover:bg-orange-700 cursor-pointer text-white rounded-sm items-center gap-2"
      >
        <div class="">
          <app-svg name="save" class="w-[1.2rem] h-[1.2rem] fill-white" />
        </div>
        <div>Save Changes</div>
      </a>
      <a @click="triggerSave" class="md:hidden block cursor-pointer">
        <div class="p-[.9rem] bg-orange-600">
          <app-svg name="save" class="w-[1.7rem] h-[1.7rem] fill-white" />
        </div>
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import {
  fileName,
  save,
  showSideBar,
  activeFile,
  deleteFile,
  reset,
} from "../../store";
import { DEFAULT_FILE_NAME } from "../../utils";


function triggerSave() {
  const response = confirm("Do you want to save this file?");
  if (response) {
    save();
    alert("file saved successfully!!");
  }
}

function triggerDelete() {
  if (
    (!activeFile.value || activeFile.value === DEFAULT_FILE_NAME) &&
    (fileName.value === DEFAULT_FILE_NAME || !fileName.value)
  ) {
    return alert("no file to delete");
  }
  const response = confirm("Are you sure you want to delete this file?");
  if (!response) return;

  if (activeFile.value) {
    deleteFile(activeFile.value);
  }

  reset();

  alert("file deleted successfully!!");
}

function triggerDownload() {
  const sheet = document.getElementById("render-board");
  const head = document.querySelector("head");
  if (!sheet?.innerHTML) return;

  const a = window.open('', '', 'height=700, width=1000');

  a?.document.write('<html><body>');
  a?.document.write(head?.innerHTML!)
  a?.document.write(sheet?.parentElement?.innerHTML!);
  a?.document.write('</body></html>');
  a?.document.close();
  a?.print();
}
</script>
