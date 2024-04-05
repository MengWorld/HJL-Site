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
    <div>
      <label class="my-3" style="text-align: center">还没有账号？<a data-bs-target="#registerModal"
                                                                   data-bs-toggle="modal"
                                                                   href="">注册一个</a>。</label>
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
</style>