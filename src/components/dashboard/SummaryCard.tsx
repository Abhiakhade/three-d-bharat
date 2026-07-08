"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  ShieldAlert,
  Building2,
  IndianRupee,
  type LucideIcon,
} from "lucide-react";
import StatCard from "@/src/components/common/StatCard";

interface SummaryCardsProps {
  loading: boolean;
  totalInvestment: number;
  averageROI: string;
  activeDeals: number;
  highRiskDeals: number;
}

type Tone = "green" | "blue" | "purple" | "amber";

const toneStyles: Record<Tone, { bg: string; icon: string }> = {
  green: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
  },
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
  },
  purple: {
    bg: "bg-purple-50",
    icon: "text-purple-600",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "text-amber-600",
  },
};

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

interface CardProps {
  icon: LucideIcon;
  tone: Tone;
  title: string;
  value: string | number;
}

function Card({ icon: Icon, tone, title, value }: CardProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{ duration: 0.25 }}
      className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:shadow-lg"
    >
      <div
        className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${toneStyles[tone].bg}`}
      >
        <Icon size={24} className={toneStyles[tone].icon} />
      </div>

      <p className="mt-5 text-sm text-slate-500">{title}</p>

      <h2 className="mt-2 text-3xl font-bold text-slate-900">{value}</h2>
    </motion.div>
  );
}

export default function SummaryCards({
  loading,
  totalInvestment,
  averageROI,
  activeDeals,
  highRiskDeals,
}: SummaryCardsProps) {
  return (
    <div className="mb-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Investment"
        value={loading ? "..." : currency.format(totalInvestment)}
        icon={IndianRupee}
        bgColor="bg-green-100"
        iconColor="text-green-600"
      />

      <StatCard
        title="Average ROI"
        value={loading ? "..." : `${averageROI}%`}
        icon={TrendingUp}
        bgColor="bg-blue-100"
        iconColor="text-blue-600"
      />

      <StatCard
        title="Active Deals"
        value={loading ? "..." : activeDeals}
        icon={Building2}
        bgColor="bg-purple-100"
        iconColor="text-purple-600"
      />

      <StatCard
        title="High Risk"
        value={loading ? "..." : highRiskDeals}
        icon={ShieldAlert}
        bgColor="bg-red-100"
        iconColor="text-red-600"
      />
    </div>
  );
}
