<template>
  <div class="project-options" @click.self.stop>
    <AppCloseButton @close="$emit('close')" />

    <button 
      type="button" 
      class="project-options__action-btn project-options__action-btn--edit" 
      @click.stop="$emit('edit')"
    >
      Edit
    </button>
    
    <button 
      type="button" 
      class="project-options__action-btn project-options__action-btn--delete" 
      @click.stop="$emit('delete')"
    >
      Delete
    </button>
  </div>
</template>

<script setup lang="ts">
import AppCloseButton from '@/components/atoms/AppCloseButton.vue'
</script>

<style lang="scss" scoped>
  .project-options {
    position: relative;

    &__action-btn {
      height: 40px;
      width: 100%;
      color: #fff;
      display: flex;
      margin-top: auto;
      align-items: center;
      font-weight: 500;
      font-size: .8rem;
      text-transform: uppercase;
      justify-content: center;

      &--delete {
        background-color: lighten(#ff3d00, 5%)
      }

      &--edit {
        background-color: #00b0ff;
      }
    }
  }
</style>