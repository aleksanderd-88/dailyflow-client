<template>
  <div class="project-overview l-base">
    <header class="project-overview__info">

      <button type="button" class="project-overview__back-btn" @click="navigateBack()">
        <span class="material-symbols-outlined">
          arrow_left_alt
        </span>
      </button>

      <div class="horizontal-center-align">
        <h1 class="project-overview__name" v-if="!isLoading">{{ project?.name }}</h1>
        <p class="project-overview__task-count">5 items</p>
      </div>

    </header>

    <main class="l-base__content">

    </main>

    <footer>
      <button type="button" class="project-overview__action-btn" @click="searchbarIsVisible = true">
        <span class="material-symbols-outlined material-symbols-outlined--medium">
          add
        </span>
      </button>
      
      <AppForm 
        :is-visible="searchbarIsVisible"
        label="Give your task a description" 
        @close="searchbarIsVisible = false"
        @submit="createTask($event)"
      />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAPIStore } from '@/stores/Api';
import { computed, ref } from 'vue';
import { useLoadingStore } from '@/stores/app/loading'
import AppForm from '@/components/molecules/AppForm.vue';

  const router = useRouter()
  const searchbarIsVisible = ref(false)

  const isLoading = computed(() => useLoadingStore().isLoading.value)

  const project = computed(() => useAPIStore().item)

  const navigateBack = () => router.go(-1)
  const createTask = (name: string) => {
    console.log(name)
  }
</script>

<style lang="scss" scoped>
  .project-overview {
    &__info {
      height: 150px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      text-align: center;
    }

    &__back-btn {
      span {
        font-size: 3rem;
      }
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
    }
  }
</style>@/stores/api