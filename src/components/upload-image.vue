<template>
  <el-upload class="mb-4 avatar-uploader" :show-file-list="false" :auto-upload="false" :on-change="handleChangeImage">
    <img v-if="imageUrl" :src="imageUrl">
    <el-icon v-else class="avatar-uploader-icon">
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

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>