<template>
  <header>
    <nav class="app-bar">
      <main class="app-bar__content">

        <section class="app-bar__actions">
          <button type="button" class="app-bar__action-btn">
            <span class="material-symbols-outlined material-symbols-outlined--medium">
              notifications
            </span>
          </button>  
        </section>

      </main>
    </nav>
  </header>
</template>

<script setup lang="ts">

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
    }
    &__actions {
      margin-left: auto;
    }
  }
</style>