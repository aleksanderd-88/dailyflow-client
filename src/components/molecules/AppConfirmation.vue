<template>
  <AppOverlay :is-visible="true">
    <div class="app-confirmation">
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
          <button type="button" class="app-confirmation__action-btn app-confirmation__action-btn--secondary">
            Cancel
            <span class="material-symbols-outlined">
              close
            </span>
          </button>

          <button type="button" class="app-confirmation__action-btn app-confirmation__action-btn--primary">
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
import AppOverlay from '../organisms/AppOverlay.vue';

defineProps({
  headline: {
    type: String,
    default: ''
  },

  text: {
    type: String,
    default: ''
  }
})

</script>

<style lang="scss" scoped>
  .app-confirmation {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 95%;
    max-width: 400px;
    transform: translate(-50%, -50%);

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
  }
</style>