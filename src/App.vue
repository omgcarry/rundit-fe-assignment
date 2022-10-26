<template>
  <div id="app">
    <h1>Rundit Assignment</h1>
    <p>
      Read the `README.md` to get started with the assignment and happy coding!
      Investment data can be accessed via the InvestmentService and company data
      from the CompanyService.
    </p>
    <div class="spinner" v-if="initialLoading">Fetching data...</div>
    <template v-else>
      <investment-listing />
      <investment-summary />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InvestmentListing from "./components/InvestmentListing.vue";
import InvestmentSummary from "./components/InvestmentSummary.vue";
import { mapActions } from "vuex";

@Component({
  components: {
    InvestmentListing,
    InvestmentSummary,
  },
  methods: {
    ...mapActions({
      fetchInvestments: "fetchInvestments",
      fetchCompanies: "fetchCompanies",
    }),
  },
})
export default class App extends Vue {
  initialLoading = false;

  fetchInvestments!: () => object[];
  fetchCompanies!: () => object[];

  async created() {
    this.initialLoading = true;
    await this.fetchInvestments();
    await this.fetchCompanies();
    this.initialLoading = false;
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-stretch: 100%;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVI.woff2)
    format("woff2");
}
@font-face {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-stretch: 100%;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/opensans/v34/memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTS-muw.woff2)
    format("woff2");
}
#app {
  font-family: "Open Sans", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.investment-table {
  width: 330px;
  max-width: 100%;
  margin: 20px auto 0;
  border: 0.4px solid #e8e8e8;
  &--fixed {
    table-layout: fixed;
  }
  &__cell {
    text-align: left;
    font-size: 10px;
    line-height: 18px;
    color: #78909c;
    font-weight: 400;
    padding: 6px 15px 7px;
    border-left: 0.5px solid #8fb0bd;
    vertical-align: middle;
    border-bottom: 0.5px solid #e0e1e1;
    white-space: nowrap;
    &--bold {
      font-weight: 700;
      color: #121f2c;
    }
  }
  &__heading-cell {
    background: #e7eef2;
    &:first-child {
      border-left: 3px solid #708088;
      padding-left: 12px;
    }
  }
  &__body-cell {
    &:first-child {
      border-left: none;
    }
  }
  &__body-circle {
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #0b897e;
    border-radius: 50%;
    margin-right: 16px;
  }
  &__body-button {
    float: right;
    padding: 0 0 2px;
    margin: 4px 0 0 20px;
    background: transparent;
    cursor: pointer;
    border: none;
    &:disabled {
      cursor: not-allowed;
    }
    svg {
      display: block;
      width: 11px;
      fill: #78909c;
      transition: all 0.3s ease;
      &:hover {
        fill: #000;
      }
    }
  }
  &__switch {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__switch-button {
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    color: #6f8189;
    font-size: 10px;
    line-height: 16px;
    transition: all 0.3s ease;
    &:hover,
    &.active {
      color: #2c3341;
      font-weight: 700;
    }
  }
}
.spinner {
  display: block;
  margin-top: 30px;
}
</style>
