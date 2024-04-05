<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

</script>

<template>
  <div id=app>
    <header>
      <Header/>
    </header>
    <main>
      <div class="container-fluid">
        <div class="container-fluid">
          <div class="container">
            <router-view/>
          </div>
        </div>
      </div>
    </main>
    <footer>
      <div class="container-fluid">
        <Footer/>
      </div>
    </footer>
  </div>
</template>

<style scoped>
#app {
  font-family: 思源宋体;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
#app main {
  flex: 1;
}
</style>
