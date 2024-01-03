<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div>欢迎光临</div>
        <div>MaoriStoreManage</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2 class="title">欢迎回来</h2>
      <div>
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>
      <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon><user /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
            show-password>
            <template #prefix>
              <el-icon><lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            round
            color="#626aef"
            class="w-[250px]"
            type="primary"
            @click="onSubmit"
            :loading="loading"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { userStore } from "../store/user.ts";
import { login } from "../request/manager.js";
import router from "../router/index.ts";
const form = userStore();

function onSubmit() {
  login(form.username, form.password)
    .then((res) => {
      //   console.log("res :>> ", res);
      //本地存储保存token
      localStorage.setItem("token", res.data.token);
      console.log("res.data.token :>> ", res.data.token);
      router.push("/home");
    })
    .catch((err) => {
      console.log("err :>> ", err);
    });
}
</script>

<style scoped>
.login-container {
  @apply min-h-screen bg-indigo-500;
}
.login-container .left,
.login-container .right {
  @apply flex items-center justify-center;
}
.login-container .right {
  @apply bg-light-50 flex-col;
}
.left > div > div:first-child {
  @apply font-bold text-5xl text-light-50 mb-4;
}
.left > div > div:last-child {
  @apply text-gray-200 text-sm;
}
.right .title {
  @apply font-bold text-3xl text-gray-800;
}
.right > div {
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}
.right .line {
  @apply h-[1px] w-16 bg-gray-200;
}
</style>
