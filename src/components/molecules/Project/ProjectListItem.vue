<template>
  <button type="button" class="project-item" @click="navigateTo()">
    <h1 class="project-item__name">
      {{ project.name }}
    </h1>
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

  const props = defineProps({
    project: {
      type: Object,
      required: true,
      default: () => ({})
    }
  })

  const router = useRouter()

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
    box-shadow: 0 7px 12px rgba(#000, .1);

    &__name {
      font-size: .8rem;
      font-weight: 500;
    }

    @media (min-width: 450px) {
      flex-basis: 150px;
      height: 150px;
    }
  }
</style>