<template>
  <div class="product">
    <Button @click.prevent="toggleModal(true)" class="toggle__button"
      >Add Stock</Button
    >
    <div class="table__container">
      <table>
        <thead>
          <tr>
            <th class="text-left">Id</th>
            <th class="text-left">Product Name</th>
            <th class="text-left">Amount</th>
            <th class="text-left">edit</th>
            <th class="text-left">delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in productStocks" :key="product.stock.id">
            <td>{{ product.stock.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.stock.amount }}</td>
            <td class="table__button --edit">
              <v-icon @click="toggleEditModal(product)"
                >mdi-playlist-edit</v-icon
              >
            </td>
            <td class="table__button --delete">
              <v-icon @click="deleteStock(product.stock.id)">mdi-close</v-icon>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal class="add-product__modal" v-if="isToggle">
      <template v-slot:header>{{ isCreate ? "Add" : "Edit" }} Stock</template>
      <template v-slot:body>
        <div class="modal__form">
          <div>
            Product Name
            <Select
              :options="
                isCreate
                  ? productNoStocks
                  : [...productNoStocks, selectedOption]
              "
              :parentValue="productId"
              @on-change="(v) => (productId = v)"
            ></Select>
          </div>
          <div>
            Amount
            <Input
              :title="'Amount'"
              :type="'number'"
              :parentValue="amount"
              @input-change="(v) => (amount = v)"
            />
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="modal__buttons">
          <Button
            @click.prevent="toggleModal(false)"
            :transparent="true"
            class="toggle__button"
            >Close</Button
          >
          <Button
            @click.prevent="isCreate ? addStock() : editStock()"
            :transparent="true"
            class="toggle__button"
            >{{ isCreate ? "Add" : "Edit" }}</Button
          >
        </div>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
import Button from "@/components/common/Button.vue";
import Modal from "@/components/common/Modal.vue";
import Input from "@/components/common/Input.vue";
import Select from "@/components/common/Select.vue";
import { currencyFormatter } from "@/helpers/formatHelper";
import { Product } from "@/models/product";
import { StockDto } from "@/models/stock";

export default {
  components: {
    Button,
    Modal,
    Input,
    Select,
  },
  setup(): unknown {
    const store = useStore();
    const products = computed(() => store.state.product.products);
    const productStocks = computed(() => {
      return products.value.filter((product: Product) => {
        if (product.stock) {
          return product;
        }
      });
    });
    const productNoStocks = computed(() => {
      return products.value
        .filter((product: Product) => {
          if (!product.stock) {
            return product;
          }
        })
        .map((product: Product) => {
          return { value: product.id, label: product.name };
        });
    });
    const id = ref("");
    const productId = ref("");
    const amount = ref(0);
    const selectedOption = ref({});
    const isToggle = ref(false);
    const isCreate = ref(true);

    onBeforeMount(() => {
      store.dispatch("product/GetAll");
    });

    const toggleModal = (value: boolean) => {
      id.value = "";
      productId.value = "";
      amount.value = 0;
      selectedOption.value = {};
      isToggle.value = value;
      isCreate.value = true;
    };

    const toggleEditModal = (product: Product) => {
      id.value = product.stock.id;
      productId.value = product.id;
      amount.value = product.stock.amount;
      selectedOption.value = { value: product.id, label: product.name };
      isToggle.value = true;
      isCreate.value = false;
    };

    const addStock = async () => {
      const stockDto: StockDto = {
        productId: productId.value,
        amount: amount.value,
      };

      const { error } = await store.dispatch("stock/Create", stockDto);
      if (error) {
        console.log(error);
      } else {
        toggleModal(false);
      }
    };

    const deleteStock = async (id: string) => {
      const { error } = await store.dispatch("stock/Delete", id);
      if (error) {
        console.log(error);
      }
    };

    const editStock = async () => {
      const editId = id.value;
      const stockDto: StockDto = {
        productId: productId.value,
        amount: amount.value,
      };

      const { error } = await store.dispatch("stock/Edit", {
        id: editId,
        stockDto,
      });
      if (error) {
        console.log(error);
      } else {
        toggleModal(false);
      }
    };

    return {
      productStocks,
      productNoStocks,
      currencyFormatter,
      isToggle,
      id,
      productId,
      amount,
      toggleModal,
      addStock,
      isCreate,
      deleteStock,
      editStock,
      toggleEditModal,
      selectedOption,
    };
  },
};
</script>

<style lang="scss">
.table__container {
  thead {
    th:not(:last-child) {
      padding-right: 10px;
    }
  }

  tbody {
    tr {
      &:nth-child(even) {
        background-color: lightgray;
      }

      td {
        white-space: nowrap;

        &:not(:last-child) {
          padding-right: 10px;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.product {
  width: 100%;
  margin: 50px auto 0 auto;
  overflow-x: scroll;

  .toggle__button {
    padding: 0 20px;
  }

  .table__container {
    width: fit-content;
    margin-top: 20px;

    .table__button {
      text-align: center;

      &.--edit {
        color: rgb(var(--v-theme-info));
      }

      &.--delete {
        color: rgb(var(--v-theme-error));
      }
    }
  }

  .add-product__modal {
    .modal__form {
      div:not(:last-child) {
        margin-bottom: 10px;
      }
    }

    .modal__buttons {
      display: flex;

      button:last-child {
        margin-left: auto;
      }
    }
  }
}
</style>
