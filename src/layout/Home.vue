<template>
  <div>
    <el-container class="h-screen">
        <el-header class="bg-blue-500 h-[64px] p-0">
            <FHeader/>
        </el-header>
        <el-container>
            <el-aside width="250px">
              <FAside/>
            </el-aside>
            <el-main class="bg-gray-100">
              <router-view/>
            </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script setup>
import FHeader from './FHeader.vue';
import FAside from './FAside.vue'
</script>

<style>

</style>