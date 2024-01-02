<script setup lang="ts">
import { FormRules, FormInstance } from "element-plus";
import { useUserStore } from "../stores/user";
import { reactive } from "vue";
// 可以在组件中的任意位置访问 `store` 变量 ✨
const userStore = useUserStore();
interface RuleForm {
    name: string
    password: string
}
const rules = reactive<FormRules<RuleForm>>({
    name: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
    ],
    password: [
        {
            required: true,
            message: "请输入密码",
            trigger: "blur",
        },
    ],
});
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-main>
                <el-form ref="ruleFormRef" :model="userStore.user" :rules="rules" label-width="120px" class="demo-ruleForm"
                    status-icon>
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="userStore.user.name" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="userStore.user.password" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(ruleFormRef)">
                            Create
                        </el-button>
                        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
    </div>
</template>

<style scoped></style>
