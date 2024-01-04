<template>
  <div class="flex items-center h-full justify-between">
    <div>
      <div class="inline-flex w-[250px] justify-center items-center">
        <el-icon class="logo mr-2">
          <ElemeFilled />
        </el-icon>
        <span class="logo">商品管理系统</span>
      </div>
      <el-icon class="icon">
        <Fold />
      </el-icon>
      <el-icon class="icon">
        <Refresh />
      </el-icon>
    </div>
    <div class="flex items-center mr-8">
      <el-icon class="icon">
        <FullScreen />
      </el-icon>
      <el-avatar :size="50" class="mx-4" />
      <el-dropdown>
        <span class="text-light-50 outline-none">admin
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item @click="handleLogup">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { logout } from '../request/localStores.js'
import router from "../router/index";
const handleLogup = () => {
  logout()
  router.push('/login')
}
</script>

<style scoped>
.logo {
  @apply text-light-50 text-xl;
}

.icon {
  @apply w-[42px] h-[64px] text-light-50;
}

.icon:hover {
  @apply bg-blue-400;
}
</style>
