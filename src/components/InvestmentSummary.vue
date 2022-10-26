<template>
  <div class="investment=summary">
    <table class="investment-table" cellpadding="0" cellspacing="0">
      <tr class="investment-table__heading-row">
        <th
          class="investment-table__heading-cell investment-table__cell investment-table__cell--bold"
        >
          Total Invested Amount
        </th>
        <th
          class="investment-table__heading-cell investment-table__cell investment-table__cell--bold"
        >
          <p class="investment-table__switch">
            <button
              class="investment-table__switch-button"
              :class="{ active: selectedPeriod === 5 }"
              @click="switchClickHandler(5)"
            >
              5Y
            </button>
            <button
              class="investment-table__switch-button"
              :class="{ active: selectedPeriod === 3 }"
              @click="switchClickHandler(3)"
            >
              3Y
            </button>
            <button
              class="investment-table__switch-button"
              :class="{ active: selectedPeriod === 1 }"
              @click="switchClickHandler(1)"
            >
              1Y
            </button>
          </p>
        </th>
      </tr>
      <tr v-if="!companiesData.length">
        <td
          colspan="2"
          class="investment-table__body-cell investment-table__cell"
        >
          {{
            selectedPeriod
              ? "No data for selected period"
              : "Please, select period"
          }}
        </td>
      </tr>
      <tr
        class="investment-table__body-row"
        v-for="company in companiesData"
        :key="company.id"
        v-else
      >
        <td class="investment-table__body-cell investment-table__cell">
          <span class="investment-table__body-circle" />
          {{ company.name }}
        </td>
        <td
          class="investment-table__body-cell investment-table__cell investment-table__cell--bold"
        >
          {{ company.investmentAmount }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters({ getCompaniesWithAmount: "getCompaniesWithAmount" }),
  },
})
export default class InvestmentSummary extends Vue {
  selectedPeriod = 0;

  getCompaniesWithAmount!: (period: number) => object[];

  mounted() {
    this.switchClickHandler(0);
  }

  get companiesData() {
    return this.getCompaniesWithAmount(this.selectedPeriod);
  }

  switchClickHandler(period: number) {
    this.selectedPeriod = this.selectedPeriod === period ? 0 : period;
  }
}
</script>

<style scoped lang="scss"></style>
