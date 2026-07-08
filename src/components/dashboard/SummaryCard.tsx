"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  ShieldAlert,
  Building2,
  IndianRupee,
  type LucideIcon,
} from "lucide-react";

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
  notation: "compact",
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
        y: -3,
        scale: 1.01,
      }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-md"
    >
      <div
        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${toneStyles[tone].bg}`}
      >
        <Icon size={19} className={toneStyles[tone].icon} />
      </div>

      <p className="mt-4 text-xs font-medium text-slate-500">{title}</p>

      <h2 className="mt-1 text-xl font-bold text-slate-900">{value}</h2>
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
    <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Card
        title="Total Investment"
        value={loading ? "…" : currency.format(totalInvestment)}
        icon={IndianRupee}
        tone="green"
      />

      <Card
        title="Average ROI"
        value={loading ? "…" : `${averageROI}%`}
        icon={TrendingUp}
        tone="blue"
      />

      <Card
        title="Active Deals"
        value={loading ? "…" : activeDeals}
        icon={Building2}
        tone="purple"
      />

      <Card
        title="High Risk"
        value={loading ? "…" : highRiskDeals}
        icon={ShieldAlert}
        tone="amber"
      />
    </div>
  );
}
