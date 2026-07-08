"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight, TrendingUp } from "lucide-react";
import type { Deal } from "@/src/types/deal";

interface RecommendationSectionProps {
  deals: Deal[];
}

export default function RecommendationSection({
  deals,
}: RecommendationSectionProps) {
  const recommended = [...deals]
    .sort((a, b) => {
      const scoreA =
        a.roi * 2 + (a.risk === "Low" ? 15 : a.risk === "Medium" ? 8 : 0);

      const scoreB =
        b.roi * 2 + (b.risk === "Low" ? 15 : b.risk === "Medium" ? 8 : 0);

      return scoreB - scoreA;
    })
    .slice(0, 3);

  return (
    <section className="mb-10">
      <div className="mb-6 flex items-center gap-3">
        <Sparkles className="text-amber-500" />

        <div>
          <h2 className="text-2xl font-bold">Recommended Investments</h2>

          <p className="text-slate-500">
            Best investment opportunities based on ROI and risk.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {recommended.map((deal) => (
          <motion.div
            key={deal.id}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            className="rounded-3xl bg-gradient-to-br from-[#1E2A5E] to-[#0B1220] p-6 text-white shadow-lg"
          >
            <h3 className="text-2xl font-bold">{deal.companyName}</h3>

            <p className="mt-2 text-slate-300">{deal.industry}</p>

            <div className="mt-6 flex justify-between">
              <div>
                <p className="text-xs text-slate-400">ROI</p>

                <div className="mt-1 flex items-center gap-1 text-green-400">
                  <TrendingUp size={18} />
                  {deal.roi}%
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400">Risk</p>

                <p className="mt-1 font-semibold">{deal.risk}</p>
              </div>
            </div>

            <Link href={`/deals/${deal.id}`}>
              <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 font-semibold text-[#1E2A5E] transition hover:bg-slate-100">
                View Deal
                <ArrowRight size={18} />
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
