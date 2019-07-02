import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import _ from "lodash";
// Create a localStorage system for persisting data
const vuexLocal = new VuexPersistence({
  key: "easycore",
  storage: window.localStorage
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isFirstTimeExperience: true,
    syncSuccess: false,
    // holds a shallow copy of the remaining sales product from the preview page ...
    // .. for offline syncing. .
    shallowSalesProducts: [],
    // holds attr if the `whole` app is in offline mode
    isOffline: false, // has no mutation, defaults to false

    // ajax loading state
    loading: false,
    drawer: false,
    error: false,
    success: false,
    expenses: [],
    /** == INVENTORY == */

    salesPhone: "",
    // sales
    salesProducts: [],
    // for `make sales`
    offlineNames: [],
    // for `make sales children`
    offlineAttrChild: [],

    // products
    structuredProducts: [],
    newProducts: [],
    // Damages
    damages: [],

    branchAuth: {
      id: "",
      auth: ""
    },
    user: {},
    saleUsers: [],

    sideBar: {},
    storeDetails: {},
    storeSummary: {},
    seeMore: {},
    employees: {},
    err: {
      key: false,
      message: "Sorry, the server could'nt send a complete response"
    }
  },
  getters: {
    /* Get Summary from server */
    getStoreSummaries: state => state.storeSummary,
    /* Get seeMore to the caller */
    getSeeMore: state => state.seeMore
  },
  mutations: {
    setShallowSalesProducts(state, needle) {
      state.shallowSalesProducts.push(needle);
    },
    setSaleUser(state, needle) {
      var existingUser = state.saleUsers.find(x => x.id === needle.id);
      if (existingUser) {
        console.warn("Removing duplicate user..", existingUser.username);
        // state.saleUsers.splice(existingUser, 1);
      } else {
        state.saleUsers.push(needle);
      }
    },
    // set offline names for sales page
    setOfflineNames(state, needle) {
      state.offlineNames = needle;
    },
    setOfflineAttrChild(state, needle) {
      state.offlineAttrChild = needle;
    },

    addNewProduct(state, needle) {
      state.newProducts.push(needle);
    },
    clearStockProducts(state) {
      state.newProducts = [];
    },

    addDamage(state, needle) {
      state.damages.push(needle);
    },
    addExpense(state, needle) {
      state.expenses.push(needle);
    },
    /**
     * @description For Sales
     * @param {*} state
     * @param {*} needle
     */
    addSalesProduct(state, needle) {
      /** == Let's prune | remove empty Object's first == */
      state.salesProducts.forEach(v => {
        v.sn === undefined ? !v : v;
      });
      Array.isArray(needle)
        ? (state.salesProducts = needle)
        : state.salesProducts.push(needle);
    },
    /**
     * @description Adds a new product from `//../products/add-product-structure`
     * @param {*} state
     * @param {*} needle
     */
    addStructuredProduct(state, needle) {
      /** == Let's prune | remove empty Object's first == */
      state.structuredProducts.forEach(v => {
        v.sn === undefined ? !v : v;
      });

      state.structuredProducts.push(needle);
    },

    clearStructuredProduct(state) {
      state.structuredProducts = [];
    },

    removeStructuredProduct(state, needle) {
      var toBeRemoved = state.structuredProducts.find(x =>
        x.genericName.includes(needle)
      );
      if (!_.isUndefined(toBeRemoved) && toBeRemoved) {
        state.structuredProducts.splice(toBeRemoved, 1);
      }
    },
    removeSalesProduct(state, needle) {
      var toBeRemoved = state.salesProducts.find(
        x => x.product.productID === needle // converts `needle` to a number pragmatically
      );
      toBeRemoved ? state.salesProducts.splice(toBeRemoved, 1) : null;
    },
    removeStockProduct(state, needle) {
      var toBeRemoved = state.newProducts.find(
        x => x.product.productID == needle // converts `needle` to a number pragmatically
      );
      toBeRemoved ? state.newProducts.splice(toBeRemoved, 1) : null;
    },
    removeExpense(state, needle) {
      var toBeRemoved = state.expenses.find(x => x.sn === needle);
      if (toBeRemoved) {
        state.expenses.splice(toBeRemoved, 1);
      }
    },
    removeDamageProduct(state, needle) {
      var toBeRemoved = state.damages.find(x => x.sn === needle);
      if (toBeRemoved) {
        state.damages.splice(toBeRemoved, 1);
      }
    },
    clearAllState(state) {
      state.user = {};
      state.sideBar = {};
      state.storeDetails = {};
      state.seeMore = {};
      // history.go();
      console.log(state);
    },
    setSideBar(state, needle) {
      state.sideBar = needle;
    },
    setBranchAuth(state, payload) {
      state.branchAuth = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    /* Set store details */
    setStoreDetails(state, payload) {
      state.storeDetails = payload;
    },
    /* Set store summary */
    setStoreSummaries(state, payload) {
      state.storeSummary = payload;
    },
    /* Set seeMore */
    setSeeMore(state, payload) {
      state.seeMore = payload;
    },
    /* LOG User out */
    userLogout(state) {
      // state.branchAuth = { id: "", auth: "" };
      state.user = {};
    },

    /* Set employees */
    setEmployees(state, payload) {
      state.employees = payload;
    }
  },
  actions: {
    /* Get Store details Action */
    setStoreDetails({ commit }, payload) {
      commit("setStoreDetails", payload);
    },
    /* ACTION: Get Store Summary */
    setStoreSummaries({ commit }, payload) {
      commit("setStoreSummaries", payload);
    },
    /* Set seeMore */
    setSeeMore({ commit }, payload) {
      commit("setSeeMore", payload);
    },

    /* Logout current User */
    logout({ commit }) {
      commit("userLogout");
    }
  },
  plugins: [vuexLocal.plugin]
});
