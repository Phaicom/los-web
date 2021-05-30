<template>
  <div class="list">
    <div class="card__container" v-for="product in products" :key="product.id">
      <ProductCard :product="product" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import ProductCard from "@/components/ProductCard.vue";

export default {
  components: {
    ProductCard,
  },
  setup(): unknown {
    const store = useStore();
    const products = computed(() => store.state.product.products);

    onBeforeMount(() => {
      store.dispatch("product/GetAll");
    });

    return { products };
  },
};
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  min-height: 100vh;

  .card__container {
    width: calc(100%);

    @include media(">=tablet") {
      width: calc(100% / 2);
    }

    @include media(">=1300px") {
      width: calc(100% / 3);
    }
  }
}
</style>
