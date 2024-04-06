<script setup>
import axios from "axios";
import {onMounted, onUpdated, ref} from "vue";
import router from "@/router";

const loggedIn = ref(false)
function checkLoginStatus() {
  axios.get('/api/user/check-login-status')
      .then(response => {
        loggedIn.value = true;
        console.log("LoggedIn.value is true");
      })
      .catch(error => {
        loggedIn.value = false;
        if (error.response && error.response.status === 401) {
          console.log("LoggedIn.value is false");
        } else {
          console.error("Error checking login status", error);
        }
      });
}

function logout() {
  axios.get('/api/user/logout')
      .then(response => {
        if (response.status === 200) {
          alert("退出成功");
          checkLoginStatus();
          this.$nextTick(() => {
            router.push("/");
          });
        } else {
          alert("退出失败");
        }
      })
      .catch(error => {
        console.error("Error logging out", error);
      });
}

onMounted(() => {
  checkLoginStatus();
});

onUpdated(() => {
  checkLoginStatus();
});
</script>

<template>
  <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-show="!loggedIn">
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
  <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-show="loggedIn">
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        我
      </a>
      <ul class="dropdown-menu">
        <li>
          <router-link to="/profile" tag="a" class="dropdown-item">个人信息</router-link>
        </li>
        <li>
          <router-link to="/my-posts" tag="a" class="dropdown-item">我的帖子</router-link>
        </li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#" id="logout" @click="logout()">退出</a></li>
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