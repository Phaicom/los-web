<template>
  <div class="home">
    <Login />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Login from "../components/Login.vue";

export default defineComponent({
  name: "Home",

  components: {
    Login,
  },
});
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  height: 100vh;
  margin-top: 42px;

  @include media(">phone") {
    align-items: center;
    margin-top: 0;
  }
}
</style>
