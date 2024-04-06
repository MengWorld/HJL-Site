<script setup>
import {onMounted, onUpdated, ref} from "vue";
import axios from "axios";

let title = ref('');
let message = ref('');

function getPost() {
  axios.get('/api/post/get-post')
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
        } else {
          alert("获取失败");
        }
      })
      .catch(error => {
        console.error("获取过程中发生错误: ", error);
      });
}

function createPost() {
  if (title.value.length === 0) {
    alert("标题不能为空");
    return;
  }
  if (message.value.length === 0) {
    alert("正文不能为空");
    return;
  }
  axios.post('/api/post/create-post', {
    title: title.value,
    message: message.value
  })
      .then(response => {
        if (response.status === 200) {
          alert("提交成功");
          title.value = '';
          message.value = '';
        } else {
          alert("提交失败");
        }
      })
      .catch(error => {
        console.error("提交过程中发生错误: ", error);
      });
}

onMounted(() => {
  getPost();
});

onUpdated(() => {
  getPost();
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
      <input type="text" class="form-control" id="titleInput" placeholder="标题">
    </div>
    <div class="mb-3">
      <textarea class="form-control" id="messageTextarea" rows="3" placeholder="正文"></textarea>
    </div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end my-2">
      <button class="btn btn-outline-success" onclick="createPost()" type="button">提交</button>
    </div>
    <hr>
    <div class="my-4">
      <h4>留言墙</h4>
      <ul class="list-group">
        <li class="list-group-item">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">标题1</h5>
              <p class="card-text">正文1</p>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">标题2</h5>
              <p class="card-text">正文2</p>
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