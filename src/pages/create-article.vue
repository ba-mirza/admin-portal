<template>
    <div class="w-2/3">
        <h1 class="text-2xl font-medium">Создане статьи</h1>
        <div class="p-4 border-1 bg-white border-gray-400 border-dashed rounded-lg mt-4">
        <el-button @click="openPreview" type="primary" plain class="mb-4">Предварительный просмотр</el-button>
            <DialogPreview v-model:dialog-visible="previewShow" :article-data="formData" />
            <el-form label-position="top" :model="formData">
                <UploadImage @ready-image="handleImage" />
                <el-form-item label="Категория">
                    <el-input v-model="formData.category" type="text" required clearable />
                </el-form-item>
                <el-form-item label="Заголовок статьи">
                    <el-input v-model="formData.title" type="text" required clearable />
                </el-form-item>
                <el-form-item label="Краткое описание">
                    <el-input v-model="formData.excerpt" type="textarea" />
                </el-form-item>
                <QuillEditor ref="editor" style="height: 400px" placeholder="DEV" toolbar="full" theme="snow" />
                <el-form-item label="Теги">
                    <el-input-tag tag-type="primary" tag-effect="plain" clearable v-model="formData.tags"
                        aria-label="Please click the Enter key after input" />
                </el-form-item>
                <el-form-item>
                    <el-switch active-text="Опубликовать" v-model="formData.isPublished" />
                </el-form-item>
                <el-form-item class="mt-4">
                    <el-button type="primary" @click="createArticle">Создать</el-button>
                    <el-button disabled>Сохранить</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import UploadImage from '../components/upload-image.vue';
import { QuillEditor } from '@vueup/vue-quill';
import type { FormRequestData } from '../types/article';
import DialogPreview from '../components/dialog-preview.vue';

const editor = ref<InstanceType<typeof QuillEditor> | null>(null);
const previewShow = ref<boolean>(false);

const formData = reactive({
    category: "",
    imagePreview: "",
    title: "",
    excerpt: "",
    isPublished: false,
    content: null,
    tags: [] as string[]
});

const handleImage = (image: any) => {
    formData.imagePreview = image;
}

const openPreview = () => {
    previewShow.value = true;
}

const createArticle = () => {
    const requestData: FormRequestData = {
        title: formData.title,
        excerpt: formData.excerpt || "",
        content: editor.value!.getHTML() || "",
        isPublished: formData.isPublished,
        category: formData.category,
        tags: [...formData.tags],
        imagePreview: formData.imagePreview
    }
    console.log("Article created:", requestData);
}
</script>