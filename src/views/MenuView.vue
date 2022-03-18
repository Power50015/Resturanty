<template>
  <main class="home-view">
    <div class="content">
      <div class="logo-section">
        <img
          :src="auth.restaurantImg"
          width="200"
          height="200"
          class="rounded-circle"
        />
        <h1>المنيو</h1>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6 mb-3" v-for="i in 10" :key="i.index">
            <div class="card w-100" style="width: 18rem">
              <img :src="auth.restaurantImg" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <button class="btn btn-danger" >
                  تسجيل الخروج
                </button>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  getStorage,
  ref as refire,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const router = useRouter();
const auth = useAuthStore();
</script>

<style lang="scss" scoped>
h1 {
  font-size: 4rem;
  color: #fff;
  font-weight: bolder;
}
.content {
  background-color: rgba(58, 58, 58, 0.61);
  z-index: 5;
  padding: 15px 50px;
  border-radius: 50px;
  text-align: center;
}
.home-view {
  margin: 10px 450px 30px;
}
.container {
  margin-top: 50px;
  text-align: right;
}
@media only screen and (max-width: 1399px) {
  .home-view {
    margin: 10px 0px 30px !important;
  }
}
@media only screen and (max-width: 918px) {
  .home-view {
    margin: 0;
  }
  .content {
    padding: 0;
    width: 100%;
  }
}
</style>
