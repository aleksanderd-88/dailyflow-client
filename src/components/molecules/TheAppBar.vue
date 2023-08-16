<template>
  <header>
    <nav class="app-bar">
      <main class="app-bar__content">

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

          <button
            title="Log out"
            @click="logout()"
          >
            <span class="material-symbols-outlined">
              logout
            </span>
          </button>
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
import { userIsLoggedIn } from '@/utils/version/authentication';
import { useCurrentUserStore } from '@/stores/current-user';
import { useRouter } from 'vue-router';

  const bookmarkListVisible = ref(false)
  const bookmarkCount = computed(() => useBookmarkStore().itemCount)

  const router = useRouter()

  const logout = () => {
    if (!confirm('You are about to logout. Do you wish to continue?')) return
    
    useCurrentUserStore().clearCurrentUser()
    router.replace('/')
  }
</script>

<style lang="scss" scoped>
  .app-bar {
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
  }
</style>