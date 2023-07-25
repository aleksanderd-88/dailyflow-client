<template>
  <div class="project-list" 
    v-for="project in uniqueByDate(projects)"
    :key="project._id"
  >
    <h1 class="project-list__project-added">{{ new Date(project.createdAt).toDateString() }}</h1>

    <ProjectListItem
      v-for="item in filteredProjects(projects, project)" 
      :key="item._id"
      :project="item"
      @edit="editProject(item)" 
    />
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
import ProjectListItem from './ProjectListItem.vue';
import uniqBy from 'lodash/uniqBy'
import orderBy from 'lodash/orderBy'

  type ProjectType = { 
    name: string, 
    _id: string, 
    tasks: Record<string, unknown>[], 
    createdAt: string 
  }

  type ProjectsType = ProjectType[]

  defineProps({
    projects: {
      type: Array as PropType<ProjectsType>,
      default: () => ([])
    }
  })

  const emit = defineEmits<{
    (event: 'edit', project: ProjectType): void
  }>()
  
  const uniqueByDate = (projects: ProjectsType) => {
    return orderBy(uniqBy(projects.map(p => {
      return {
        ...p,
        added: new Date(p.createdAt).getDate()
      }
    }), 'added'), ['createdAt'], ['desc'])
  }

  const filteredProjects = (projects: ProjectsType, project: ProjectType) => {
    return projects.filter(i => new Date(i.createdAt).getDate() === new Date(project.createdAt).getDate())
  }

  const editProject = (project: ProjectType) => emit('edit', project)

</script>

<style lang="scss" scoped>
  .project-list {
    margin: 1rem 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    grid-auto-rows: 150px;

    &__project-added {
      grid-column: 1/-1;
      width: 100%;
      font-weight: 200;
      font-size: 2rem;
      margin: 2rem 0 0;

      &::after {
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        background-color: #ddd;
      }
    }

    @media (min-width: 500px) {
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>