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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
    >
      {/* Header */}

      <div className="mb-5 flex items-center gap-2.5">
        <div className="rounded-lg bg-blue-50 p-2.5">
          <SlidersHorizontal className="text-blue-600" size={17} />
        </div>

        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Deal Explorer
          </h2>

          <p className="text-xs text-slate-500">
            Search, filter and sort investment opportunities.
          </p>
        </div>
      </div>

      {/* Controls */}

      <div className="grid gap-3 lg:grid-cols-4">
        {/* Search */}

        <div className="relative lg:col-span-2">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />

          <input
            type="text"
            value={search}
            placeholder="Search company..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          />
        </div>

        {/* Industry */}

        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
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
          className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
        >
          <option value="All">All Risk Levels</option>

          <option value="Low">Low</option>

          <option value="Medium">Medium</option>

          <option value="High">High</option>
        </select>
      </div>

      {/* Bottom */}

      <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="text-xs text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-900">{filteredDeals}</span>{" "}
          of <span className="font-semibold text-slate-900">{totalDeals}</span>{" "}
          deals
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
        >
          <option value="None">Sort By</option>

          <option value="ROI">Highest ROI</option>

          <option value="Investment">Highest Investment</option>
        </select>
      </div>
    </motion.div>
  );
}
