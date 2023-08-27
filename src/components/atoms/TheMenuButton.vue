<template>
  <button type="button" class="menu-btn">
    <span class="material-symbols-outlined">
      menu
    </span>
  </button>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
  .menu-btn {
    body.dark-mode & {
      span {
        color: #fff;
      }
    }
  }
</style>