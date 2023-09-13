<template>
  <AppOverlay :is-visible="isVisible" @close="$emit('close')">
    <div class="app-confirmation" :class="modifiedClass">
      <main class="app-confirmation__content">
        <section class="app-confirmation__text-content">
          <h1 class="app-confirmation__headline">
            {{ headline }}
          </h1>

          <p class="app-confirmation__text">
            {{ text }}
          </p>
        </section>

        <section class="app-confirmation__actions">
          <button 
            type="button" 
            class="app-confirmation__action-btn app-confirmation__action-btn--secondary"
            @click.stop="$emit('close')"
          >
            Cancel
            <span class="material-symbols-outlined">
              close
            </span>
          </button>

          <button 
            type="button" 
            class="app-confirmation__action-btn app-confirmation__action-btn--primary"
            @click.stop="$emit('confirm')"
          >
            Log out
            <span class="material-symbols-outlined">
              logout
            </span>
          </button>
        </section>
      </main>
    </div>
  </AppOverlay>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import AppOverlay from '../organisms/AppOverlay.vue';

const props = defineProps({
  headline: {
    type: String,
    default: ''
  },

  text: {
    type: String,
    default: ''
  },

  isVisible: {
    type: Boolean,
    default: false
  }
})

const modifiedClass = computed(() => props.isVisible && 'app-confirmation--visible')

</script>

<style lang="scss" scoped>
  .app-confirmation {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 95%;
    max-width: 400px;
    opacity: 0;
    visibility: hidden;
    transform: translate(-50%, 2px);
    transition: transform .25s, visibility .25s, opacity .25s ease;

    &__content {
      padding: 1rem;
      border-radius: 3px;
      background-color: $themeWhite;
    }

    &__text-content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2rem;

      h1 {
        font-size: 2.5rem;
      }
    }

    &__actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    &__action-btn {
      flex: 1;
      display: flex;
      justify-content: center;
      gap: .5rem;
      font-size: 1rem;
      height: 60px;
      border-radius: 3px;

      span {
        font-size: 1.15rem;
      }

      &--secondary {
        background-color: $secondary;
        color: $themeWhite;
      }

      &--primary {
        background-color: $primary;
        color: $themeWhite;
      }
    }

    &--visible {
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, -50%);
    }
  }
</style>