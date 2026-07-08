"use client";

import { motion } from "framer-motion";
import { Trophy, TrendingUp, ShieldAlert, IndianRupee } from "lucide-react";

import type { Deal } from "@/src/types/deal";

interface ROILeaderboardProps {
  deals: Deal[];
}

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const riskColors = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-700",
};

export default function ROILeaderboard({ deals }: ROILeaderboardProps) {
  const topDeals = [...deals].sort((a, b) => b.roi - a.roi).slice(0, 10);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-6 flex items-center gap-3">
        <Trophy className="text-yellow-500" size={28} />

        <div>
          <h2 className="text-2xl font-bold">ROI Leaderboard</h2>

          <p className="text-sm text-slate-500">
            Top performing investment opportunities
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {topDeals.map((deal, index) => (
          <motion.div
            key={deal.id}
            whileHover={{
              x: 4,
              scale: 1.01,
            }}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50 md:flex-row md:items-center md:justify-between"
          >
            {/* Left */}

            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full font-bold text-white
                ${
                  index === 0
                    ? "bg-yellow-500"
                    : index === 1
                      ? "bg-slate-400"
                      : index === 2
                        ? "bg-orange-500"
                        : "bg-blue-600"
                }`}
              >
                #{index + 1}
              </div>

              <div>
                <h3 className="text-lg font-bold">{deal.companyName}</h3>

                <p className="text-sm text-slate-500">{deal.industry}</p>
              </div>
            </div>

            {/* Right */}

            <div className="flex flex-wrap items-center gap-6">
              <div className="text-center">
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp size={18} />

                  <span className="font-bold">{deal.roi}%</span>
                </div>

                <p className="text-xs text-slate-500">ROI</p>
              </div>

              <div className="text-center">
                <div className="flex items-center gap-1">
                  <IndianRupee size={18} />

                  <span className="font-semibold">
                    {currency.format(deal.investmentRequired)}
                  </span>
                </div>

                <p className="text-xs text-slate-500">Investment</p>
              </div>

              <div className="text-center">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${riskColors[deal.risk]}`}
                >
                  <ShieldAlert size={14} className="mr-1 inline" />
                  {deal.risk}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
