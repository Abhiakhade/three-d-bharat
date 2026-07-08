"use client";

import { motion } from "framer-motion";
import { CalendarDays, TrendingUp } from "lucide-react";

interface DashboardHeaderProps {
  lastUpdated: string | null;
}

export default function DashboardHeader({ lastUpdated }: DashboardHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-6"
    >
      {/* Hero Card */}
      <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-[#1E2A5E] via-[#273C75] to-[#0B1220] p-6 text-white shadow-lg">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur">
              <TrendingUp size={14} />
              Investor Dashboard
            </span>

            <h1 className="mt-3.5 text-2xl font-bold lg:text-3xl">
              Welcome Back
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-slate-300 leading-6">
              Monitor your investment portfolio, explore startup deals, compare
              ROI, analyze risks, and discover the best investment
              opportunities—all in one place.
            </p>
          </div>

          {/* Right */}
          <div className="rounded-xl bg-white/10 p-4 backdrop-blur-md">
            <p className="text-xs text-slate-300">Dashboard Status</p>

            <h2 className="mt-1.5 text-xl font-bold text-green-400">Live</h2>

            <div className="mt-3.5 flex items-center gap-1.5 text-xs text-slate-300">
              <CalendarDays size={14} />

              <span>Last Updated</span>
            </div>

            <p className="mt-1 text-xs font-semibold">
              {lastUpdated ?? "Loading..."}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
