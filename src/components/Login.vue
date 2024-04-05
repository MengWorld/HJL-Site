<script setup>

</script>

<template>
  <div class="container my-5" id="loginFormContainer">
    <form id="loginForm">
      <div class="form-floating mb-3">
        <input class="form-control" id="login-email" placeholder="name@example.com"
               type="email">
        <label for="login-email">邮箱</label>
      </div>
      <div class="form-floating">
        <input class="form-control" id="login-password" placeholder="Password"
               type="password">
        <label for="login-password">密码</label>
      </div>
    </form>
    <div><button class="btn btn-success" id="login-button" onclick="login()" type="button">登录</button></div>
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