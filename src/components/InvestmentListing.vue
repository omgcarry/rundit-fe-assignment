<template>
  <div class="investment-listing">
    <table
      class="investment-table investment-table--fixed"
      cellpadding="0"
      cellspacing="0"
    >
      <tr class="investment-table__heading-row">
        <th
          class="investment-table__heading-cell investment-table__cell investment-table__cell--bold"
        >
          Company
        </th>
        <th
          class="investment-table__heading-cell investment-table__cell investment-table__cell--bold"
        >
          Date
        </th>
        <th
          class="investment-table__heading-cell investment-table__cell investment-table__cell--bold"
        >
          Amount
        </th>
      </tr>
      <tr
        class="investment-table__body-row"
        v-for="investment in getInvestmentsWithName"
        :key="investment.id"
      >
        <td class="investment-table__body-cell investment-table__cell">
          <span class="investment-table__body-circle" />
          {{ investment.companyName }}
        </td>
        <td class="investment-table__body-cell investment-table__cell">
          {{ investment.date }}
        </td>
        <td
          class="investment-table__body-cell investment-table__cell investment-table__cell--bold"
        >
          {{ investment.amount }}
          <button
            class="investment-table__body-button"
            @click="removeClickHandler(investment.id)"
            :disabled="getLoadingState"
          >
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 28 28"
            >
              <path
                d="M27,4H20V1a1,1,0,0,0-1-1H9A1,1,0,0,0,8,1V4H1A1,1,0,0,0,1,6H3.09L5,27.09A1,1,0,0,0,6,28H22a1,1,0,0,0,1-.91L24.91,6H27a1,1,0,0,0,0-2ZM10,2h8V4H10ZM21.09,26H6.91L5.1,6H22.91Z"
              />
              <path
                d="M14,9a1,1,0,0,0-1,1V22a1,1,0,0,0,2,0V10A1,1,0,0,0,14,9Z"
              />
              <path
                d="M8.92,9A1,1,0,0,0,8,10.08H8l1,12A1,1,0,0,0,10,23h.08A1,1,0,0,0,11,21.92h0l-1-12A1,1,0,0,0,8.93,9Z"
              />
              <path
                d="M18,9.92l-1,12A1,1,0,0,0,17.92,23H18a1,1,0,0,0,1-.92l1-12a1,1,0,1,0-2-.16Z"
              />
            </svg>
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters({
      getInvestmentsWithName: "getInvestmentsWithName",
      getLoadingState: "getLoadingState",
    }),
  },
  methods: {
    ...mapActions({ deleteInvestment: "deleteInvestment" }),
  },
})
export default class InvestmentListing extends Vue {
  getInvestmentsWithName!: () => object[];
  getLoadingState!: () => boolean;
  deleteInvestment!: (id: number) => object;

  async removeClickHandler(id: number) {
    await this.deleteInvestment(id);
  }
}
</script>

<style scoped lang="scss"></style>
