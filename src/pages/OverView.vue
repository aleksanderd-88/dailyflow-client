<template>
  <div class="l-base overview">
    <main class="l-base__content">
      <h1>Overview page</h1>
    </main>

    <footer>
      <button type="button" class="overview__action-btn">
        <span class="material-symbols-outlined material-symbols-outlined--medium">
          add
        </span>
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
  .overview {
    &__action-btn {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      width: 60px;
      height: 60px;
      color: #fff;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      background-color: #2D383D;
      box-shadow: 0 7px 12px -4px rgba(#000, .5);
    }
  }
</style>