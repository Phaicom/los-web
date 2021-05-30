<template>
  <div class="home">
    <Firework />
    <h1>
      Welcome <span>{{ username }}</span>
    </h1>
  </div>
</template>
<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import Firework from "@/components/animation/Firework.vue";

export default {
  components: {
    Firework,
  },
  setup(): unknown {
    const store = useStore();
    const username = computed(() => store.state.username.toUpperCase());

    return { username };
  },
};
</script>

<style lang="scss" scoped>
.home {
  max-width: 375px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;

  span {
    color: rgb(var(--v-theme-primary));
  }
}
</style>
