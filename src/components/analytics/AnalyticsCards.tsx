"use client";

import { motion } from "framer-motion";
import { IndianRupee, TrendingUp, Building2, Users } from "lucide-react";

interface AnalyticsCardsProps {
  totalInvestment: number;
  averageROI: number;
  totalDeals: number;
  totalInvestors: number;
}

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

interface CardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

function Card({ title, value, icon, color }: CardProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{ duration: 0.25 }}
      className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:shadow-xl"
    >
      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}
      >
        {icon}
      </div>

      <p className="text-sm text-slate-500">{title}</p>

      <h2 className="mt-2 text-3xl font-bold text-slate-900">{value}</h2>
    </motion.div>
  );
}

export default function AnalyticsCards({
  totalInvestment,
  averageROI,
  totalDeals,
  totalInvestors,
}: AnalyticsCardsProps) {
  return (
    <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <Card
        title="Total Investment"
        value={currency.format(totalInvestment)}
        icon={<IndianRupee className="text-green-600" size={28} />}
        color="bg-green-100"
      />

      <Card
        title="Average ROI"
        value={`${averageROI.toFixed(1)}%`}
        icon={<TrendingUp className="text-blue-600" size={28} />}
        color="bg-blue-100"
      />

      <Card
        title="Active Deals"
        value={totalDeals}
        icon={<Building2 className="text-purple-600" size={28} />}
        color="bg-purple-100"
      />

      <Card
        title="Total Investors"
        value={totalInvestors}
        icon={<Users className="text-orange-600" size={28} />}
        color="bg-orange-100"
      />
    </div>
  );
}
