<template>
  <div class="home">
    <h1>Welcome {{ username }}</h1>
  </div>
</template>
<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "App",
  setup() {
    const store = useStore();
    const username = computed(() => store.state.username);

    return { username };
  },
};
</script>
