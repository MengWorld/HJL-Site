<script setup>
import {onMounted, onUpdated, ref} from "vue";
import axios from "axios";

let userId = ref(0);
let title = ref('');
let content = ref('');

let posts = ref([]);

function getPosts() {
  axios.get('/api/post/get-posts')
      .then(response => {
        if (response.status === 200) {
          // console.log(response.data);
          posts.value = response.data;
        } else {
          alert("获取失败");
        }
      })
      .catch(error => {
        console.error("获取过程中发生错误: ", error);
      });
}

function checkLoginStatus() {
  return axios.get('/api/user/check-login-status')
      .then(response => {
        userId.value = response.data.userId;
        console.log("userId.value is ", userId.value);
        return userId.value !== 0;
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          console.log("LoggedIn.value is false");
          return false;
        } else {
          console.error("Error checking login status", error);
          return false;
        }
      });
}

async function createPost() {
  const isLoggedIn = await checkLoginStatus();
  if (!isLoggedIn) {
    alert("请先登录");
    return;
  }
  if (title.value.length === 0) {
    alert("标题不能为空");
    return;
  }
  if (content.value.length === 0) {
    alert("正文不能为空");
    return;
  }
  console.log({
    userId: userId.value,
    title: title.value,
    content: content.value
  });
  axios.post('/api/post/create-post', {
    userId: userId.value,
    title: title.value,
    content: content.value
  })
      .then(response => {
        if (response.status === 200) {
          alert("提交成功");
          title.value = '';
          content.value = '';
        } else {
          alert("提交失败");
        }
      })
      .catch(error => {
        console.error("提交过程中发生错误: ", error);
      });
}

onMounted(() => {
  getPosts();
});

onUpdated(() => {
  getPosts();
});

</script>

<template>
  <div class="container">
    <div class="alert alert-success my-4" role="alert" id="alert_message_board">
      <h4 class="alert-heading">欢迎来到深海自留地!</h4>
      <p class="mb-0">在这里写下想对雨木木说的话吧~</p>
    </div>
    <div>
      <label class="form-label" for="messageTextarea">留言</label>
    </div>
    <div class="mb-3">
      <input type="text" class="form-control" id="titleInput" placeholder="标题" v-model="title">
    </div>
    <div class="mb-3">
      <textarea class="form-control" id="contentTextarea" rows="3" placeholder="正文" v-model="content"></textarea>
    </div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end my-2">
      <button class="btn btn-primary" @click="createPost()" type="button">提交</button>
    </div>
    <hr>
    <div class="my-4">
      <h4>留言墙</h4>
      <ul class="list-group">
        <li v-for="post in posts" class="list-group-item">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <p class="card-text">{{ post.content }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
#alert_message_board {
  background-color: #cfe6c9;
  border-color: #add5a2;
  color: #569645;
}
</style>