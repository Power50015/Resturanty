<template>
  <main class="home-view">
    <div class="content">
      <div class="logo-section">
        <h1 class="mb-3">الطلبات</h1>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6 mb-3" v-for="i in orderData" :key="i.index">
            <div class="card w-100" style="width: 18rem">
              <div class="card-body text-center">
                <h5 class="card-title">رقم الأوردر : {{i.id}} </h5>
                <h5 class="card-title">وسيله الدفع : {{i.paymentMethod}}</h5>
                <h5 class="card-title">تاريخ الوصول : {{i.day}} </h5>
                <h5 class="card-title">وقت الوصول : {{i.time}} </h5>
                <h5 class="card-title">عدد الأشخاص  : {{i.persons}} </h5>
                <p class="card-text ">
                  <ul>
                      <li><img :src="i.user['Img']" :alt="i.user['Name']" width="100" height="100" class="rounded-circle mx-3"></li>
                      <li>المستخدم : {{i.user["Name"]}}</li>
                      <li>البريد الإلكترونى : {{i.user["Email"]}}</li>
                      <li>رقم التلفون : {{i.user["Phone"]}}</li>
                      <li>وسيله الدفع : {{i.paymentMethod}}</li>
                  </ul>
                  <ul class="bg-secondary p-3">
                      <h5 class="card-title">الأوردر</h5>
                      <li  v-for="x in i.order" :key="x.index">{{x.meal["mealTitle"]}} : {{x.count}}</li>
                  </ul>
                  <button class="btn btn-success m-3" @click="state(i.docId)">تم الحجز</button>
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
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";

const router = useRouter();
const auth = useAuthStore();
const db = getFirestore();

const orderData = reactive([]);

getImageData();
async function getImageData() {
  orderData.length = 0;
  const q = query(
    collection(db, "orders"),
    where("restaurant.email", "==", auth.restaurantEmail),
    where("states", "==", 0)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    orderData.push({ docId: doc.id, ...doc.data() });
  });
}

async function state(id) {
  await updateDoc(doc(db, "orders", id), {
    states: 1,
  });
  getImageData();
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
