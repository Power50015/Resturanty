<template>
  <button class="d-lg-none d-block aside-btn" @click="aside = !aside">
    <img src="@/assets/menu.png" v-if="!aside">
    <img src="@/assets/close.png" v-if="aside">
  </button>
  <nav class="col-md-2 d-lg-block sidebar py-3" :class="{ 'd-none': !aside }">
    <div class="sidebar-sticky">
      <ul class="nav flex-column px-3">
        <li class="nav-item mb-5">
          <router-link to="/">
            <div class="logo-section text-center">
              <img src="@/assets/chef_only.png" width="150" />
              <h1 class="">Resturanty</h1>
            </div>
          </router-link>
        </li>
        <li class="nav-item mb-3">
          <router-link to="/profile">
            <div class="profile-box">
              <img
                :src="auth.restaurantImg"
                width="75"
                height="75"
                class="rounded-circle mx-3"
              />
              <div class="text-center">
                <h3 class="py-1">الصفحه الشخصيه</h3>
                <h3 class="">{{ auth.restaurantName }}</h3>
              </div>
            </div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/"> المنيو </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/"> الطلبات </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
const auth = useAuthStore();
const aside = ref(false);

function asideShow(){
  
  aside.value = !aside.value;
}
</script>

<style lang="scss" scoped>
.aside-btn {
  border-radius: 50%;
  border: none;
  position: fixed;
  top: 15px;
  right: 15px;
  z-index: 999;
  background: #eee;
  img{
    width: 25px;
    height: 25px;
    margin: 5px;
  }
}
nav {
  height: 100%;
  min-width: 300px;
  position: fixed;
  margin: 0;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(58, 58, 58, 0.61);
  z-index: 99;
  color: #fff !important;
  text-align: center;
}
h1,
a {
  color: #fff;
  text-decoration: none;
  font-size: 1.3rem;
}
a:hover {
  color: #a6e66e;
}
.profile-box {
  display: flex;
  align-items: center;
}
.nav-item {
  margin: 15px 0;
}
</style>
