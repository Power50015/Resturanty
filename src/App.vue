<template>
  <AsideComponents v-if="auth.userType == 'restaurants'" />
  <RouterView v-if="auth.isloaded" />
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import AsideComponents from "./components/AsideComponents.vue";
const auth = useAuthStore();
</script>

<style>
@import "@/assets/base.scss";
</style>
