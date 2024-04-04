<script setup>

</script>

<template>
  <div class="container-fluid" id="nav-container">
    <div class="container">
      <nav class="navbar navbar-expand-lg custom-navbar-bg mx-4">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img alt="Logo" class="d-inline-block align-text-top" height="30"
                 src="../assets/img/logo.JPG"
                 width="30">
            &nbsp;
            <span style="color: #569645;">贺峻霖</span>
          </a>
          <button aria-controls="navbarSupportedContent" aria-expanded="false"
                  aria-label="Toggle navigation"
                  class="navbar-toggler" data-bs-target="#navbarSupportedContent"
                  data-bs-toggle="collapse" type="button">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="menu">
              <li class="nav-item">
                <router-link to="/" class="nav-link active">演艺经历</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/stage" class="nav-link">绝美舞台</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/var-show" class="nav-link">综艺影视</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/daily" class="nav-link">小贺日常</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/mes-board" class="nav-link">深海自留地</router-link>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input aria-label="Search" class="form-control me-2" placeholder="Search" type="search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
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
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 20px;
  a {
    color: #569645;
  }
}
.nav-item:hover {
  transition: 0.5s;
  background-color: #569645;
  a {
    color: #ecf5ea;
  }
}
</style>