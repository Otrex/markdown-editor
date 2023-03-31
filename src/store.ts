import { computed, ref, watch } from "vue";
import { DEFAULT_FILE_NAME, matchWordsRegex, useLocalStore } from "./utils";

type LocalFileType = { fileName: string; content: string };
export const tempDocumentStore = useLocalStore<LocalFileType>("temp-document", {
  content: "",
  fileName: DEFAULT_FILE_NAME,
});
export const savedDocumentsStore = useLocalStore<LocalFileType[]>(
  "saved-documents",
  []
);
export const activeFile = ref("");
export const loading = ref(true);
export const showSideBar = ref(false);
export const content = ref("");
export const fileName = ref(DEFAULT_FILE_NAME);
export const files = ref<
  (LocalFileType & { isActive?: boolean; isSelected?: boolean })[]
>([]);

watch([content, fileName], () => {
  tempDocumentStore.setItem({
    fileName: fileName.value,
    content: content.value,
  });
});

export const previewDocument = (idx: number) => {
  loading.value = true;
  const file = files.value[idx];
  content.value = file.content;
  fileName.value = file.fileName;
  activeFile.value = file.fileName;
  file.isActive = true;
  setTimeout(() => (loading.value = false), 2000);
};

export const reset = () => {
  content.value = "";
  fileName.value = DEFAULT_FILE_NAME;
};

export const save = () => {
  const document = {
    content: content.value,
    fileName: fileName.value,
  };

  const currentItems = savedDocumentsStore.getItem();

  const existingFileIdx = currentItems.findIndex(
    (item) => item.fileName === document.fileName
  );

  if (existingFileIdx !== -1) {
    const response = confirm(
      "Do you want to overwrite the already existing file?"
    );
    if (response) currentItems[existingFileIdx].content = document.content;
    else return alert("File not saved");
  } else {
    currentItems.push(document);
  }

  savedDocumentsStore.setItem([...currentItems]);

  files.value = savedDocumentsStore.getItem();
  activeFile.value =
    existingFileIdx !== -1
      ? currentItems[existingFileIdx].fileName
      : document.fileName;
  setActiveFile();
};

function setActiveFile() {
  const idx = files.value.findIndex(
    (file) => file.fileName === activeFile.value
  );
  if (idx !== -1) files.value[idx].isActive = true;
}

export const loadStore = () => {
  files.value = savedDocumentsStore.getItem();
  const draft = tempDocumentStore.getItem();

  content.value = draft?.content || "";
  fileName.value = draft?.fileName;
  activeFile.value = draft?.fileName;
};

export const deleteFile = (fileName: string) => {
  const currentItems = savedDocumentsStore.getItem();
  const idx = currentItems.findIndex((item) => item.fileName === fileName);

  if (idx !== -1) currentItems.splice(idx, 1);
  savedDocumentsStore.setItem(currentItems);
  files.value = currentItems;
  setActiveFile();
};

export const deleteSeleted = () => {
  const xfiles = files.value.filter((doc) => doc.isSelected);
  xfiles.forEach((file) => {
    deleteFile(file.fileName);
  });
};

export const wordcount = computed(
  () => content.value.match(matchWordsRegex())?.length
);
