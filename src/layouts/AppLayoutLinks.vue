/* eslint-disable vue/no-deprecated-slot-attribute */
<template>
  <div id="nav">
    <v-icon @click="toggleDrawer" class="toggle__button">
      {{ drawer ? "mdi-close" : "mdi-menu " }}
    </v-icon>
    <v-navigation-drawer
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      app
      dark
      class="primary lighten-3"
    >
      <div class="nav__menu">
        <div v-for="item in items" :key="item.title">
          <router-link :to="item.path">{{ item.title }}</router-link>
        </div>
        <a href="#" @click="logout">Logout</a>
      </div>
    </v-navigation-drawer>
    <div class="content" :class="{ '--open': drawer }">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  name: "AppLayoutLinks",
  setup(): unknown {
    const store = useStore();
    const drawer = ref(true);
    const clipped = ref(false);
    const items = ref<unknown>([]);
    const route = useRoute();

    onMounted(() => {
      items.value = [
        {
          title: "Product",
          path: "/product",
        },
        {
          title: "Stock",
          path: "/stock",
        },
        {
          title: "List",
          path: "/list",
        },
      ];
    });

    watch(
      () => route.name,
      () => {
        drawer.value = false;
        window.scrollTo(0, 0);
      }
    );

    const toggleDrawer = () => {
      drawer.value = !drawer.value;
    };

    const logout = () => {
      store.dispatch("Logout");
    };

    return { drawer, clipped, items, toggleDrawer, logout };
  },
};
</script>
<style lang="scss">
.v-navigation-drawer {
  box-shadow: none;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
<style lang="scss" scoped>
#nav {
  .toggle__button {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 50px;
    height: 50px;
    font-size: 35px;
    margin-top: 10px;

    @include media(">tablet") {
      padding-left: 30px;
    }
  }

  .nav__menu {
    margin-top: 80px;
    padding: 0 15px;

    @include media(">tablet") {
      padding: 0 30px;
    }

    div {
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      padding: 8px 0;
    }

    a {
      text-decoration: none;
      font-size: 1.5rem;
      line-height: 1.5;
      color: #363636;

      &.router-link-exact-active {
        color: rgb(var(--v-theme-primary));
      }
    }
  }

  .content {
    transition: all 0.3s ease;
    overflow: hidden;
    width: 100vw;
    padding: 0 30px;

    @include media(">phone") {
      width: auto;
      padding: 0 60px;
    }

    @include media(">tablet") {
      &.--open {
        margin-left: 256px;
        padding: 0 30px;
      }
    }
  }
}
</style>
