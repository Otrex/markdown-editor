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
        <div class="flex w-full flex-row items-center">
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
          <input v-model="fileName" class="w-full bg-transparent" />
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
import Swal from 'sweetalert2'
import { DEFAULT_FILE_NAME } from "../../utils";
import { jsPDF } from "jspdf";

function ConvertHTMLToPDFAndDownload(elementHTML: HTMLElement) {
  const doc = new jsPDF();

  doc.html(elementHTML!, {
    callback: function(doc) {
      doc.save(`${fileName.value.split(".")[0]}.pdf`);
    },
    margin: [10, 10, 10, 10],
    // autoPaging: 'text',
    x: 0,
    y: 0,
    width: 190, //target width in the PDF document
    windowWidth: 675 //window width in CSS pixels
  });
}

function ConvertHTMLToPDFAndPrint(html: HTMLElement) {
  const a = window.open("", "", "height=700, width=1000");
  a?.document.write(html.innerHTML);
  a?.document.close();
  a?.print();
}

function triggerSave() {
  const response = confirm("Do you want to save this file?");
  if (response) {
    save();
    alert("file saved successfully!!");
  }
}

async function triggerDelete() {
  if (
    (!activeFile.value || activeFile.value === DEFAULT_FILE_NAME) &&
    (fileName.value === DEFAULT_FILE_NAME || !fileName.value)
  ) {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No entry to delete.',
      customClass: {
        confirmButton: '!bg-slate-500',
      }
    })
  }

  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  })

  if (!result.isConfirmed) return
  if (activeFile.value) {
    deleteFile(activeFile.value);
  }

  reset();

  Swal.fire(
    'Deleted!',
    'Your file has been deleted.',
    'success'
  )

}

async function triggerDownload() {
  const sheet = document.getElementById("render-board");
  const head = document.querySelector("head");
  if (!sheet?.innerHTML) return;

  const html = `
    <html>
      ${head!.innerHTML}
      <body>${sheet?.parentElement?.innerHTML}</body>
    </html>
  `;

  const div = document.createElement("div");
  div.innerHTML = html;

  const result = await Swal.fire({
    title: 'Select Your Download Style',
    text: "You can choose between print and the normal PDF download. `Trigger Print` provides the option of saving too",
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Download as PDF',
    cancelButtonText: 'Trigger Print'
  })
  result.isConfirmed ? 
    ConvertHTMLToPDFAndDownload(div) :
    ConvertHTMLToPDFAndPrint(div);
}
</script>
