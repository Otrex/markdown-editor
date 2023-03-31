<template>
  <div
    class="h-screen z-50 w-full fixed top-0 left-0 backdrop-blur flex items-center justify-center"
  >
    <div class="bg-white p-4 rounded">
      <div class="cube-wrapper">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div
        class="uppercase tracking-[.3rem] text-sm font-medium text-gray-600 text-center"
      >
        loading
      </div>
    </div>
  </div>
</template>

<style scoped>
.cube-wrapper > div {
  display: inline-block;
  margin-right: 5px;
  width: 20px;
  aspect-ratio: 1/1;
  border-radius: 2px;
  background: grey;
  animation: grow 1s ease-in-out 0s infinite reverse;
}

.cube-wrapper > div:last-child {
  margin-right: 0px;
}

.cube-wrapper > div:nth-child(1) {
  animation-delay: 0s;
}

.cube-wrapper > div:nth-child(2) {
  animation-delay: 0.2s;
}

.cube-wrapper > div:nth-child(3) {
  animation-delay: 0.3s;
}

.cube-wrapper > div:nth-child(4) {
  animation-delay: 0.4s;
}

@keyframes grow {
  0% {
    transform: scale(1);
    background: slategray;
  }

  50% {
    transform: scale(0.2);
    background: yellow;
  }

  100% {
    transform: scale(1);
    background: orangered;
  }
}
</style>
