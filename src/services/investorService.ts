import investors from "@/src/data/investors.json";
import { Investor } from "@/src/types/investor";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const investorService = {
  async getInvestors(): Promise<Investor[]> {
    await delay(500);

    return investors as Investor[];
  },
};
