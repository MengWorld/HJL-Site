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
      <div class="form-floating mb-3">
        <input class="form-control" id="login-password" placeholder="Password"
               type="password">
        <label for="login-password">密码</label>
      </div>
      <div class="form-floating mb-3">
        <input class="form-control" id="confirm-password" placeholder="Password"
               type="password">
        <label for="login-password">确认密码</label>
      </div>
    </form>
    <div><button class="btn btn-success" id="register-button" onclick="login()" type="button">注册</button></div>
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
</style>