"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  iconColor,
  bgColor,
}: StatCardProps) {
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
        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${bgColor}`}
      >
        <Icon size={28} className={iconColor} />
      </div>

      <p className="mt-5 text-sm text-slate-500">{title}</p>

      <h2 className="mt-2 text-3xl font-bold text-slate-900">{value}</h2>
    </motion.div>
  );
}
