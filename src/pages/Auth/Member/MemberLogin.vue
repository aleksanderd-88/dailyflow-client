<template>
  <div class="l-base member-login">
    <main class="member-login__content">
      <h1 class="member-login__headline">Login to continue</h1>

      <LoginForm />
    </main>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/components/molecules/Forms/Member/LoginForm.vue'
</script>

<style lang="scss" scoped>
  .member-login {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 1rem 2rem 2rem;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    display: flex;

    &__content {
      margin: auto;
      width: 100%;
    }

    &__headline {
      font-size: 1.25rem;
      color: #222;
      text-align: center;
      padding: 1rem 0;
    }

    @media (min-width: 1024px) {
      width: 500px;
      height: auto;
      box-shadow: 0 8px 18px rgba(#000, .1);
    }
  }
</style>