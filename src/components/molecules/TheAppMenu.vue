<template>
  <AppOverlay :is-visible="isVisible" @close="$emit('close')">
      <div class="app-menu" :class="menuIsVisible">

        <AppCloseButton 
          @click.stop="$emit('close')"
        />

        <button 
          type="button"
          class="app-menu__menu-btn app-menu__theme-btn"
          @click.stop="toggleTheme()"
        >
          <span class="material-symbols-outlined">
            {{ `${ isDarkMode ? 'light' : 'dark' }_mode` }}
          </span>
          Set {{ isDarkMode ? 'light' : 'dark' }} mode
        </button>

        <button
          title="Log out"
          @click="logout()"
          class="app-menu__menu-btn app-menu__logout-btn"
        >
          <span class="material-symbols-outlined">
            logout
          </span>
          Log out
        </button>
      </div>
    </AppOverlay>
</template>

<script setup lang="ts">
import { useCurrentUserStore } from '@/stores/current-user';
import { useRouter } from 'vue-router';
import AppOverlay from '@/components/organisms/AppOverlay.vue';
import AppCloseButton from '../atoms/AppCloseButton.vue';
import { computed } from 'vue';
import { useThemeStore } from '@/stores/app/theme'

  const props = defineProps({
    isVisible: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits<{
    (event: 'close'): void
  }>()

  const router = useRouter()
  const themeStore = useThemeStore()

  const menuIsVisible = computed(() => props.isVisible && 'app-menu--visible')
  const isDarkMode = computed(() => !!themeStore.darkMode)

  const logout = () => {
    if (!confirm('You are about to logout. Do you wish to continue?')) return

    useCurrentUserStore().clearCurrentUser()
    router.replace('/')
    emit('close')
  }

  const toggleTheme = () => {
    emit('close')
    themeStore.toggleTheme()
  }

</script>

<style lang="scss" scoped>
  .app-menu {
    $root: &;

    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #fff;
    padding: 1rem;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &__menu-btn {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 1rem;
    }

    @media (min-width: 1024px) {
      top: 50%;
      left: 50%;
      height: auto;
      width: 250px;
      opacity: 0;
      visibility: hidden;
      transform: translate(-50%, 2px);
      transition: transform .25s, visibility .25s, opacity .25s ease;

      &--visible {
        opacity: 1;
        visibility: visible;
        transform: translate(-50%, -50%);
      }
    }
  }
</style>