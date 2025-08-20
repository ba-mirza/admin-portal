<template>
  <div class="flex items-center justify-center h-screen bg-gray-50">
    <div class="border-4 border-gray-300 rounded-2xl px-16 py-20 text-center shadow-lg">
      <h1 class="text-9xl font-bold text-gray-800">404</h1>
      <p class="mt-6 text-xl text-gray-600">Страница не найдена</p>
      <router-link
        to="/"
        class="mt-8 inline-block px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition"
      >
        На главную
      </router-link>
    </div>
  </div>
</template>
