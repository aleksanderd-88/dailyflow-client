<template>
  <header>
    <nav class="app-bar">
      <main class="app-bar__content">

        <section class="app-bar__actions">
          <button type="button" class="app-bar__action-btn" @click.stop="bookmarkListVisible = !bookmarkListVisible">
            <span class="material-symbols-outlined material-symbols-outlined--medium">
              notification_important
            </span>

            <span class="app-bar__counter" v-if="bookmarkCount > 0">
              {{ bookmarkCount }}
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

  const bookmarkListVisible = ref(false)
  const bookmarkCount = computed(() => useBookmarkStore().itemCount)
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
    }

    &__action-btn {
      position: relative;
    }

    &__counter {
      position: absolute;
      top: -5px;
      right: 0px;
      width: 20px;
      height: 20px;
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