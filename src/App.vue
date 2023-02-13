<script setup lang="ts">
import DemoCheckboxTemplate from "./components/ElementDemo/DemoCheckboxTemplate.vue";
import CustomCheckboxTemplate from "./components/ElementDemo/CustomCheckboxTemplate.vue";
</script>

<template>
  <div>
    <DemoCheckboxTemplate />
    <CustomCheckboxTemplate />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
