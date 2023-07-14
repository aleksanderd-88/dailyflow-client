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
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAPIStore } from '@/stores/Api';
import { computed } from 'vue';
import { useLoadingStore } from '@/stores/app/loading'

  const router = useRouter()

  const isLoading = computed(() => useLoadingStore().isLoading.value)

  const project = computed(() => useAPIStore().item)

  const navigateBack = () => router.go(-1)
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
  }
</style>@/stores/api