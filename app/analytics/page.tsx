"use client";

import DashboardLayout from "@/src/components/layout/DashboardLayout";

import AnalyticsHeader from "@/src/components/analytics/AnalyticsHeader";
import AnalyticsCards from "@/src/components/analytics/AnalyticsCards";
import InvestmentTrend from "@/src/components/analytics/InvestmentTrend";
import IndustryPerformance from "@/src/components/analytics/IndustryPerformance";
import RiskDistribution from "@/src/components/analytics/RiskDistribution";
import ROILeaderboard from "@/src/components/analytics/ROILeaderboard";

import { deals } from "@/src/data/deals";

export default function AnalyticsPage() {
  const totalInvestment = deals.reduce(
    (sum, deal) => sum + deal.investmentRequired,
    0,
  );

  const averageROI =
    deals.reduce((sum, deal) => sum + deal.roi, 0) / deals.length;

  const totalInvestors = deals.reduce((sum, deal) => sum + deal.investors, 0);

  const industryData = Object.entries(
    deals.reduce<Record<string, number>>((acc, deal) => {
      acc[deal.industry] = (acc[deal.industry] || 0) + 1;
      return acc;
    }, {}),
  ).map(([industry, value]) => ({
    industry,
    value,
  }));

  const riskData = [
    {
      risk: "Low",
      deals: deals.filter((d) => d.risk === "Low").length,
    },
    {
      risk: "Medium",
      deals: deals.filter((d) => d.risk === "Medium").length,
    },
    {
      risk: "High",
      deals: deals.filter((d) => d.risk === "High").length,
    },
  ];

  return (
    <DashboardLayout>
      <AnalyticsHeader />

      <AnalyticsCards
        totalInvestment={totalInvestment}
        averageROI={averageROI}
        totalDeals={deals.length}
        totalInvestors={totalInvestors}
      />

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <InvestmentTrend />
        <IndustryPerformance data={industryData} />
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <RiskDistribution data={riskData} />

        <ROILeaderboard deals={deals} />
      </div>
    </DashboardLayout>
  );
}
