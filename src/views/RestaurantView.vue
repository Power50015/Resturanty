<template>
  <main class="home-view">
    <div class="content">
      <div class="logo-section">
        <img
          :src="userData[0].img"
          width="100"
          height="100"
          class="rounded-circle"
        />
        <h1 class="mb-3">المنيو</h1>
        <router-link to="/" class="btn btn-success mx-3"
          >المطاعم</router-link
        >
      </div>
      <div class="container">
        <div class="row">
          <div
            class="col-12 col-md-6 mb-3"
            v-for="i in menuData"
            :key="i.index"
          >
            <div class="card w-100" style="width: 18rem">
              <img :src="i.mealImg" class="card-img-top" :alt="i.mealTitle" />
              <div class="card-body">
                <h5 class="card-title">{{ i.mealTitle }}</h5>
                <p class="card-text">
                  {{ i.mealDes }}
                </p>
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
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import app from "@/firebase";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const db = getFirestore();

const restaurant = route.params.restaurant;
const menuData = reactive([]);

getMenuData();
async function getMenuData() {
  menuData.length = 0;
  const q = query(
    collection(db, "meals"),
    where("mealrestaurant", "==", route.params.restaurant)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    menuData.push(doc.data());
  });
}


const userData = reactive([]);

getUserData();
async function getUserData() {
  userData.length = 0;
  const q = query(
    collection(db, "restaurants"),
    where("email", "==", route.params.restaurant)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    userData.push(doc.data());
  });
}

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
