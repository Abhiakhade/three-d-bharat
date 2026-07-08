"use client";

import { motion } from "framer-motion";
import { CalendarDays, TrendingUp } from "lucide-react";

interface DashboardHeaderProps {
  lastUpdated: string | null;
}

export default function DashboardHeader({ lastUpdated }: DashboardHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8"
    >
      {/* Hero Card */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#1E2A5E] via-[#273C75] to-[#0B1220] p-8 text-white shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
              <TrendingUp size={16} />
              Investor Dashboard
            </span>

            <h1 className="mt-5 text-4xl font-bold lg:text-5xl">
              Welcome Back 👋
            </h1>

            <p className="mt-3 max-w-2xl text-slate-200 leading-7">
              Monitor your investment portfolio, explore startup deals, compare
              ROI, analyze risks, and discover the best investment
              opportunities—all in one place.
            </p>
          </div>

          {/* Right */}
          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md">
            <p className="text-sm text-slate-200">Dashboard Status</p>

            <h2 className="mt-2 text-3xl font-bold text-green-400">Live</h2>

            <div className="mt-5 flex items-center gap-2 text-sm text-slate-200">
              <CalendarDays size={16} />

              <span>Last Updated</span>
            </div>

            <p className="mt-1 text-sm font-semibold">
              {lastUpdated ?? "Loading..."}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
