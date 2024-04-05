<script setup>
import User from "@/components/User.vue";
import {onMounted, onUnmounted, onUpdated, ref} from "vue";
let ariaExpanded = ref(false);

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "attributes" && mutation.attributeName === "aria-expanded") {
      ariaExpanded.value = mutation.target.getAttribute("aria-expanded") === 'true';
      console.log("ariaExpanded.value is" + ariaExpanded.value);
    }
  });
});

onMounted(() => {
  const element = document.getElementById("aria_expanded");
  if (element) {
    observer.observe(element, {
      attributes: true
    });
  }
});

onUnmounted(() => {
  observer.disconnect();
});
</script>

<template>
  <div class="container-fluid" id="nav-container">
    <div class="container">
      <nav class="navbar navbar-expand-lg custom-navbar-bg">
          <router-link class="navbar-brand" to="/">
            <img alt="Logo" class="d-inline-block align-text-top" height="30"
                 src="../assets/img/logo.JPG"
                 width="30">
            &nbsp;
            <span style="color: #569645;">贺峻霖</span>
          </router-link>
          <button aria-controls="navbarSupportedContent" aria-expanded="false" id="aria_expanded"
                  aria-label="Toggle navigation"
                  class="navbar-toggler" data-bs-target="#navbarSupportedContent"
                  data-bs-toggle="collapse" type="button">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="menu">
              <li class="nav-item">
                <router-link to="/" class="nav-link" active-class="active">演艺经历</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/stage" class="nav-link" active-class="active">绝美舞台</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/var-show" class="nav-link" active-class="active">综艺影视</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/daily" class="nav-link" active-class="active">小贺日常</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/mes-board" class="nav-link" active-class="active">深海自留地</router-link>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input aria-label="Search" class="form-control me-2" placeholder="Search" type="search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            <User v-if="!ariaExpanded"/>
          </div>
      </nav>
      <User v-if="ariaExpanded"/>
    </div>
  </div>

</template>

<style scoped>
#nav-container {
  background-color: #ecf5ea !important;
}
.nav-item {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 20px;
  a {
    height: 100%;
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    color: #569645;
    transition: color 0.5s;
  }
}
.nav-item:hover {
  background-color: #569645;
  a {
    color: #ecf5ea;
  }
}
.navbar-nav .nav-link.active, .navbar-nav .nav-link.show {
  border-radius: 20px;
  background-color: #569645;
  color: #ecf5ea;
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>