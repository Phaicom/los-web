<template>
  <v-app id="main">
    <v-main>
      <AppLayout>
        <router-view />
      </AppLayout>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { computed, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "App",
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const isLoggedin = computed(() => store.state.isLoggedin);

    watchEffect(() => {
      const name = route.name;
      if (isLoggedin.value && name === "Login") {
        router.push("/");
      } else if (!isLoggedin.value && name !== "Login") {
        router.push("/login");
      }
    });

    return {};
  },
};
</script>

<style lang="scss" scoped>
#main {
  min-height: 100vh;
}
</style>
