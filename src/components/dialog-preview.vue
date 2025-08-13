<template>
    <el-dialog :model-value="dialogVisible" @update:model-value="$emit('update:dialogVisible', $event)"
        title="Предварительный контент" width="1280">
        <h1 class="text-2xl">{{ articleData.title }}</h1>
        <img :src="articleData.imagePreview" alt="previewImage">
        <div class="mt-2">
            <p class="opacity-50">{{ articleData.excerpt }}</p>
            <div :v-html="articleData.content"></div>
            <div class="mt-2">
                <template v-for="tag in articleData.tags" :key="tag">
                    <div class="border border-gray-300 rounded-lg p-2">{{ tag }}</div>
                </template>
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import type { FormRequestData } from '../types/article';

defineProps<{
    dialogVisible: boolean,
    articleData: FormRequestData
}>();

defineEmits<{
    (e: 'update:dialogVisible', value: boolean): void
}>();

</script>