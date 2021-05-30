<template>
  <div class="product-card">
    <div class="product-tumb">
      <img :src="product.imageUrl" :alt="product.name" />
      <div class="product-details">
        <h4>{{ product.name }}</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero,
          possimus nostrum!
        </p>
        <div class="product-bottom-details">
          <div class="product-price" v-if="product.stock">
            {{ price }}
            <p>In stock ({{ product.stock.amount }})</p>
          </div>
          <div class="product-price --out" v-else>
            {{ price }}
            <p>Out of stock</p>
          </div>
          <div class="product-links">
            <v-icon>mdi-heart</v-icon>
            <v-icon>mdi-cart</v-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Product } from "@/models/product";
import { computed } from "vue";

export default {
  props: {
    product: {
      type: Object as () => Product,
      default: {} as Product,
    },
  },
  setup(props: { product: Product }): unknown {
    const formatter = new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    });
    const price = computed(() => formatter.format(props.product.price));

    return { price };
  },
};
</script>

<style lang="scss" scoped>
.product-card {
  width: 280px;
  position: relative;
  box-shadow: 0 2px 7px #dfdfdf;
  margin: 50px auto 0 auto;
  background: #fafafa;

  @include media(">tablet") {
    width: 300px;
  }

  .product-tumb {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 500px;
    padding: 20px;
    background: #f0f0f0;

    img {
      max-width: 100%;
      max-height: 100%;
    }

    .product-details {
      padding: 30px 30px 0 30px;

      h4 {
        font-weight: 500;
        display: block;
        margin-bottom: 18px;
        text-transform: uppercase;
        color: #363636;
        text-decoration: none;
        transition: 0.3s;

        &:hover {
          color: rgb(var(--v-theme-warning));
        }
      }

      p {
        font-size: 15px;
        line-height: 22px;
        margin-bottom: 18px;
        color: #999;
      }

      .product-bottom-details {
        overflow: hidden;
        border-top: 1px solid #eee;
        padding-top: 20px;

        div {
          float: left;
          width: 50%;
        }

        .product-price {
          font-size: 18px;
          color: rgb(var(--v-theme-warning));
          font-weight: 600;

          p {
            font-size: 80%;
            font-weight: 400;
            display: inline-block;
            margin-right: 5px;
            color: #363636;
          }

          &.--out {
            color: #999;
            text-decoration: line-through;
          }
        }

        .product-links {
          text-align: right;

          i {
            display: inline-block;
            margin-left: 5px;
            color: #e1e1e1;
            transition: 0.3s;
            font-size: 17px;

            &:hover {
              color: rgb(var(--v-theme-warning));
            }
          }
        }
      }
    }
  }
}
</style>
