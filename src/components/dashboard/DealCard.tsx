"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  IndianRupee,
  TrendingUp,
  ShieldAlert,
  Users,
} from "lucide-react";

export interface Deal {
  id: number | string;
  companyName: string;
  industry: string;
  investmentRequired: number;
  fundingRaised?: number;
  investors?: number;
  roi: number;
  risk: "Low" | "Medium" | "High";
  description?: string;
}

interface DealCardProps {
  deal: Deal;
}

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
  notation: "compact",
});

const riskColors = {
  Low: "bg-green-50 text-green-700 ring-1 ring-green-200",
  Medium: "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200",
  High: "bg-red-50 text-red-700 ring-1 ring-red-200",
};

export default function DealCard({ deal }: DealCardProps) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 16,
        },

        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      transition={{
        duration: 0.2,
      }}
      className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-lg"
    >
      {/* Header */}

      <div className="bg-gradient-to-r from-[#1E2A5E] via-[#273C75] to-[#0B1220] p-4 text-white">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold">
              {deal.companyName}
            </h2>

            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-blue-100">
              <Building2 size={13} />
              <span className="truncate">{deal.industry}</span>
            </div>
          </div>

          <span
            className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${riskColors[deal.risk]}`}
          >
            {deal.risk}
          </span>
        </div>
      </div>

      {/* Body */}

      <div className="flex flex-1 flex-col justify-between gap-3 p-4">
        <div className="space-y-2.5">
          {/* Investment */}

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5 text-slate-500">
              <IndianRupee size={14} />
              Investment
            </div>

            <span className="font-semibold text-slate-800">
              {currency.format(deal.investmentRequired)}
            </span>
          </div>

          {/* Funding */}

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5 text-slate-500">
              <TrendingUp size={14} />
              Raised
            </div>

            <span className="font-semibold text-green-600">
              {deal.fundingRaised ? currency.format(deal.fundingRaised) : "N/A"}
            </span>
          </div>

          {/* Investors */}

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5 text-slate-500">
              <Users size={14} />
              Investors
            </div>

            <span className="font-semibold text-slate-800">
              {deal.investors ?? "—"}
            </span>
          </div>

          {/* ROI */}

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5 text-slate-500">
              <ShieldAlert size={14} />
              ROI
            </div>

            <span className="font-semibold text-emerald-600">{deal.roi}%</span>
          </div>

          {/* Description */}

          {deal.description && (
            <p className="line-clamp-2 pt-1 text-xs leading-5 text-slate-500">
              {deal.description}
            </p>
          )}
        </div>

        {/* Button */}

        <Link href={`/deals/${deal.id}`}>
          <motion.button
            whileTap={{
              scale: 0.97,
            }}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#1E2A5E] py-2.5 text-sm font-semibold text-white transition hover:bg-[#111827]"
          >
            View Details
            <ArrowRight size={15} />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
