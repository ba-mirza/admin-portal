<template>
    <div class="w-2/3">
        <h1 class="text-2xl font-medium">Создане статьи</h1>
        <div class="p-4 border-1 bg-white border-gray-400 border-dashed rounded-lg mt-4">
            <el-form label-position="top" :model="formData">
                <UploadImage @ready-image="handleImage" />
                <el-form-item label="Категория">
                    <el-input v-model="formData.category" type="text" required clearable />
                </el-form-item>
                <el-form-item label="Заголовок статьи">
                    <el-input v-model="formData.titleArticle" type="text" required clearable />
                </el-form-item>
                <el-form-item label="Краткое описание">
                    <el-input v-model="formData.description" type="textarea" />
                </el-form-item>
                <QuillEditor ref="editor" style="height: 400px" placeholder="DEV" toolbar="full" theme="snow" />
                <el-form-item label="Теги">
                    <el-input-tag tag-type="primary" tag-effect="plain" clearable v-model="formData.tags"
                        aria-label="Please click the Enter key after input" />
                </el-form-item>
                <el-form-item class="mt-4">
                    <el-button type="primary" @click="createArticle">Create</el-button>
                    <el-button>Cancel</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import UploadImage from '../components/upload-image.vue';
import { QuillEditor } from '@vueup/vue-quill';

const editor = ref<InstanceType<typeof QuillEditor> | null>(null);

const formData = reactive({
    category: "",
    imagePreview: "",
    imageCopyright: "",
    titleArticle: "",
    description: "",
    content: null,
    tags: [] as string[]
});

const handleImage = (image: any) => {
    formData.imagePreview = image;
}

const createArticle = () => {
    formData.content = editor.value.getHTML();
    console.log("Article created:", formData);
}
</script>