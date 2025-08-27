<template>
  <div class="w-2/2">
    <div
      class="p-4 border-1 bg-white border-gray-400 border-dashed rounded-lg mt-4"
    >
      <el-table :data="filteredData" style="width: 100%">
        <el-table-column width="350" label="Название" prop="title" />
        <el-table-column align="center" label="Опубликовано" prop="isPublished">
          <template #default="scope">
            <el-tag v-if="isPublished" type="success">Опубликовано</el-tag>
            <el-tag v-else type="warning">Не опубликовано</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Дата публикации" prop="publishedAt" />
        <el-table-column align="center" label="Просмотров" prop="views" />
        <el-table-column width="250" align="right">
          <template #header>
            <el-input v-model="search" size="medium" placeholder="Поиск" />
          </template>
          <template #default="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
            >
              Править
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { api } from "../api/axios";

const dataArticles = ref<Array<any>>([]);
const search = ref<string>("");

const filteredData = computed(() => {
  return dataArticles.value.filter(
    (data) =>
      !search.value ||
      data.title.toLowerCase().includes(search.value.toLowerCase())
  );
});

const getAllArticles = async () => {
  try {
    const { data } = await api.get("/articles/all");

    dataArticles.value = data;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const handleEdit = (index: number, row: any) => {
  console.log(index, row);
};

onMounted(async () => {
  await getAllArticles();
});
</script>
