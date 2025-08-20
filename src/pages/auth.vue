<template>
    <div style="height: 100vh; box-shadow: var(--el-border-color-light) 0px 0px 10px">
        <el-splitter>
            <el-splitter-panel :resizable="false" size="40%">
                <h1 class="text-lg font-bold text-center mt-60">Авторизация</h1>
                <div class="p-4">
                    <el-form label-width="auto" :model="form" class="w-full flex flex-col gap-4 px-30" @submit="submitLogin">
                        <el-input v-model="form.email" type="email" placeholder="example@....kz" />
                        <el-input v-model="form.password" type="password" show-password />
                        <el-button type="primary" @click="submitLogin" :disabled="loading">Login</el-button>
                    </el-form>
                </div>
            </el-splitter-panel>
            <el-splitter-panel :min="200">
                <div class="flex justify-center mt-50">
                    <img class="scale-75" src="/logo.png" alt="logo"></img>
                </div>
            </el-splitter-panel>
        </el-splitter>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import { useAuth } from "../composables/useAuth";
import type { LoginCredentials } from "../types/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const { login, loading } = useAuth();

const errorMessage = ref<string>();
const form = reactive<LoginCredentials>({
    email: "",
    password: "",
});

const submitLogin = async () => {
    const result = await login(form);
    if(result.success) {
        router.push('/dashboard');
        return;
    }

    errorMessage.value = result.error;
}
</script>