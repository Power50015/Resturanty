<template>
    <AsideComponents />
    <RouterView />
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import AsideComponents from "./components/AsideComponents.vue";
const auth = useAuthStore();
</script>

<style>
@import "@/assets/base.scss";
</style>
