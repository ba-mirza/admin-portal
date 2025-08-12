<template>
  <el-upload class="w-[128px] h-[128px] block border-2 border-gray-300 border-dashed" :show-file-list="false"
    :auto-upload="false" :on-change="handleChangeImage">
    <img v-if="imageUrl" :src="imageUrl">
    <el-icon v-else>
      <Plus />
    </el-icon>
  </el-upload>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import type { UploadFile } from 'element-plus';

const emit = defineEmits<{ readyImage: [img: any] }>();

const imageUrl = ref<string>('');

const handleChangeImage = (file: UploadFile) => {
  if (file.raw) {
    imageUrl.value = URL.createObjectURL(file.raw);
    emit('readyImage', file.raw);
  }
}

</script>