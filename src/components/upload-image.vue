<template>
  <div class="article-image-upload">
    <el-upload
      class="image-uploader"
      :auto-upload="false"
      :show-file-list="false"
      :limit="1"
      :accept="'image/jpeg,image/png'"
      :on-change="handleFileChange"
      :on-exceed="handleExceed"
    >
      <div v-if="!imageUrl" class="upload-area">
        <el-icon class="upload-icon">
          <Plus />
        </el-icon>
        <div class="upload-text">Загрузить изображение</div>
        <div class="upload-hint">JPG/PNG, не более 2MB</div>
      </div>
      
      <div 
        v-else 
        class="image-preview-container"
        @mouseenter="showActions = true"
        @mouseleave="showActions = false"
      >
        <img :src="imageUrl" class="preview-image" alt="Article preview" />
        
        <div v-show="showActions" class="image-actions-overlay">
          <div class="actions-buttons">
            <el-button 
              type="info" 
              :icon="ZoomIn" 
              circle 
              size="small"
              @click.stop="openPreview"
            />
            <el-button 
              type="danger" 
              :icon="Delete" 
              circle 
              size="small"
              @click.stop="confirmRemove"
            />
          </div>
        </div>
      </div>
    </el-upload>

    <!-- Модальное окно просмотра -->
    <el-dialog
      v-model="previewVisible"
      title="Предварительный просмотр"
      width="60%"
      :before-close="closePreview"
      append-to-body
    >
      <div class="preview-dialog-content">
        <img :src="imageUrl" class="full-preview-image" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, ZoomIn, Delete } from '@element-plus/icons-vue'
import type { UploadProps, UploadFile } from 'element-plus'

// Props (убираем uploadUrl, так как загрузка локальная)
// В реальном проекте вы будете отправлять файл через отдельный API метод

// Emits
const emit = defineEmits<{
  imageSelected: [file: File, url: string]
  imageRemoved: []
}>()

// Reactive data
const imageUrl = ref<string>('')
const showActions = ref<boolean>(false)
const previewVisible = ref<boolean>(false)

// Обработка изменения файла
const handleFileChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  const file = uploadFile.raw
  if (!file) return

  // Валидация типа файла
  const isValidType = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isValidType) {
    ElMessage.error('Можно загружать только файлы формата JPG или PNG!')
    return
  }

  // Валидация размера файла (2MB)
  const isValidSize = file.size / 1024 / 1024 < 2
  if (!isValidSize) {
    ElMessage.error('Размер файла не должен превышать 2MB!')
    return
  }

  // Создаем URL для локального просмотра
  if (imageUrl.value) {
    URL.revokeObjectURL(imageUrl.value)
  }
  
  imageUrl.value = URL.createObjectURL(file)
  
  // Эмитим событие с файлом и URL
  emit('imageSelected', file, imageUrl.value)
  
  ElMessage.success('Изображение выбрано!')
}

// Обработка превышения лимита файлов
const handleExceed: UploadProps['onExceed'] = () => {
  ElMessage.warning('Можно загрузить только одно изображение!')
}

// Открытие модального окна просмотра
const openPreview = () => {
  previewVisible.value = true
}

// Закрытие модального окна
const closePreview = () => {
  previewVisible.value = false
}

// Подтверждение удаления
const confirmRemove = async () => {
  try {
    await ElMessageBox.confirm(
      'Вы уверены, что хотите удалить это изображение?',
      'Подтверждение удаления',
      {
        confirmButtonText: 'Удалить',
        cancelButtonText: 'Отмена',
        type: 'warning',
      }
    )
    
    removeImage()
  } catch {
    // Пользователь отменил удаление
  }
}

// Удаление изображения
const removeImage = () => {
  // Освобождаем память
  if (imageUrl.value && imageUrl.value.startsWith('blob:')) {
    URL.revokeObjectURL(imageUrl.value)
  }
  
  imageUrl.value = ''
  showActions.value = false
  previewVisible.value = false
  
  emit('imageRemoved')
  ElMessage.success('Изображение удалено!')
}

// Метод для внешнего сброса (если нужен)
defineExpose({
  removeImage,
  imageUrl: imageUrl.value
})
</script>

<style scoped>
.article-image-upload {
  display: inline-block;
}

.image-uploader :deep(.el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  display: block;
}

.image-uploader :deep(.el-upload:hover) {
  border-color: var(--el-color-primary);
}

.upload-area {
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--el-text-color-regular);
}

.upload-icon {
  font-size: 48px;
  color: var(--el-text-color-secondary);
  margin-bottom: 16px;
}

.upload-text {
  font-size: 16px;
  margin-bottom: 8px;
}

.upload-hint {
  font-size: 12px;
  color: var(--el-text-color-placeholder);
}

.image-preview-container {
  position: relative;
  width: 300px;
  height: 200px;
  display: block;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 6px;
}

.image-actions-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all var(--el-transition-duration);
}

.actions-buttons {
  display: flex;
  gap: 12px;
}

.preview-dialog-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.full-preview-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 6px;
}
</style>