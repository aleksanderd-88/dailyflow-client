<template>
  <div class="app-feedback" :class="modifiedClass">
    <AppCloseButton class="app-feedback__close-btn" light @close="closeFeedback()" />

    {{ feedbackText }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppCloseButton from '../atoms/AppCloseButton.vue';
import { useFeedbackStore } from '@/stores/app/feedback'

const modifiedClass = computed(() => {
  let className = ''
  if ( useFeedbackStore().onError )
    className += 'app-feedback--error'
  
  if ( useFeedbackStore().isVisible )
    className += ' app-feedback--visible'

  return className
})

const feedbackText = computed(() => useFeedbackStore().text)

const closeFeedback = () => useFeedbackStore().closeFeedback()

</script>

<style lang="scss" scoped>
  .app-feedback {
    position: fixed;
    top: 5rem;
    right: 0;
    left: 50%;
    width: 95%;
    padding: 15px 70px 15px 20px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    font-size: .9rem;
    color: #fff;
    font-weight: 200;
    letter-spacing: .05em;
    background-color: lighten(#2D383D, 10%);
    transform: translate(-50%, 5px);
    opacity: 0;
    visibility: hidden;

    &__close-btn {
      top: 50%;
      right: 1rem;
      transform: translateY(-50%);
    }

    @media (min-width: 1024px) {
      width: auto;
      max-width: 400px;
      left: unset;
      right: 1rem;
      transform: translate(0, 2px);
    }
    
    &--error {
      background-color: lighten(#ff3d00, 5%);
    }
    
    &--visible {
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      transition: transform .25s, opacity .25s, visibility .25s ease;

      @media (min-width: 1024px) {
        transform: translate(0, 0);
      }
    }
  }
</style>