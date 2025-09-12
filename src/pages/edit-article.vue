<template>
  <div class="w-2/3">
    <slot></slot>

    <ArticleForm
      v-if="loaded"
      :initial="initialArticle"
      :categories="categories"
      @submit="updateArticle"
      @preview="handlePreview"
      submit-text="Сохранить"
    />

    <DialogPreview v-model:dialog-visible="previewShow" :article-data="previewData" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ArticleForm from "../components/ArticleForm.vue";
import DialogPreview from "../components/dialog-preview.vue";
import { api } from "../api/axios";
import { useAuth } from "../composables/useAuth";

const route = useRoute();
const router = useRouter();
const { user } = useAuth();

const id = String(route.params.id);
const categories = ref([]);
const initialArticle = ref<any>(null);
const previewShow = ref(false);
const previewData = ref<any>(null);
const loaded = ref(false);

const getCategories = async () => {
  try {
    const { data } = await api.get("/categories/all");
    categories.value = data;
  } catch (e) {
    console.error(e);
  }
};

const getArticle = async () => {
  // если при переходе через router.push мы передали state.article — используем его, иначе делаем запрос
  const stateArticle = (history.state && history.state.article) || null;
  if (stateArticle && stateArticle.id === id) {
    // приведите поля к форме, например tags если у вас строка в БД — парсим
    initialArticle.value = {
      category: stateArticle.category,
      title: stateArticle.title,
      excerpt: stateArticle.excerpt,
      isPublished: !!stateArticle.isPublished,
      content: stateArticle.content,
      tags: Array.isArray(stateArticle.tags) ? stateArticle.tags : JSON.parse(stateArticle.tags || "[]"),
      // imagePreview: либо File (нет), либо url — форма ожидает File|null; можно хранить previewUrl отдельно
      imagePreview: null,
    };
    loaded.value = true;
    return;
  }

  try {
    const { data } = await api.get(`/articles/${id}`);
    initialArticle.value = {
      category: data.category,
      title: data.title,
      excerpt: data.excerpt,
      isPublished: !!data.isPublished,
      content: data.content,
      tags: Array.isArray(data.tags) ? data.tags : JSON.parse(data.tags || "[]"),
      imagePreview: data.coverImage,
    };
  } catch (error) {
    console.error(error);
  } finally {
    loaded.value = true;
  }
};

onMounted(async () => {
  await getCategories();
  await getArticle();
});

const handlePreview = (payload: any) => {
  previewData.value = payload;
  previewShow.value = true;
};

const updateArticle = async (payload: any) => {
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
    const response = await api.put(`/articles/${id}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status === 200) {
      router.push("/dashboard/articles");
    }
  } catch (error: any) {
    console.error(error?.response ?? error);
  }
};
</script>
