<template>
 <div class="w-2/2">
    <div class="p-4 border-1 bg-white border-gray-400 border-dashed rounded-lg mt-4">
        <el-table :data="dataArticles" style="width: 100%;">
            <el-table-column label="Превью" prop="coverImage">
                <template #default="scope">
                    <el-image preview-teleported :preview-src-list="coverImage" />
                </template>
            </el-table-column>
            <el-table-column label="Название" prop="title" />
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" size="medium" placeholder="Поиск" />
                </template>
            </el-table-column>
        </el-table>
    </div>
 </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { api } from '../api/axios';

const dataArticles = ref<Array<any>>([]);
const search = ref<string>('');

const getAllArticles = async () => {
    try {
        const { data } = await api.get('/articles/all');
        
        dataArticles.value = data;
    } catch(error) {
        console.error(error);
    }
}

onMounted(async () => {
    await getAllArticles();
})
</script>