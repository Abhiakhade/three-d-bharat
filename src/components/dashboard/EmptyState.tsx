"use client";

import { motion } from "framer-motion";
import { SearchX, RotateCcw } from "lucide-react";

interface EmptyStateProps {
  onReset?: () => void;
}

export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center justify-center rounded-3xl bg-white px-8 py-20 text-center shadow-sm ring-1 ring-slate-200"
    >
      {/* Icon */}

      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">
        <SearchX size={48} className="text-blue-600" />
      </div>

      {/* Heading */}

      <h2 className="text-3xl font-bold text-slate-900">No Deals Found</h2>

      {/* Description */}

      <p className="mt-4 max-w-md text-slate-500 leading-7">
        We couldn't find any investment opportunities matching your current
        search or filters. Try adjusting your filters or resetting them to view
        all available deals.
      </p>

      {/* Button */}

      {onReset && (
        <button
          onClick={onReset}
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#1E2A5E] px-6 py-3 font-semibold text-white transition hover:bg-[#111827]"
        >
          <RotateCcw size={18} />
          Reset Filters
        </button>
      )}
    </motion.div>
  );
}
