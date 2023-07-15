<template>
  <div class="project-options">
    <!-- <button type="button" class="project-options__delete-btn">
      <span class="material-symbols-outlined">
        close
      </span>
    </button> -->

    <button type="button" class="project-options__delete-btn">Delete</button>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
  .project-options {
    position: relative;
    
    &__delete-btn {
      position: absolute;
      top: 0;
      right: 0;

      span {
        color: #222;
      }
    }

    &__delete-btn {
      height: 40px;
      width: 100%;
      color: #fff;
      display: flex;
      margin-top: auto;
      align-items: center;
      justify-content: center;
      background-color: lighten(#ff3d00, 5%)
    }
  }
</style>