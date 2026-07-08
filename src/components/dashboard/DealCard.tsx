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
});

const riskColors = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-700",
};

export default function DealCard({ deal }: DealCardProps) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 20,
        },

        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 hover:shadow-xl"
    >
      {/* Header */}

      <div className="bg-gradient-to-r from-[#1E2A5E] via-[#273C75] to-[#0B1220] p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">{deal.companyName}</h2>

            <div className="mt-2 flex items-center gap-2 text-blue-100">
              <Building2 size={16} />
              {deal.industry}
            </div>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${riskColors[deal.risk]}`}
          >
            {deal.risk}
          </span>
        </div>
      </div>

      {/* Body */}

      <div className="space-y-5 p-6">
        {/* Investment */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <IndianRupee size={18} />
            Investment
          </div>

          <span className="font-bold">
            {currency.format(deal.investmentRequired)}
          </span>
        </div>

        {/* Funding */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <TrendingUp size={18} />
            Raised
          </div>

          <span className="font-bold text-green-600">
            {deal.fundingRaised ? currency.format(deal.fundingRaised) : "N/A"}
          </span>
        </div>

        {/* Investors */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <Users size={18} />
            Investors
          </div>

          <span className="font-bold">{deal.investors}</span>
        </div>

        {/* ROI */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <ShieldAlert size={18} />
            ROI
          </div>

          <span className="font-bold text-emerald-600">{deal.roi}%</span>
        </div>

        {/* Description */}

        {deal.description && (
          <p className="line-clamp-2 text-sm leading-6 text-slate-500">
            {deal.description}
          </p>
        )}

        {/* Button */}

        <Link href={`/deals/${deal.id}`}>
          <motion.button
            whileTap={{
              scale: 0.97,
            }}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#1E2A5E] py-3 font-semibold text-white transition hover:bg-[#111827]"
          >
            View Details
            <ArrowRight size={18} />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
