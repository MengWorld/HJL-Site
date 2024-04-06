<script setup>
import {ref} from "vue";
import axios from "axios";
import router from "@/router";

let login_email = ref('');
let login_password = ref('');

function login() {
  axios.post('/api/user/login', {
    email: login_email.value,
    password: login_password.value
  })
      .then(response => {
        if (response.status === 200) {
          alert("登录成功");
          router.push("/");
        } else {
          alert("登录失败");
        }
      })
      .catch(error => {
        console.error("登录过程中发生错误: ", error);
      });
}
</script>

<template>
  <div class="container my-5" id="loginFormContainer">
    <form id="loginForm" @submit.prevent="login">
      <div class="form-floating mb-3">
        <input class="form-control" id="login-email" placeholder="name@example.com"
               type="email" required v-model="login_email">
        <label for="login-email">邮箱</label>
      </div>
      <div class="form-floating">
        <input class="form-control" id="login-password" placeholder="Password"
               type="password" required v-model="login_password">
        <label for="login-password">密码</label>
      </div>
      <button class="btn btn-primary" id="login-button" type="submit">登录</button>
    </form>
    <div class="tip-for-register">
      <label class="my-3" style="text-align: center">
        <span>还没有账号？</span>
        <router-link to="/register">注册一个</router-link>
        <span>。</span>
      </label>
    </div>

  </div>
</template>

<style scoped>
#loginFormContainer {
  max-width: 500px;
  text-align: center;
}
#login-button {
  width: 100%;
  margin-top: 1rem;
}
.tip-for-register a {
  color: #569645;
}
</style>