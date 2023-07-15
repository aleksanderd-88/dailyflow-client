<template>
  <AppOverlay :is-visible="isVisible" @close="$emit('close')">
    <form class="search-bar" :class="modifiedClass" @submit.prevent="handleSubmit()">

      <div class="search-bar__row">
        <div class="search-bar__col">
          <label for="project_title" class="search-bar__label" v-if="label">{{ label }}</label>
        </div>
        
        <div class="search-bar__col">
          <input 
            type="text" 
            id="project_title" 
            class="search-bar__text-field" 
            v-model="name" 
            ref="textfieldRef" 
          />
          <button class="search-bar__submit-btn">{{ buttonLabel }}</button>
        </div>
      </div>
    </form>
  </AppOverlay>
</template>

<script setup lang="ts">
import AppOverlay from '@/components/organisms/AppOverlay.vue'
import { computed, ref, watch } from 'vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: null
  },
  input: {
    type: String,
    default: ''
  },
  editMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (event: 'close'): void
  (event: 'submit', name: string): void
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

watch(() => props.editMode, val => {
  if ( val ) {
    name.value = props.input
  } else {
    name.value = ''
  }
})

const modifiedClass = computed(() => props.isVisible && 'search-bar--visible')
const buttonLabel = computed(() => props.editMode ? 'Edit' : 'Save')

const handleSubmit = () => {
  if ( !name.value ) return
  
  emit('close')
  emit('submit', name.value)
  name.value = ''
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
    visibility: hidden;
    opacity: 0;
    transform: translate(0, 100%);
    transition: transform .25s, visibility .25s, opacity .25s ease;

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
      padding-right: 80px;

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

    @media (min-width: 768px) {
      top: 50%;
      left: 50%;
      right: unset;
      bottom: unset;
      width: 400px;
      padding: 2rem;
      border-radius: 3px;
      transform-origin: center;
      transform: translate(-50%, 2px);
    }

    &--visible {
      transform: translate(0, 0);
      visibility: visible;
      opacity: 1;

      @media (min-width: 768px) {
        transform: translate(-50%, -50%);
      }
    }
  }
</style>@/stores/api