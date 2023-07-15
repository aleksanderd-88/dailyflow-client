<template>
  <div class="project-options" @click.self.stop>
    <button type="button" class="close-btn" @click.stop="$emit('close')">
      <span class="material-symbols-outlined">
        close
      </span>
    </button>

    <button type="button" class="project-options__delete-btn" @click.stop="$emit('delete')">Delete</button>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
  .project-options {
    position: relative;

    &__delete-btn {
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
      background-color: lighten(#ff3d00, 5%)
    }
  }
</style>