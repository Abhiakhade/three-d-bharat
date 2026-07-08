import { deals } from "@/src/data/deals";

import { Deal } from "@/src/types/deal";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const dealService = {
  async getDeals() {
    return Promise.resolve(deals);
    return deals as Deal[];
  },

  async getDealById(id: number): Promise<Deal | undefined> {
    await delay(500);

    return (deals as Deal[]).find((deal) => deal.id === id);
  },
};