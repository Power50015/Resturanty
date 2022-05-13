<template>
  <main class="home-view">
    <div class="content">
      <div class="logo-section">
        <img src="@/assets/chef_only.png" width="250" />
        <h1>Resturanty</h1>
      </div>
      <form @submit.prevent="LoginUser()" class="py-5">
        <div class="mb-3">
          <label for="inputEmail" class="form-label">البريد الإلكترونى</label>
          <input
            type="email"
            class="form-control"
            id="inputEmail"
            v-model="userEmail"
          />
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="form-label">كلمه المرور</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            v-model="userPassword"
          />
        </div>
        <button
          type="submit"
          class="btn btn-success mt-5 w-100"
        >
          تسجيل الدخول
        </button>
        <br />
        <router-link to="register" class="mx-3 text-info"
          >عمل حساب جديد</router-link
        >
      </form>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const auth = useAuthStore();

const userEmail = ref("jsr2@jsr2.com");
const userPassword = ref("jsr2@jsr2.com");

const btn = ref(false);

async function LoginUser() {
    await auth.login(
      userEmail.value,
      userPassword.value,
    );
    userEmail.value = "";
    userPassword.value = "";
    router.push("/");
  
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
