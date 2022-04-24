<template>
  <main class="home-view">
    <div class="content">
      <h2 class="border-bottom mb-3 d-inline-block p-3">الصفحه الشخصيه</h2>
      <div class="logo-section">
        <img
          :src="auth.restaurantImg"
          width="200"
          height="200"
          class="rounded-circle"
        />
      </div>
      <form @submit.prevent="SaveUser()" class="pb-5">
        <div class="mb-3">
          <label for="inputName" class="form-label">أسم المستخدم</label>
          <input
            type="text"
            class="form-control"
            id="inputName"
            v-model="userName"
          />
        </div>
        <div class="mb-3">
          <label for="inputEmail" class="form-label">البريد الإلكترونى</label>
          <input
            type="email"
            class="form-control"
            id="inputEmail"
            :value="auth.restaurantEmail"
            disabled
          />
        </div>
        <div class="mb-3">
          <label for="formFile" class="form-label">الصورة الشخصيه</label>
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
          <label for="inputArea" class="form-label">المنطقه</label>
          <select class="form-select" v-model="userArea" id="inputArea">
            <option disabled selected value="">حدد المطقه</option>
            <option value="shrouq">الشروق</option>
            <option value="ismailia">إسماعليه</option>
            <option value="suze">السويس</option>
            <option value="cairo">القاهرة</option>
            <option value="geza">الجيزة</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="userType" class="form-label">نوع المطعم</label>
          <select class="form-select" v-model="userType" id="userType">
            <option disabled selected value="">حدد النوع</option>
            <option value="مشاوى">مشاوى</option>
            <option value="بحرى">أكلات بحريه</option>
            <option value="شامى">شامى</option>
            <option value="برجر">برجر</option>
            <option value="بيتزا">بيتزا</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="userAdrres" class="form-label">العنوان</label>
          <input
            type="text"
            class="form-control"
            id="userAdrres"
            v-model="userAdrres"
          />
        </div>
        <div class="mb-3">
          <label for="map" class="form-label">الخريطه</label>
          <input type="text" class="form-control" id="map" v-model="map" />
        </div>
        <div class="mb-3" v-if="map != ''">
          <iframe
            :src="GoogleMapsURLToEmbedURL"
            style="width: 100%"
            allowfullscreen="fasle"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div class="mb-3">
          <label for="userPhone" class="form-label">الهاتف</label>
          <input
            type="text"
            class="form-control"
            id="userPhone"
            v-model="userPhone"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">مواعيد العمل</label>
          <div class="row">
            <div class="col-6">
              <input
                type="number"
                class="form-control"
                id="startTime"
                v-model="startTime"
              />
            </div>
            <div class="col-6">
              <input
                type="number"
                class="form-control"
                id="endTime"
                v-model="endTime"
              />
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="inputDes" class="form-label">نبذه شخصيه</label>
          <textarea
            class="form-control"
            id="inputDes"
            v-model="userDes"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-success mt-5 w-100">
          تعديل بيانات الحساب
        </button>
        <br />
      </form>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import {
  getStorage,
  ref as refire,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
const router = useRouter();
const auth = useAuthStore();

const userName = ref(auth.restaurantName);
const userDes = ref(auth.restaurantDes);
const userArea = ref(auth.restaurantArea);
const userAdrres = ref(auth.restaurantAdrres);
const userImg = ref(auth.restaurantImg);
const userPhone = ref(auth.restaurantPhone);
const imgUpload = ref(0);
const userType = ref(auth.restaurantType);
const startTime = ref(auth.restaurantStartTime);
const endTime = ref(auth.restaurantEndTime);
const map = ref(auth.restaurantMap);
const GoogleMapsURLToEmbedURL = computed(() => {
  var coords = /\@([0-9\.\,\-a-zA-Z]*)/.exec(map.value);
  if (coords != null) {
    var coordsArray = coords[1].split(",");
    return (
      "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d20000!2d" +
      coordsArray[1] +
      "!3d" +
      coordsArray[0] +
      "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1486486434098"
    );
  }
});
function SaveUser() {
  auth.editUser(
    userName.value,
    userDes.value,
    userArea.value,
    userAdrres.value,
    userPhone.value,
    userImg.value
  );
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
        userImg.value = URL;
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

h2 {
  font-size: 3rem;
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
