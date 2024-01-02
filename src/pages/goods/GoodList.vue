<template>
  <div>
    <div>
        <el-tabs v-model="currentTab" @tab-change="handleTabChange">
            <el-tab-pane v-for="item,index in tabs" :key="index" :label="item.label" :name="item.name"></el-tab-pane>
        </el-tabs>
    </div>
    <div class="flex">
        <el-text>关键词</el-text>
        <el-input v-model="keywords" class="h-[30px] w-[20%] ml-4" placeholder="请输入商品名称"/>
        <el-button type="primary" class="ml-4" @click="handleSearch">搜索</el-button>
        <el-button type="primary" @click="isShow=true">新增商品</el-button>
    </div>
    <el-table :data="tableData" class="mt-4">
        <el-table-column label="商品" width="350" align="center">
            <template #default="scoped">
                <div class="flex">
                    <el-image class="w-[80px] h-[80px]" :src="scoped.row.cover"></el-image>
                    <div class="ml-2 text-xs text-left">
                        <p class="text-sm">{{ scoped.row.title}}</p>
                        <p class="mt-1"><span class="text-red-400">￥{{ scoped.row.min_price }}</span><el-divider direction="vertical"/><span>￥{{ scoped.row.min_oprice}}</span></p>
                        <p class="text-gray-400 mt-1">分类：{{ scoped.row.category ? scoped.row.category.name : "未分类" }}</p>
                        <p class="text-gray-400 mt-1">创建时间：{{scoped.row.create_time}}</p>
                    </div>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="实际销量" align="center" prop="sale_count"></el-table-column>
        <el-table-column label="商品状态" align="center">
            <template #default="{row}">
                <el-tag :type="row.status == 0 ? 'danger':'success'">{{ row.status == 0 ? "仓库":"上架"}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="审核状态" align="center">
            <template #default="scoped">
                {{ scoped.row.ischeck == 1 ? "通过":'拒绝' }}
            </template>
        </el-table-column>
        <el-table-column label="总库存" align="center" prop="stock"></el-table-column>
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
    <el-drawer v-model="isShow" direction="rtl" size="40%">
    <template #header>
      <h4>新增商品</h4>
    </template>
    <template #default>
      <el-form label-position="right" label-width="100px">
        <el-form-item label="商品名称">
            <el-input placeholder="请输入商品名称，不能超过60个字符"></el-input>
        </el-form-item>
        <el-form-item label="封面">
            <el-upload
                class="avatar-uploader"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
            >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
        </el-form-item>
        <el-form-item label="商品分类">
            <el-select v-model="value" placeholder="Select" size="large">
                <el-option />
            </el-select>
        </el-form-item>
        <el-form-item label="商品描述">
            <el-input v-model="textarea" :rows="2" type="textarea"/>
        </el-form-item>
        <el-form-item label="单位">
            <el-input placeholder="件"></el-input>
        </el-form-item>
        <el-form-item label="总库存">
            <el-input-number v-model="num" :min="1" :max="100" controls-position="right"/>
        </el-form-item>
        <el-form-item label="库存预警">
            <el-input-number v-model="num" :min="1" :max="100" controls-position="right"/>
        </el-form-item>
        <el-form-item label="最低销售价">
            <el-input-number v-model="num" :min="1" :max="100" controls-position="right"/>
        </el-form-item>
        <el-form-item label="最低原价">
            <el-input-number v-model="num" :min="1" :max="100" controls-position="right"/>
        </el-form-item>
        <el-form-item label="库存显示">
            <el-radio-group v-model="radio2">
                <el-radio label="隐藏">隐藏</el-radio>
                <el-radio label="显示">显示</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="是否上架">
            <el-radio-group v-model="radio2">
                <el-radio label="仓库">仓库</el-radio>
                <el-radio label="上架">上架</el-radio>
            </el-radio-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button>cancel</el-button>
        <el-button type="primary">confirm</el-button>
      </div>
    </template>
  </el-drawer>
  </div>
</template>

<script setup>
import {ref} from 'vue'
const isShow = ref(false)
const tabs = [
    {
        label:'全部',
        name:'all'
    },
    {
        label:'审核中',
        name:'checking'
    },
    {
        label:'出售中',
        name:'saling'
    },{
        label:'已下架',
        name:'off'
    },{
        label:'库存预警',
        name:'min_stock'
    },
    {
        label:'回收站',
        name:'delete'
    }]
const tableData = ref([])
let totalCount = 0   //保存商品数据的总条数
let currentPage = 1  //保存当前选中的页码数
let currentTab = "all" //保存当前选中的tab选项
const keywords = ref("")
import GoodsApi from '../../request/goods'

getGoodsData(1,"all","")
function handleCurrentChange(page) {
    currentPage = page
    getGoodsData(currentPage,currentTab,"")

}

function getGoodsData(page,tab,keywords) {
    GoodsApi.getGoodList(page,tab,keywords).then(res => {
        console.log(res.data)
        tableData.value = res.data.list
        totalCount = res.data.totalCount
    }).catch(err=>{
        console.log(err)
    })
}

function handleTabChange(tab){
    console.log(tab)
    currentPage = 1
    currentTab = tab
    getGoodsData(currentPage,tab,"")
    
}

function handleSearch() {
    currentPage = 1
    getGoodsData(currentPage,currentTab,keywords.value)
}
</script>

<style>

</style>