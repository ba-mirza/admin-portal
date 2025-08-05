<template>
    <div style="height: 100vh; box-shadow: var(--el-border-color-light) 0px 0px 10px">
        <el-splitter>
            <el-splitter-panel :resizable="false" size="40%">
                <h1 class="text-lg font-bold text-center mt-60">Авторизация</h1>
                <div class="p-4">
                    <el-form label-width="auto" :model="form" class="w-full flex flex-col gap-4 px-30" @submit="toAuth">
                        <el-input v-model="form.login" type="email" placeholder="example@....kz" />
                        <el-input v-model="form.password" type="password" show-password />
                        <el-button type="primary" @click="toAuth">Login</el-button>
                    </el-form>
                </div>
            </el-splitter-panel>
            <el-splitter-panel :min="200">
                <div class="demo-panel">
                    <h1>Authorization</h1>
                </div>
            </el-splitter-panel>
        </el-splitter>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue"

const form = reactive({
    login: "",
    password: "",
});

const toAuth = (e: Event) => {
    e.preventDefault();
}
</script>