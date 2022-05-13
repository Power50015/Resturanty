<template>
  <main class="home-view">
    <div class="content">
      <div class="logo-section">
        <img src="@/assets/chef_only.png" width="250" />
        <h1>Resturanty</h1>
      </div>
      <div class="btns">
        <router-link
          to="register"
          class="btn btn-success mx-3"
          >عمل حساب مطعم</router-link
        >
        <router-link to="login" class="btn btn-danger"
          >تسجيل الدخول</router-link
        >
        <router-link
          to="admin-login"
          class="btn btn-success mx-3"
          >تسجيل أدمن</router-link
        >
      </div>
    </div>
  </main>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
h1 {
  font-size: 4rem;
  color: #fff;
  font-weight: bolder;
}
.content {
  background-color: rgba(58, 58, 58, 0.61);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  padding: 50px;
  border-radius: 50px;
  text-align: center;
}
.btns {
  margin: 50px 0;
}
@media only screen and (max-width: 918px) {
  .content {
    padding: 0;
    width: 100%;
  }
  .btn{
    display: block;
  }
}
</style>
