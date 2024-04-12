<script setup lang="ts">
const LOADING_MESSAGE = window.gettext('Loading')
</script>
<template>
  <div class="text-center mt-3">
    <div class="spinner-border text-center" role="status">
      <span class="visually-hidden">{{ LOADING_MESSAGE }}...</span>
    </div>
  </div>
</template>
