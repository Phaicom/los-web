/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios";
import { Commit, Dispatch } from "vuex";
import { Product, ProductDto } from "@/models/product";

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
    async Create({ dispatch }: { dispatch: Dispatch }, productDto: ProductDto) {
      try {
        await axios.post(url + "products", productDto);
        dispatch("GetAll");
        return { error: null };
      } catch (error) {
        return { error: error.response.status };
      }
    },
    async Delete({ dispatch }: { dispatch: Dispatch }, id: string) {
      try {
        await axios.delete(url + "products/" + id);
        dispatch("GetAll");
        return { error: null };
      } catch (error) {
        return { error: error.response.status };
      }
    },
    async Edit(
      { dispatch }: { dispatch: Dispatch },
      { id, productDto }: { id: string; productDto: ProductDto }
    ) {
      try {
        await axios.put(url + "products/" + id, productDto);
        dispatch("GetAll");
        return { error: null };
      } catch (error) {
        return { error: error.response.status };
      }
    },
  },
  modules: {},
};
