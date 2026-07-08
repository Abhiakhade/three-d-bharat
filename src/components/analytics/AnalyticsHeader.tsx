"use client";

import { CalendarDays, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function AnalyticsHeader() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-8 text-white shadow-xl md:flex-row md:items-center md:justify-between"
    >
      <div>
        <h1 className="text-4xl font-bold">Analytics Dashboard</h1>

        <div className="mt-3 flex items-center gap-2 text-blue-100">
          <CalendarDays size={18} />
          <span>{today}</span>
        </div>
      </div>

      <button className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-slate-100">
        <Download size={18} />
        Export Report
      </button>
    </motion.div>
  );
}
