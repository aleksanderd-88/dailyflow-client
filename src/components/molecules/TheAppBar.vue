<template>
  <header>
    <nav class="app-bar">
      <main class="app-bar__content">

        <div 
          class="app-bar__user-name"
          v-if="userIsLoggedIn()"
        >
            {{ userInitials }}
        </div>

        <section 
          class="app-bar__actions"
          v-if="userIsLoggedIn()"
        >
          <button 
            type="button" 
            class="app-bar__action-btn" 
            @click.stop="bookmarkListVisible = !bookmarkListVisible"
          >
            <span class="material-symbols-outlined material-symbols-outlined--medium">
              notification_important
            </span>

            <span class="app-bar__counter" v-if="bookmarkCount > 0">
              {{ bookmarkCount > 9 ? '9+' : bookmarkCount }}
            </span>
          </button>

          <TheMenuButton 
            class="app-bar__menu-btn"
            @click.stop="menuIsVisible = true"
          />

          <TheAppMenu 
            :is-visible="menuIsVisible"
            @close="menuIsVisible = false" 
          />

        </section>

        <BookmarkList 
          :is-visible="bookmarkListVisible" 
          @close="bookmarkListVisible = false"
        />
      </main>

    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useBookmarkStore } from '@/stores/api/bookmark';
import BookmarkList from './Bookmark/BookmarkList.vue';
import { userIsLoggedIn } from '@/utils/authentication';
import { useCurrentUserStore } from '@/stores/current-user';
import TheMenuButton from '@/components/atoms/TheMenuButton.vue'
import TheAppMenu from './TheAppMenu.vue';

  const bookmarkListVisible = ref(false)
  const menuIsVisible = ref(false)

  const bookmarkCount = computed(() => useBookmarkStore().itemCount)

  const userInitials = computed(() => {
    const firstName = useCurrentUserStore().currentUser?.name.split(' ')[0]
    const lastName = useCurrentUserStore().currentUser?.name.split(' ')[1]
    return firstName?.charAt(0).toUpperCase() + '' + lastName?.charAt(0).toUpperCase()
  })
</script>

<style lang="scss" scoped>
  .app-bar {
    $root: &;

    box-shadow: 0 7px 12px -4px rgba(#000, .1);

    &__content {
      padding: 0 1rem;
      display: flex;
      align-items: center;
      width: 100%;
      max-width: 1600px;
      margin: auto;
      height: 60px;
      position: relative;
    }

    &__user-name {
      border-radius: 50%;
      border: 1px solid #2D383D;
      color: #2D383D;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
    }

    &__actions {
      margin-left: auto;
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    &__action-btn {
      position: relative;
    }

    &__counter {
      position: absolute;
      top: -10px;
      right: -5px;
      width: 25px;
      height: 25px;
      padding: 5px;
      display: flex;
      align-items: center;
      border-radius: 50%;
      justify-content: center;
      font-size: .7rem;
      color: #fff;
      border: 1px solid #fff;
      background-color: lighten(#ff3d00, 5%);
    }

    body.dark-mode & {
      background-color: $darkColor;
      
      #{$root}__user-name {
        border: 1px solid $themeWhite;
        color: $themeWhite;
      }

      #{$root}__action-btn {
        span {
          color: $themeWhite;
        }
      }

      #{$root}__counter {
        border: none;
      }
    }
  }
</style>