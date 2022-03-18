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
        <h1>أضف وجبه للمنيو</h1>
      </div>
      <form @submit.prevent="SaveMeal()" class="py-5">
        <div class="mb-3">
          <label for="mealTitle" class="form-label">أسم الوجبه</label>
          <input
            type="text"
            class="form-control"
            id="mealTitle"
            v-model="mealTitle"
          />
        </div>
        <div class="mb-3">
          <label for="formFile" class="form-label">صورة الوجبه</label>
          <div class="flex">
            <h6 class="mb-3 text-white">
              حاله رفع الصوره : <span v-if="imgUpload == 100">أكتمل</span>
            </h6>
          </div>
          <div class="progress mb-3">
            <div
              class="progress-bar bg-success"
              :style="{ width: imgUpload + '%' }"
              role="progressbar"
              :aria-valuenow="imgUpload"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>

          <input
            class="form-control"
            type="file"
            id="formFile"
            accept="image/jpeg"
            @change="DetectFiles($event.target.files)"
          />
        </div>
        <div class="mb-3">
          <label for="mealSection" class="form-label">القسم</label>
          <select class="form-select" v-model="mealSection" id="mealSection">
            <option disabled value="">حدد القسم</option>
            <option value="sea">مأكولات بحريه</option>
            <option value="drink">مشروبات</option>
            <option value="pasta">الباستا و المكرونه</option>
            <option value="grill">مشويات</option>
            <option value="sweet">حلويات</option>
            <option value="bakery">مخبوزات</option>
            <option value="fast">وجبات سريعه</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="mealPrice" class="form-label">السعر</label>
          <input
            type="number"
            class="form-control"
            id="mealPrice"
            v-model="mealPrice"
            min="0"
          />
        </div>
        <div class="mb-3">
          <label for="mealDes" class="form-label">وصف الوجبه</label>
          <textarea
            class="form-control"
            id="mealDes"
            v-model="mealDes"
          ></textarea>
        </div>
        <button
          type="submit"
          class="btn btn-success mt-5 w-100"
          :disabled="!btn"
        >
          حفظ الوجبه
        </button>
      </form>
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

const mealTitle = ref("");
const mealImg = ref("");
const mealPrice = ref("");
const mealSection = ref("");
const mealDes = ref("");

const btn = ref(false);
const imgUpload = ref(0);

async function SaveMeal() {
    await auth.addMeal(
      mealTitle.value,
      mealImg.value,
      mealPrice.value,
      mealSection.value,
      mealDes.value,
    );
    mealTitle.value = "";
    mealSection.value = "";
    mealImg.value = "";
    mealPrice.value = "";
    mealDes.value = "";
  btn.value = false;
  router.push("/menu");
}

function DetectFiles(img) {
  const imgData = img[0];
  const storage = getStorage();
  const storageRef = refire(storage, `${imgData.name}`);
  const uploadTask = uploadBytesResumable(storageRef, imgData);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      imgUpload.value = Math.floor(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
    },
    (error) => {
      alert(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
        btn.value = true;
        console.log("File available at", URL);
        mealImg.value = URL;
      });
    }
  );
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
form {
  margin: 50px 0 15px;
  text-align: right;
  .form-label {
    color: #fff;
  }
  #mealDes{
      height: 300px;
  }
}
.home-view {
  margin: 10px 450px 30px;
}
@media only screen and (max-width: 1240px) {
  .home-view {
    margin: 0;
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
