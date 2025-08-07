<template>
    <div class="w-2/3">
        <h1 class="text-2xl font-medium">Создане статьи</h1>
        <div class="p-4 border-1 bg-white border-gray-400 border-dashed rounded-lg mt-4">
            <el-form label-position="top" :model="formData">
                <el-form-item label="Категория">
                    <el-input v-model="formData.category" type="text" required clearable />
                </el-form-item>
                <el-form-item label="Заголовок статьи">
                    <el-input v-model="formData.titleArticle" type="text" required clearable />
                </el-form-item>
                <el-form-item label="Краткое описание">
                    <el-input v-model="formData.description" type="textarea" />
                </el-form-item>
                <QuillEditor style="height: 400px" placeholder="DEV" toolbar="full" theme="snow" />
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
    <!-- <Dock magnification="30" class="fixed bottom-10 left-0 right-0 shadow-lg">
        <DockIcon>
            <el-tooltip effect="dark" content="Profile" placement="top">
                <el-avatar :icon="UserFilled"></el-avatar>
            </el-tooltip>
        </DockIcon>
        <DockSeparator />
        <DockIcon>
            <el-tooltip effect="dark" content="Создать" placement="top">
                <img src="/icons/pen-clip.svg" alt="category">
            </el-tooltip>
        </DockIcon>
        <DockIcon>
            <el-tooltip effect="dark" content="Категория" placement="top">
                <img src="/icons/category.svg" alt="category">
            </el-tooltip>
        </DockIcon>
    </Dock> -->
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const formData = reactive({
    category: "",
    imagePreview: "",
    imageCopyright: "",
    titleArticle: "",
    description: "",
    content: null,
    tags: [""]
});

const createArticle = () => {
    console.log("Article created:", formData);
}
</script>