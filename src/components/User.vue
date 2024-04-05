<script setup>
import axios from "axios";
import {onMounted} from "vue";

function checkLoginStatus() {
  axios.get('/check-login-status')
      .then(response => {
        this.loggedIn = response.data.loggedIn;
      })
      .catch(error => {
        console.error("Error checking login status", error);
      });
}

onMounted(() => {
  checkLoginStatus();
});
</script>

<template>
  <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="!loggedIn">
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        登录
      </a>
      <ul class="dropdown-menu">
        <li>
          <router-link to="/register" tag="a" class="dropdown-item">注册</router-link>
        </li>
        <li>
          <router-link to="/login" tag="a" class="dropdown-item">登录</router-link>
        </li>
      </ul>
    </li>
  </ul>
  <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-else>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        我
      </a>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">个人信息</a></li>
        <li><a class="dropdown-item" href="#">我的帖子</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#" id="logout">退出</a></li>
      </ul>
    </li>
  </ul>
</template>

<style scoped>
.dropdown-item:active {
  background-color: #7fb671;
}
#logout:active {
  background-color: #FF6347;
}
</style>