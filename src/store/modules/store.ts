/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios";
import { Commit } from "vuex";
import { Product } from "@/models/product";

const url = process.env.VUE_APP_API_URL;

export const product = {
  namespaced: true,
  state: { products: [] as Product[] },
  mutations: {
    setProducts(state: { products: Product[] }, value: Product[]) {
      state.products = value;
    },
  },
  actions: {
    async GetAll({ commit }: { commit: Commit }) {
      const { data: product } = await axios.get(url + "products");
      commit("setProducts", product);
    },
  },
  modules: {},
};
