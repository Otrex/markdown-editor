<template>
  <div class="w-full h-screen !overflow-hidden">
    <transition>
      <loading v-if="loading" />
    </transition>
    <div class="flex w-full overflow-hidden flex-row">
      <transition>
        <sidebar v-show="showSideBar" />
      </transition>
      <div class="w-full h-screen flex flex-col">
        <nav-bar />
        <main-content class="h-full w-full overflow-hidden" />
        <footer-bar />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import MainContent from "./components/pages/Main.vue";
import Loading from "./components/utility/Loading.vue";
import NavBar from "./components/utility/Navbar.vue";
import FooterBar from "./components/utility/Footer.vue";
import Sidebar from "./components/utility/Sidebar.vue";
import { loading, loadStore, showSideBar } from "./store";
import { onMounted } from "vue";

onMounted(() => {
  loading.value = true;
  loadStore();
  setTimeout(() => (loading.value = false), 3000);
});
</script>
<style scoped></style>
