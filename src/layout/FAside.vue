<template>
    <div class="w-full h-full">
        <el-menu :router="true" :default-active="currentActive" :default-openeds="[0]">
            <el-sub-menu v-for="item, index in menuList" :key="index" :index="index + ''">
                <template #title>
                    <component :is="item.icon" class="w-[20px] h-[20px] mr-2"></component>
                    <span>{{ item.name }}</span>
                </template>
                <el-menu-item v-for="child, cindex in item.children" :key="cindex" :index="child.path">
                    <component :is="child.icon" class="w-[20px] h-[20px] mr-2"></component>
                    <span>{{ child.name }}</span>
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script setup>
const menuList = [
    {
        name: "商品管理",
        icon: "Goods",
        children: [
            {
                name: "商品列表",
                icon: "GoodsFilled",
                path: '/goodlist'
            },
            {
                name: "商品分类",
                icon: "Menu",
                path: '/goodcategory'
            }
        ]
    }, {
        name: "用户管理",
        icon: "User",
        children: [
            {
                name: "用户列表",
                icon: "UserFilled",
                path: "/userlist"
            }, {
                name: "会员等级",
                icon: "Medal",
                path: "/userlevel"
            }
        ]
    }, {
        name: "图片管理",
        icon: "Picture",
        children: [
            {
                name: "图片列表",
                icon: "PictureFilled",
                path: "/piclist"
            }, {
                name: "图片类别",
                icon: "Menu",
                path: '/piccategory'
            }
        ]
    }
]

import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const currentActive = ref("/goodlist")
currentActive.value = route.path

</script>

<style></style>