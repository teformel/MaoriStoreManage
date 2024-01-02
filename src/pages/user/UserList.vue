<template>
  <div class="flex">
        <el-text>关键词</el-text>
        <el-input v-model="keywords" class="h-[30px] w-[20%] ml-4" placeholder="昵称/手机号/邮箱"/>
        <el-button type="primary" class="ml-4" @click="handleSearch">搜索</el-button>
        <el-button type="primary">新增用户</el-button>
    </div>
    <el-table :data="tableData" class="mt-4">
        <el-table-column label="会员" width="350" align="center">
            <template #default="{row}">
                <div class="flex">
                    <el-avatar :size="50" :src="row.avatar"/>
                    <div class="ml-2 text-xs text-left">
                        <p class="text-sm">{{ row.username }}</p>
                        <p class="mt-1">ID:{{ row.id }}</p>
                    </div>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="会员等级" align="center" prop="user_level.name"></el-table-column>
        <el-table-column label="登录注册" align="center">
            <template #default="{ row }">
                注册时间：{{ row.create_time}}
            </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
            <template #default="{row}">
              <el-switch v-model="row.status"></el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template #default>
                <el-button plain>修改</el-button>
                <el-button type="danger">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="flex justify-center mt-4">
        <el-pagination :current-page="currentPage" background :total="totalCount" layout="prev,pager,next" @current-change="handleCurrentChange"></el-pagination>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import UserApi from '../../request/user'
const tableData = ref([])
let totalCount = 0   //保存商品数据的总条数
let currentPage = 1  //保存当前选中的页码数
let currentTab = "all" //保存当前选中的tab选项
const keywords = ref("")

function handleCurrentChange(page) {
  console.log(page)
    currentPage = page
    getUserData(page,keywords.value)
}

getUserData(1,"")

function getUserData(page,keywords){
  UserApi.getUserList(page,keywords).then(res => {
    console.log(res)
    tableData.value = res.data.list
    totalCount = res.data.totalCount
  }).catch(err => {
    console.log(err)
  })
}

function handleSearch() {
    currentPage = 1
    getUserData(currentPage,keywords.value)
}
</script>

<style>

</style>