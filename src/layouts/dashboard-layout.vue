<template>
    <div class="common-layout">
        <el-container>
            <el-aside class="bg-white/50 border-r-1 border-gray-400 border-dashed" width="400px">
                <div class="flex justify-center mt-5">
                    <el-image class="mt-2" style="width: 250px;" src="/logo.png" fit="cover" lazy />
                </div>
                <div class="mt-10 m-auto w-2/3 border-1 rounded-lg border-gray-400 p-4 bg-white">
                    <div class="flex items-center justify-around">
                        <div>
                            <h1 class="select-none text-2xl font-medium">{{ user?.name }}</h1>
                            <h1 class="select-none text-md font-normal">Редактор</h1>
                        </div>
                        <el-button @click="logout">Logout</el-button>
                    </div>
                </div>
                <div
                    class="mt-6 m-auto w-2xs flex flex-col items-center justify-center border-1 rounded-2xl border-gray-300 p-4 h-auto bg-white">
                    <el-menu class="w-full" default-active="1" router>
                        <el-menu-item index="2" route="/dashboard/create-article">
                            <span>Создать</span>
                        </el-menu-item>
                        <el-menu-item index="2" route="/dashboard/articles">
                            <span>Статьи</span>
                        </el-menu-item>
                        <el-menu-item disabled index="3" route="/dashboard/categories">
                            <span>Категория</span>
                        </el-menu-item>
                    </el-menu>
                </div>
            </el-aside>
            <el-container class="layout-container">
                <el-main class="main-content">
                    <h1 class="text-2xl font-medium">{{ routeName }}</h1>
                    <RouterView />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { useAuth } from '../composables/useAuth';
import { useRoute } from 'vue-router';
import { ROUTES } from '../consts';
import { computed } from 'vue';

const { logout, user } = useAuth();
const route = useRoute();

const routeName = computed(() => { return ROUTES[route.name as string] })

</script>

<style scoped>
.common-layout {
    height: 100vh;
    width: 100vw;
}

.layout-container {
    height: 100vh;
}

.main-content {
    height: 100%;
    overflow-y: auto;
    padding: 2.5rem;
}
</style>