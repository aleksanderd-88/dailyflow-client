<template>
  <button type="button" class="project-item" @click="navigateTo()">

    <section class="project-item__actions">
      <button type="button" class="project-item__action-btn" @click.stop="showOptions()">
        <span class="material-symbols-outlined">
          more_vert
        </span>
      </button>
    </section>

    <ProjectOptions 
      class="project-item__options" 
      :class="modifiedClass"
      @close="optionIsVisible = false"
      @edit="editProject({ _id: project._id, name: project.name })" 
      @delete="deleteProject(project._id)" 
    />

    <div>
      <h1 class="project-item__name">
        {{ project.name }}
      </h1>
      <p class="project-item__task-count" v-if="taskCount">
        {{ counter }}
      </p>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import ProjectOptions from '@/components/molecules/Project/ProjectOptions.vue'
import { useAPIStore } from '@/stores/api';

  const props = defineProps({
    project: {
      type: Object,
      required: true,
      default: () => ({})
    }
  })
  
  const emit = defineEmits<{
    (event: 'edit', params: { _id: string, name: string }): void
  }>()

  const router = useRouter()
  const optionIsVisible = ref(false)

  const taskCount = computed(() => props.project?.tasks?.length)
  const counter = computed(() => `${ taskCount.value } ${ taskCount.value > 1 ? 'items' : 'item'}`)

  const modifiedClass = computed(() => optionIsVisible.value && 'project-item__options--visible')

  const navigateTo = () => {
    if ( !props.project ) return
    
    router.push({ 
      name: 'projectOverview', 
      params: { 
        id: props.project._id.toString()
      } 
    })
  }

  const showOptions = () => optionIsVisible.value = true

  const deleteProject = (id: string) => {
    if ( !id ) 
      return console.log('No id was specified')

    if ( !confirm('All related tasks will also be removed. Continue?') ) return

    useAPIStore().deleteProject(id).then(() => optionIsVisible.value = false)
  }

  const editProject = (params: { _id: string, name: string }) => {
    emit('edit', params)
    optionIsVisible.value = false
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
      z-index: 999;
      display: flex;
      backdrop-filter: blur(2px);
      opacity: 0;
      visibility: hidden;
      transform: translateY(2px);
      transition: opacity .25s, visibility .25s, transform .25s ease;

      &--visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
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

    body.dark-mode & {
      background-color: $darkColor;
      color: $themeWhite;

      &__action-btn {
        span {
          color: $themeWhite;
        }
      }
    }
  }
</style>