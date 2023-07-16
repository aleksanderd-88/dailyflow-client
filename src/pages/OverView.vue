<template>
  <div class="l-base overview" :class="modifiedClass">
    <main class="l-base__content overview__content">
      <template v-if="projectListIsEmpty">
        <h2 class="overview__sub-headline">No projects created yet ...</h2>
      </template>

      <template v-else>
        <h1 class="l-base__headline">My list</h1>
        <ProjectList :projects="projects" />
      </template>
    </main>

    <footer>
      <button type="button" class="overview__action-btn" @click="searchbarIsVisible = true">
        <span class="material-symbols-outlined material-symbols-outlined--medium">
          add
        </span>
      </button>
      
      <AppForm 
        :is-visible="searchbarIsVisible"
        label="Name your project" 
        @close="searchbarIsVisible = false"
        @submit="createProject($event)"
      />
    </footer>
  </div>
</template>

<script setup lang="ts">
import AppForm from '@/components/molecules/AppForm.vue';
import { computed, ref } from 'vue'
import ProjectList from '@/components/molecules/Project/ProjectList.vue';
import { useAPIStore } from '@/stores/api'
import { onBeforeRouteLeave } from 'vue-router';

const searchbarIsVisible = ref(false)

const projects = computed(() => useAPIStore().items)
const projectListIsEmpty = computed(() => !projects.value?.length)

useAPIStore().listProjects()

const createProject = (name: string) => {
  if ( !name ) return

  const data = { name: name }
  useAPIStore().createProject({ data })
}

onBeforeRouteLeave((to, from) => {
  if ( searchbarIsVisible.value ) {
    searchbarIsVisible.value = false
    return false
  }
})

const modifiedClass = computed(() => projectListIsEmpty?.value && 'overview--shape-bg')
</script>

<style lang="scss" scoped>
  .overview {
    $root: &;

    background-color: #EFEFF5;

    &__sub-headline {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      text-align: center;
      font-size: 1rem;
      transform: translate(-50%, -50%);
    }

    &__action-btn {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      width: 60px;
      height: 60px;
      color: #fff;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      background-color: #2D383D;
      box-shadow: 0 7px 12px -4px rgba(#000, .5);

      @media (min-width: 1024px) {
        right: 3rem;
        bottom: 2rem;
      }
    }

    &--shape-bg {
      #{$root}__content {
        background: url('../assets/shape_img.png') no-repeat;
        background-position: center;
      }
    }
  }
</style>