import Vue from "vue";
import Vuex from "vuex";
import CompanyService from "@/services/company.service";
import type { Company } from "@/services/company.service";
import InvestmentService from "@/services/investment.service";
import type { Investment } from "@/services/investment.service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    investments: [],
    companies: [],
    loading: false,
  },
  mutations: {
    SET_INVESTMENTS(state, investments) {
      state.investments = investments;
    },
    SET_COMPANIES(state, companies) {
      state.companies = companies;
    },
    DELETE_INVESTMENT(state, investmentId) {
      state.investments = state.investments.filter(
        ({ id }) => id !== investmentId
      );
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    fetchInvestments: async ({ commit }) => {
      const data = await InvestmentService.getAll();
      commit("SET_INVESTMENTS", data);
    },
    fetchCompanies: async ({ commit }) => {
      const data = await CompanyService.getAll();
      commit("SET_COMPANIES", data);
    },
    deleteInvestment: async ({ commit }, id) => {
      try {
        commit("SET_LOADING", true);
        await InvestmentService.deleteById(id);
        commit("DELETE_INVESTMENT", id);
        commit("SET_LOADING", false);
      } catch (e) {
        commit("SET_LOADING", false);
        console.error(e);
      }
    },
  },
  getters: {
    getLoadingState(state) {
      return state.loading;
    },
    getInvestmentsWithName(state) {
      return state.investments.map((investment: Investment) => {
        const companyData: any = state.companies.find(
          ({ id }) => id === investment.companyId
        );
        return {
          ...investment,
          companyName: companyData?.name,
        };
      });
    },
    getCompaniesWithAmount: (state) => (period: number) => {
      return state.companies.map((company: Company) => {
        const investmentAmount: number = state.investments.reduce(
          (previousValue: number, currentValue: Investment) => {
            const investmentPeriod = new Date(currentValue.date).getFullYear();
            const currentYear = new Date().getFullYear();
            const investmentPeriodIncluded =
              period === 0 ? true : currentYear - period <= investmentPeriod;
            if (
              currentValue.companyId === company.id &&
              investmentPeriodIncluded
            ) {
              previousValue += currentValue.amount;
            }
            return previousValue;
          },
          0
        );
        return {
          ...company,
          investmentAmount,
        };
      });
    },
  },
  modules: {},
});
