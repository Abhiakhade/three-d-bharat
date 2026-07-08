"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";

interface DealExplorerProps {
  search: string;
  setSearch: (value: string) => void;

  industry: string;
  setIndustry: (value: string) => void;

  risk: string;
  setRisk: (value: string) => void;

  sortBy: string;
  setSortBy: (value: string) => void;

  totalDeals: number;
  filteredDeals: number;
}

export default function DealExplorer({
  search,
  setSearch,
  industry,
  setIndustry,
  risk,
  setRisk,
  sortBy,
  setSortBy,
  totalDeals,
  filteredDeals,
}: DealExplorerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
    >
      {/* Header */}

      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-blue-100 p-3">
          <SlidersHorizontal className="text-blue-600" size={20} />
        </div>

        <div>
          <h2 className="text-xl font-bold">Deal Explorer</h2>

          <p className="text-sm text-slate-500">
            Search, filter and sort investment opportunities.
          </p>
        </div>
      </div>

      {/* Controls */}

      <div className="grid gap-4 lg:grid-cols-4">
        {/* Search */}

        <div className="relative lg:col-span-2">
          <Search
            className="absolute left-4 top-3.5 text-slate-400"
            size={18}
          />

          <input
            type="text"
            value={search}
            placeholder="Search company..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600"
          />
        </div>

        {/* Industry */}

        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
        >
          <option value="All">All Industries</option>

          <option value="AI">AI</option>

          <option value="Healthcare">Healthcare</option>

          <option value="FinTech">FinTech</option>

          <option value="Energy">Energy</option>
        </select>

        {/* Risk */}

        <select
          value={risk}
          onChange={(e) => setRisk(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
        >
          <option value="All">All Risk Levels</option>

          <option value="Low">Low</option>

          <option value="Medium">Medium</option>

          <option value="High">High</option>
        </select>
      </div>

      {/* Bottom */}

      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-900">{filteredDeals}</span>{" "}
          of <span className="font-semibold text-slate-900">{totalDeals}</span>{" "}
          deals
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
        >
          <option value="None">Sort By</option>

          <option value="ROI">Highest ROI</option>

          <option value="Investment">Highest Investment</option>
        </select>
      </div>
    </motion.div>
  );
}
