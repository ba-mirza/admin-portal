<template>
  <div class="w-2/3">
    <slot></slot>
    <div
      class="p-4 border-1 bg-white border-gray-400 border-dashed rounded-lg mt-4"
    >
      <el-button @click="openPreview" type="primary" plain class="mb-4"
        >Предварительный просмотр</el-button
      >
      <DialogPreview
        v-model:dialog-visible="previewShow"
        :article-data="formData"
      />
      <el-form label-position="top" :model="formData">
        <UploadImage @ready-image="handleImage" />
        <el-form-item label="Категория">
          <el-select
            v-model="formData.category"
            placeholder="Категория"
            clearable
          >
            <el-option
              v-for="category in categories"
              :key="category.id"
              :label="category.name"
              :value="category.id"
            >
              {{ category.name }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Заголовок статьи">
          <el-input v-model="formData.title" type="text" required clearable />
        </el-form-item>
        <el-form-item label="Краткое описание">
          <el-input v-model="formData.excerpt" type="textarea" />
        </el-form-item>
        <QuillEditor
          ref="editor"
          style="height: 400px"
          placeholder="DEV"
          toolbar="full"
          theme="snow"
        />
        <el-form-item class="mt-2" label="Теги">
          <el-input-tag
            tag-type="primary"
            tag-effect="plain"
            clearable
            v-model="formData.tags"
            aria-label="Please click the Enter key after input"
          />
        </el-form-item>
        <el-form-item>
          <el-switch
            active-text="Опубликовать"
            v-model="formData.isPublished"
          />
        </el-form-item>
        <el-form-item class="mt-4">
          <el-button type="primary" @click="createArticle">Отправить</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import UploadImage from "../components/upload-image.vue";
import { QuillEditor } from "@vueup/vue-quill";
import DialogPreview from "../components/dialog-preview.vue";
import { useAuth } from "../composables/useAuth";
import { api } from "../api/axios";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const editor = ref<InstanceType<typeof QuillEditor> | null>(null);
const previewShow = ref<boolean>(false);
const categories = ref<{ id: number; name: string; slug: string }>();

const { user } = useAuth();
const router = useRouter();

const formData = reactive({
  category: "",
  imagePreview: null as File | null,
  title: "",
  excerpt: "",
  isPublished: false,
  content: null,
  tags: [] as string[],
});

const handleImage = (file: File) => {
  formData.imagePreview = file;
};

const openPreview = () => {
  previewShow.value = true;
};

const getCategories = async () => {
  try {
    const { data } = await api.get("/categories/all");
    categories.value = data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await getCategories();
});

const createArticle = async () => {
  const form = new FormData();

  form.append("title", formData.title);
  form.append("authorId", user.value!.id.toString());
  form.append("excerpt", formData.excerpt || "");
  form.append("content", editor.value!.getHTML() || "");
  form.append("isPublished", String(formData.isPublished));
  form.append("category", formData.category);
  form.append("tags", JSON.stringify(formData.tags));

  if (formData.imagePreview) {
    form.append("imagePreview", formData.imagePreview);
  }

  try {
    const response = await api.post("/articles/create", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if(response.status === 200 || response.status === 201) {
        router.push('/dashboard/articles')
        return
    }

  } catch (error) {
    console.error(error.response);
  }
};
</script>
