<template>
  <div class="bookmark-list">
    <button type="button" class="close-btn" @click.stop="$emit('close')">
      <span class="material-symbols-outlined">
        close
      </span>
    </button>

    <h1 class="bookmark-list__headline">Bookmarks</h1>

    <section class="bookmark-list__items" v-if="bookmarkCount > 0">
      <BookmarkListItem 
        v-for="bookmark in bookmarks"
        :key="bookmark.taskId"
        :bookmark="bookmark"
        @close="$emit('close')"
      />
    </section>

    <p class="bookmark-list_alt-text" v-else>No bookmarks</p>
  </div>
</template>

<script setup lang="ts">
import BookmarkListItem from './BookmarkListItem.vue';
import { useBookmarkStore } from '@/stores/api/bookmark';
import { computed } from 'vue';

const bookmarks = computed(() => useBookmarkStore().items)
const bookmarkCount = computed(() => useBookmarkStore().itemCount)

</script>

<style lang="scss" scoped>
  .bookmark-list {
    position: absolute;
    top: 100%;
    left: 50%;
    width: 95%;
    padding: 2rem 1rem;
    z-index: 1;
    margin-top: .5rem;
    border-radius: 3px;
    background-color: #fff;
    transform: translateX(-50%);

    &__headline {
      padding: 2rem 0;
      font-size: 1.5rem;
    }

    &__items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    &_alt-text {
      text-align: center;
      font-weight: 200;
      letter-spacing: .05em;
    }

    @media (min-width: 1024px) {
      left: unset;
      transform: translateX(0);
      width: 400px;
      right: 1rem;
    }
  }
</style>