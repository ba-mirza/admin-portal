<template>
  <div class="w-2/3">
    <slot></slot>
    <div
      class="p-4 border-1 bg-white border-gray-400 border-dashed rounded-lg mt-4"
    >
    <ArticleForm
      :categories="categories"
      @submit="createArticle"
      @preview="handlePreview"
      submit-text="Отправить"
    />

    <DialogPreview v-model:dialog-visible="previewShow" :article-data="previewData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ArticleForm from "../components/ArticleForm.vue";
import DialogPreview from "../components/dialog-preview.vue";
import { api } from "../api/axios";
import { useAuth } from "../composables/useAuth";
import { useRouter } from "vue-router";

const { user } = useAuth();
const router = useRouter();

const categories = ref<Array<{ id: number; name: string; slug?: string }>>([]);
const previewShow = ref(false);
const previewData = ref<any>(null);

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

const handlePreview = (payload: any) => {
  previewData.value = payload;
  previewShow.value = true;
};

const createArticle = async (payload: any) => {
  const form = new FormData();
  form.append("title", payload.title || "");
  form.append("authorId", user.value!.id.toString());
  form.append("excerpt", payload.excerpt || "");
  form.append("content", payload.content || "");
  form.append("isPublished", String(!!payload.isPublished));
  form.append("category", String(payload.category || ""));
  form.append("tags", JSON.stringify(payload.tags || []));

  if (payload.imagePreview) {
    form.append("imagePreview", payload.imagePreview);
  }

  try {
    const response = await api.post("/articles/create", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status === 200 || response.status === 201) {
      router.push("/dashboard/articles");
    }
  } catch (error: any) {
    console.error(error?.response ?? error);
  }
};
</script>
