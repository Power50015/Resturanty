<template>
  <ProfilePage v-if="auth.userType == 'restaurants'" />
  <AllRestaurants v-else-if="auth.userType == 'admin'" />
  <HomePage v-else />
</template>

<script setup lang="ts">
import HomePage from "@/components/HomePage.vue";
import ProfilePage from "@/components/ProfilePage.vue";
import AllRestaurants from "@/components/AllRestaurants.vue";
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();
</script>
