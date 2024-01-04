<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <!-- <div> -->
      <!-- <div>欢迎光临</div> -->
      <div class="text-light-500">MaoriStoreManage</div>
      <!-- </div> -->
    </el-col>
    <el-col :lg="24" :md="24" class="right">
      <el-card class="box-card h-[342px] w-[442px]">
        <h2 class="title">欢迎登录</h2>
        <div>
          <span class="line"></span>
          <span>账号密码登录</span>
          <span class="line"></span>
        </div>
        <el-form ref="ruleFormRef" :rules="rules" :model="form" class="w-[250px]">
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名">
              <template #prefix>
                <el-icon>
                  <user />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password>
              <template #prefix>
                <el-icon>
                  <lock />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button round color="#626aef" class="w-[250px]" type="primary" @click="submitForm(ruleFormRef)"
              :loading="loading">登
              录</el-button>
          </el-form-item>
        </el-form>
      </el-card>

    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { login } from '../request/user'
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { setTokenData } from '../request/localStores'
import router from '../router';

interface RuleForm {
  username: string
  password: string
}
const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 5, message: '用户名长度3-5个字符', trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'change',
    },
  ],
})
const form = ref({
  username: '', password: ''
})
const ruleFormRef = ref<FormInstance>()
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('登录!')
      login(form.value.username, form.value.password).then((res) => {
        console.log('res :>> ', res);
        // setTokenData(res.data.token)
        localStorage.setItem("token", res.data.token)
        router.push('/')
      }).catch((err) => {
        console.log('err :>> ', err);
      });
    } else {
      console.log('error!', fields)
    }
  })
}
</script>

<style scoped>
.login-container {
  @apply min-h-screen bg-blue-500;
}

.login-container .left,
.login-container .right {
  @apply flex items-center justify-center;
}

.login-container .right {
  @apply bg-light-50 flex-col;
}

.left>div>div:first-child {
  @apply font-bold text-5xl text-light-50 mb-4;
}

.left>div>div:last-child {
  @apply text-gray-200 text-sm;
}

.right .title {
  @apply font-bold text-3xl text-gray-800;
}

.right>div {
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.right .line {
  @apply h-[1px] w-16 bg-gray-200;
}
</style>
