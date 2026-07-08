export interface Investor {
  id: number;
  name: string;
  budget: number;
  preferredIndustry: string;
  riskPreference: "Low" | "Medium" | "High";
}
