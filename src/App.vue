<script setup>
import Header from "@/components/Header.vue";
</script>

<template>
  <div id = app>
    <header>
      <Header/>
    </header>

    <main>
      <router-view/>
    </main>
  </div>
</template>

<style scoped>
#app {
  font-family: 思源宋体;
}
</style>
