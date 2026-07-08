export type RiskLevel = "Low" | "Medium" | "High";

export interface Deal {
  id: number;

  // Company
  companyName: string;
  logo: string;
  industry: string;
  description: string;

  // Investment
  investmentRequired: number;
  fundingRaised: number;
  investors: number;
  roi: number;
  risk: RiskLevel;

  // Optional Business Details
  valuation?: number;
  equityOffered?: number;
  foundedYear?: number;
  location?: string;
  founder?: string;
  website?: string;

  // Dashboard
  status?: "Open" | "Funded" | "Closed";
  featured?: boolean;
}
