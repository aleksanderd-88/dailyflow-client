<template>
  <div class="project-list">
    <ProjectListItem 
      v-for="project in projects" 
      :key="project._id" 
      :project="project" 
    />
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
import ProjectListItem from './ProjectListItem.vue';

  defineProps({
    projects: {
      type: Array as PropType<{ name: string, _id: string }[]>,
      default: () => ([])
    }
  })

</script>

<style lang="scss" scoped>
  .project-list {
    margin: 1rem 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    grid-auto-rows: 150px;

    @media (min-width: 500px) {
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>