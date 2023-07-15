<template>
  <button type="button" class="project-item" @click="navigateTo()">

    <section class="project-item__actions">
      <button type="button" class="project-item__action-btn" @click.stop>
        <span class="material-symbols-outlined">
          more_vert
        </span>
      </button>
    </section>

    <ProjectOptions class="project-item__options" />

    <div>
      <h1 class="project-item__name">
        {{ project.name }}
      </h1>
      <p class="project-item__task-count" v-if="taskCount">
        {{ `${ taskCount } ${ taskCount > 0 ? 'items' : 'item'}` }}
      </p>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import ProjectOptions from '@/components/molecules/Project/ProjectOptions.vue'

  const props = defineProps({
    project: {
      type: Object,
      required: true,
      default: () => ({})
    }
  })

  const router = useRouter()

  const taskCount = computed(() => props.project?.tasks?.length)

  const navigateTo = () => {
    if ( !props.project ) return
    
    router.push({ 
      name: 'projectOverview', 
      params: { 
        id: props.project._id.toString()
      } 
    })
  }
</script>

<style lang="scss" scoped>
  .project-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;
    background-color: #fff;
    position: relative;
    box-shadow: 0 7px 12px rgba(#000, .1);

    &__actions {
      position: absolute;
      top: 1rem;
      right: 0;
    }

    &__action-btn {
      span {
        font-size: 1.3rem;
      }
    }

    &__options {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      display: flex;
      backdrop-filter: blur(2px);
    }

    &__name {
      font-size: .8rem;
      font-weight: 500;
    }

    &__task-count {
      font-size: .7rem;
      color: #B1B2C3;
    }

    @media (min-width: 450px) {
      flex-basis: 150px;
      height: 150px;
    }
  }
</style>