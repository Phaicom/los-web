<template>
  <div class="home">
    <LoginCard />
  </div>
</template>

<script lang="ts">
import LoginCard from "../components/LoginCard.vue";

export default {
  components: {
    LoginCard,
  },
};
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
