<template>
  <main class="home-view">
    <div class="content">
      <div class="logo-section">
        <h1 class="mb-3">المطاعم</h1>
        <button class="btn btn-danger" @click="logout">تسجيل الخروج</button>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6 mb-3 text-center" v-for="i in restaurantsData" :key="i.index">
            <div class="card w-100" style="width: 18rem">
              <img :src="i.img" class="card-img-top" :alt="i.name" width="250" height="250" />
              <div class="card-body">
                <h5 class="card-title">{{i.name}}</h5>
                <p class="card-text">
                  <ul>
                      <li>مطعم {{i.type}}</li>
                      <li>{{i.email}}</li>
                      <li>{{i.phone}}</li>
                      <li>{{i.area}}</li>
                      <li>{{i.adrres}}</li>
                      <li>مواعيد العمل من :{{i.startTime}}</li>
                      <li>مواعيد العمل إلى :{{i.endTime}}</li>
                      <li>{{i.des}}</li>
                  </ul>
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
import { useRouter } from "vue-router";
import app from "@/firebase";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";

const router = useRouter();
const auth = useAuthStore();
const db = getFirestore();

const restaurantsData = reactive([]);

function logout() {
  auth.logout();
  router.push("/");
}

getImageData();
async function getImageData() {
  restaurantsData.length = 0;
  const q = query(collection(db, "restaurants"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    restaurantsData.push(doc.data());
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
li {
  padding: 5px;
}
</style>
