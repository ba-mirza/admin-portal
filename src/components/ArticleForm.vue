<template>
  <div>
    <el-button @click="onPreview" type="primary" plain class="mb-4">
      Предварительный просмотр
    </el-button>

    <el-form label-position="top" :model="local">
      <UploadImage @ready-image="handleImage" />

      <el-form-item label="Категория">
        <el-select v-model="local.category" placeholder="Категория" clearable>
          <el-option
            v-for="c in categoriesComputed"
            :key="c.id"
            :label="c.name"
            :value="c.id"
          >
            {{ c.name }}
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Заголовок статьи">
        <el-input v-model="local.title" type="text" required clearable />
      </el-form-item>

      <el-form-item label="Краткое описание">
        <el-input v-model="local.excerpt" type="textarea" />
      </el-form-item>

      <QuillEditor
        v-model:content="local.content"
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
          v-model="local.tags"
          aria-label="Please click the Enter key after input"
        />
      </el-form-item>

      <el-form-item>
        <el-switch active-text="Опубликовать" v-model="local.isPublished" />
      </el-form-item>

      <el-form-item class="mt-4">
        <el-button type="primary" @click="onSubmit">{{ submitText }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, computed } from "vue";
import UploadImage from "../components/upload-image.vue";
import { QuillEditor } from "@vueup/vue-quill";

type Category = { id: number; name: string; slug?: string };

interface ArticlePayload {
  category: string | number | null;
  imagePreview: File | null; // если редактирование — может быть URL, но мы считаем File|null
  title: string;
  excerpt: string;
  isPublished: boolean;
  content: string | null;
  tags: string[];
}

const props = defineProps<{
  initial?: Partial<ArticlePayload> | null;
  categories?: Category[] | null;
  submitText?: string | null;
}>();

const emit = defineEmits<{
  (e: "submit", payload: ArticlePayload): void;
  (e: "preview", payload: ArticlePayload): void;
}>();

const local = reactive<ArticlePayload>({
  category: props.initial?.category ?? "",
  imagePreview: (props.initial?.imagePreview as unknown as File) ?? null,
  title: props.initial?.title ?? "",
  excerpt: props.initial?.excerpt ?? "",
  isPublished: props.initial?.isPublished ?? false,
  content: props.initial?.content ?? "",
  tags: props.initial?.tags ? [...props.initial.tags] : [],
});

watch(
  () => props.initial,
  (v) => {
    if (!v) return;
    // патчим поля — не перезаписываем, если поле отсутствует
    if (v.category !== undefined) local.category = v.category as any;
    if (v.title !== undefined) local.title = v.title as string;
    if (v.excerpt !== undefined) local.excerpt = v.excerpt as string;
    if (v.isPublished !== undefined) local.isPublished = v.isPublished as boolean;
    if (v.content !== undefined) local.content = v.content as string;
    if (v.tags !== undefined) local.tags = [...(v.tags as string[])];
    // imagePreview: если backend вернул URL, вы, возможно, захотите показывать previewUrl отдельно.
    if (v.imagePreview instanceof File) local.imagePreview = v.imagePreview;
  },
  { immediate: true }
);

const categoriesComputed = computed(() => props.categories ?? []);

const handleImage = (file: File) => {
  local.imagePreview = file;
};

const submitText = props.submitText ?? "Отправить";

const onPreview = () => {
  emit("preview", { ...local });
};

const onSubmit = () => {
  emit("submit", { ...local });
};
</script>
