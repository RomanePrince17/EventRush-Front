<template>
    <div class="bg-white rounded-lg shadow-lg animate-pulse h-[430px] w-70 md:w-75 ml-8">
      <!-- Image -->
      <div class="h-56 w-full bg-gray-300 rounded-t-lg"></div>
      
      <!-- Contenu -->
      <div class="p-4 space-y-4">
        <div class="h-5 bg-gray-300 rounded w-3/4 mx-auto"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        <div class="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SkeletonCard'
  }
  </script>