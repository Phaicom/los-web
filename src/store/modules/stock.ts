/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from "axios";
import { Commit, Dispatch } from "vuex";
import { Stock, StockDto } from "@/models/stock";

const url = process.env.VUE_APP_API_URL;

export const stock = {
  namespaced: true,
  state: { stocks: [] as Stock[] },
  mutations: {
    setStocks(state: { stocks: Stock[] }, value: Stock[]) {
      state.stocks = value;
    },
  },
  actions: {
    async GetAll({ commit }: { commit: Commit }) {
      const { data: stocks } = await axios.get(url + "stocks");
      commit("setStocks", stocks);
    },
    async Create({ dispatch }: { dispatch: Dispatch }, stockDto: StockDto) {
      try {
        await axios.post(url + "stocks", stockDto);
        dispatch("product/GetAll", null, { root: true });
        return { error: null };
      } catch (error) {
        return { error: error.response.status };
      }
    },
    async Delete({ dispatch }: { dispatch: Dispatch }, id: string) {
      try {
        await axios.delete(url + "stocks/" + id);
        dispatch("product/GetAll", null, { root: true });
        return { error: null };
      } catch (error) {
        return { error: error.response.status };
      }
    },
    async Edit(
      { dispatch }: { dispatch: Dispatch },
      { id, stockDto }: { id: string; stockDto: StockDto }
    ) {
      try {
        await axios.put(url + "stocks/" + id, stockDto);
        dispatch("product/GetAll", null, { root: true });
        return { error: null };
      } catch (error) {
        return { error: error.response.status };
      }
    },
  },
  modules: {},
};
