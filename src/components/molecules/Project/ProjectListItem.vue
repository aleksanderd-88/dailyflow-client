<template>
  <button type="button" class="project-item">
    <h1 class="project-item__name">
      {{ project.name }}
    </h1>
  </button>
</template>

<script setup lang="ts">
  defineProps({
    project: {
      type: Object,
      required: true,
      default: () => ({})
    }
  })
</script>

<style lang="scss" scoped>
  .project-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;
    background-color: #fff;
    box-shadow: 0 7px 12px rgba(#000, .1);

    &__name {
      font-size: .8rem;
      font-weight: 500;
    }
  }
</style>