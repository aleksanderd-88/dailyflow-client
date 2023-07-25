<template>
  <button 
    type="button" 
    class="close-btn" 
    :class="modifiedClass" 
    @click.stop="$emit('close')"
  >
    <span class="material-symbols-outlined">
      close
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

  const props = defineProps({
    light: {
      type: Boolean,
      default: false
    }
  })

  const modifiedClass = computed(() => props.light && 'close-btn--theme-light')
</script>

<style lang="scss" scoped>
.close-btn {
  position: absolute;
  top: .5rem;
  right: 0;

  span {
    color: #222;
  }

  &--theme-light {
    span {
      color: #fff;
    }
  }
}
</style>