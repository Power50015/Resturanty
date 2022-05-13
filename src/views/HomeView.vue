<template>
  <ProfilePage v-if="auth.isLogin" />
  <HomePage v-else />
</template>

<script setup lang="ts">
import HomePage from "@/components/HomePage.vue";
import ProfilePage from "@/components/ProfilePage.vue";

import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();
</script>
