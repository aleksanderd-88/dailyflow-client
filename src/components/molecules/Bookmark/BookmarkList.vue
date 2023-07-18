<template>
  <div class="bookmark-list" :class="modifiedClass">
    <button type="button" class="close-btn" @click.stop="$emit('close')">
      <span class="material-symbols-outlined">
        close
      </span>
    </button>

    <h1 class="bookmark-list__headline">Tasks</h1>

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

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
})

const bookmarks = computed(() => useBookmarkStore().items)
const bookmarkCount = computed(() => useBookmarkStore().itemCount)

const modifiedClass = computed(() => props.isVisible && 'bookmark-list--visible')

</script>

<style lang="scss" scoped>
  .bookmark-list {
    $root: &;

    position: absolute;
    top: 100%;
    left: 50%;
    width: 95%;
    padding: 1rem;
    z-index: 1;
    margin-top: .5rem;
    border-radius: 3px;
    opacity: 0;
    visibility: hidden;
    background-color: #fff;
    transform: translate(-50%, 5px);
    box-shadow: 0 8px 20px rgba(#000, .1);
    transition: transform .25s, opacity .25s, visibility .25s ease;

    &__headline {
      font-size: 1.5rem;
      
    }

    &__items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 2rem;
    }

    &_alt-text {
      text-align: center;
      font-weight: 200;
      letter-spacing: .05em;
      padding: 2rem 0;
    }

    @media (min-width: 1024px) {
      left: unset;
      transform: translate(0, 5px);
      width: 400px;
      right: 1rem;
    }

    &--visible {
      transform: translate(-50%, 0);
      opacity: 1;
      visibility: visible;

      @media (min-width: 1024px) {
        transform: translate(0, 0);
      }
    }
  }
</style>