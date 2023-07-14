<template>
  <AppOverlay :is-visible="isVisible" @close="$emit('close')">
    <form class="search-bar" :class="modifiedClass" @submit.prevent="createProject()">

      <div class="search-bar__row">
        <div class="search-bar__col">
          <label for="project_title" class="search-bar__label">Name your project</label>
        </div>
        
        <div class="search-bar__col">
          <input 
            type="text" 
            id="project_title" 
            class="search-bar__text-field" 
            v-model="name" 
            ref="textfieldRef" 
          />
          <button class="search-bar__submit-btn">Save</button>
        </div>
      </div>
    </form>
  </AppOverlay>
</template>

<script setup lang="ts">
import AppOverlay from '@/components/organisms/AppOverlay.vue'
import { computed, ref, watch } from 'vue';
import { useAPIStore } from '@/stores/Api';

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (event: 'close'): void
}>()

const textfieldRef = ref<HTMLInputElement | null>(null)
const name = ref('')

watch(() => props.isVisible, val => {
  if ( val ) {
    setTimeout(() => {
      textfieldRef.value?.focus()
    }, 100);
  } else {
    textfieldRef.value?.blur()
  }
})

const modifiedClass = computed(() => props.isVisible && 'search-bar--visible')

const createProject = () => {
  if ( !name.value ) return

  const data = { name: name.value }
  useAPIStore().createProject({ data }).then(() => {
    emit('close')
    name.value = ''
  })
}
</script>

<style lang="scss" scoped>
  .search-bar {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    padding: 5px;
    z-index: 999;
    border-radius: 5px 5px 0 0;
    background-color: #fff;
    transform: translateY(100%);
    visibility: hidden;
    opacity: 0;
    transition: transform .25s, opacity .25s, visibility .25s ease;

    &__row {
      display: flex;
      flex-direction: column;
    }
    
    &__col {
      position: relative;
    }

    &__label {
      font-size: .8rem;
    }
    
    &__text-field {
      height: 50px;
      width: 100%;
      border: none;
      outline: none;
      border-bottom: 1px solid #ccc;
      transition: border .25s ease;

      &:focus {
        border-color: #2D383D;
      }
    }

    &__submit-btn {
      position: absolute;
      top: 50%;
      right: .3rem;
      padding: 5px 10px;
      border-radius: 20px;
      color: #fff;
      font-size: .8rem;
      background-color: #222;
      transform: translateY(-50%);
    }

    &--visible {
      transform: translateY(0);
      visibility: visible;
      opacity: 1;
    }
  }
</style>@/stores/api