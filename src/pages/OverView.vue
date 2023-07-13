<template>
  <div class="l-base overview">
    <main class="l-base__content">
      <h1 class="l-base__headline">My list</h1>
    </main>

    <footer>
      <button type="button" class="overview__action-btn" @click="searchbarIsVisible = true">
        <span class="material-symbols-outlined material-symbols-outlined--medium">
          add
        </span>
      </button>
      
      <AppForm :is-visible="searchbarIsVisible" @close="searchbarIsVisible = false" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import AppForm from '@/components/molecules/AppForm.vue';
import { ref } from 'vue'
import API from '@/services/api'

const searchbarIsVisible = ref(false)

API.listProjects().then(({ data }) => console.log(data))
.catch(err => console.log(err))
</script>

<style lang="scss" scoped>
  .overview {
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
</style>