<template>
  <div class="login">
    <img
      class="login__image"
      :src="require('../assets/logo.svg')"
      contain
      height="50"
    />
    <p class="login__title">Please enter your Username.</p>
    <CommonInput
      class="login__input"
      :title="'Username'"
      :parentValue="username"
      @input-change="onInput"
    />
    <Button @click.prevent="submit">Submit</Button>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import CommonInput from "@/components/common/Input.vue";
import Button from "@/components/common/Button.vue";

export default {
  name: "AppLayout",
  components: {
    CommonInput,
    Button,
  },
  setup() {
    const store = useStore();
    const username = ref("");

    const submit = () => {
      store.dispatch("Login", { username });
    };

    const onInput = (id: string) => {
      username.value = id;
    };

    return { username, submit, onInput };
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 375px;
  padding: 0 15px;

  @include media(">phone") {
    padding: 0;
  }

  .login__image {
    margin-bottom: 24px;
  }

  .login__title {
    margin-bottom: 16px;
    text-align: center;
    color: rgb(35, 31, 32);
    font-size: 14px;
  }

  .login__input {
    margin-bottom: 32px;
  }
}
</style>
