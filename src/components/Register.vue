<script setup>
import {ref} from "vue";
import axios from "axios";
import router from "@/router";

let register_email = ref('');
let register_username = ref('');
let register_password = ref('');
let confirm_password = ref('');

function register() {
  if (register_password.value.length < 6) {
    alert("密码长度不能小于6位");
    return;
  }
  if (register_password.value !== confirm_password.value) {
    alert("两次输入的密码不一致");
    return;
  }
  axios.post('/api/user/register', {
    email: register_email.value,
    username: register_username.value,
    password: register_password.value
  }, {
    headers: {'Content-Type': 'application/json'}
  })
      .then(response => {
        if (response.status === 200) {
          alert("注册成功");
          router.push("/login");
        } else {
          alert("注册失败");
        }
      })
      .catch(error => {
        console.error("注册过程中发生错误: ", error);
      });
}
</script>

<template>
  <div class="container my-5" id="loginFormContainer">
    <form id="loginForm" @submit.prevent="register">
      <div class="form-floating mb-3">
        <input class="form-control" id="register-email" placeholder="name@example.com"
               type="email" required v-model="register_email">
        <label for="login-email">邮箱</label>
      </div>
      <div class="form-floating mb-3">
        <input class="form-control" id="register-username" placeholder="username"
               type="text" required v-model="register_username">
        <label for="register-username">用户名</label>
      </div>
      <div class="form-floating mb-3">
        <input class="form-control" id="register-password" placeholder="Password"
               type="password" required v-model="register_password">
        <label for="login-password">密码</label>
      </div>
      <div class="form-floating mb-3">
        <input class="form-control" id="confirm-password" placeholder="Password"
               type="password" required v-model="confirm_password">
        <label for="login-password">确认密码</label>
      </div>
      <div class="mb-3" style="text-align: left">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
          <label class="form-check-label" for="invalidCheck">
            同意条款与条件
          </label>
          <div class="invalid-feedback">
            你必须同意后才能提交。
          </div>
        </div>
      </div>
      <button class="btn btn-primary" id="register-button" type="submit">注册</button>
    </form>
  </div>
</template>

<style scoped>
#loginFormContainer {
  max-width: 500px;
  text-align: center;
}
#register-button {
  width: 100%;
}
.form-check-input:checked {
  background-color: #569645;
  border-color: #569645;
}
</style>