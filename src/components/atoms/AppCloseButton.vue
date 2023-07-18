<template>
  <button type="button" class="close-btn" @click.stop="$emit('close')">
    <span class="material-symbols-outlined">
      close
    </span>
  </button>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.close-btn {
  position: absolute;
  top: .5rem;
  right: 0;

  span {
    color: #222;
  }
}
</style>