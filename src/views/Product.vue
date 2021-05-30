<template>
  <div class="product">
    <Button @click.prevent="toggleModal(true)" class="toggle__button"
      >Add Product</Button
    >
    <div class="table__container">
      <table>
        <thead>
          <tr>
            <th class="text-left">Id</th>
            <th class="text-left">Name</th>
            <th class="text-left">Price</th>
            <th class="text-left">edit</th>
            <th class="text-left">delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.name">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ currencyFormatter(product.price) }}</td>
            <td class="table__button --edit">
              <v-icon @click="toggleEditModal(product)"
                >mdi-playlist-edit</v-icon
              >
            </td>
            <td class="table__button --delete">
              <v-icon @click="deleteProduct(product.id)">mdi-close</v-icon>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Modal class="add-product__modal" v-if="isToggle">
      <template v-slot:header>{{ isCreate ? "Add" : "Edit" }} Product</template>
      <template v-slot:body>
        <div class="modal__form">
          <div>
            Name
            <Input
              :title="'Name'"
              :parentValue="name"
              @input-change="(v) => (name = v)"
            />
          </div>
          <div>
            Image URL
            <Input
              :title="'Image URL'"
              :parentValue="imageUrl"
              @input-change="(v) => (imageUrl = v)"
            />
          </div>
          <div>
            Price
            <Input
              :title="'Price'"
              :type="'number'"
              :parentValue="price"
              @input-change="(v) => (price = v)"
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
            @click.prevent="isCreate ? addProduct() : editProduct()"
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
import { currencyFormatter } from "@/helpers/formatHelper";
import { ProductDto, Product } from "@/models/product";

export default {
  components: {
    Button,
    Modal,
    Input,
  },
  setup(): unknown {
    const store = useStore();
    const products = computed(() => store.state.product.products);
    const isToggle = ref(false);
    const id = ref("");
    const name = ref("");
    const imageUrl = ref("");
    const price = ref(0);
    const isCreate = ref(true);

    onBeforeMount(() => {
      store.dispatch("product/GetAll");
    });

    const toggleModal = (value: boolean) => {
      id.value = "";
      name.value = "";
      imageUrl.value = "";
      price.value = 0;
      isToggle.value = value;
      isCreate.value = true;
    };

    const toggleEditModal = (product: Product) => {
      id.value = product.id;
      name.value = product.name;
      imageUrl.value = product.imageUrl;
      price.value = product.price;
      isToggle.value = true;
      isCreate.value = false;
    };

    const addProduct = async () => {
      const productDto: ProductDto = {
        name: name.value,
        imageUrl: imageUrl.value,
        price: price.value,
      };

      const { error } = await store.dispatch("product/Create", productDto);
      if (error) {
        console.log(error);
      } else {
        toggleModal(false);
      }
    };

    const deleteProduct = async (id: string) => {
      const { error } = await store.dispatch("product/Delete", id);
      if (error) {
        console.log(error);
      }
    };

    const editProduct = async () => {
      const editId = id.value;
      const productDto: ProductDto = {
        name: name.value,
        imageUrl: imageUrl.value,
        price: price.value,
      };

      const { error } = await store.dispatch("product/Edit", {
        id: editId,
        productDto,
      });
      if (error) {
        console.log(error);
      } else {
        toggleModal(false);
      }
    };

    return {
      products,
      currencyFormatter,
      isToggle,
      toggleModal,
      name,
      imageUrl,
      price,
      addProduct,
      deleteProduct,
      toggleEditModal,
      isCreate,
      editProduct,
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
