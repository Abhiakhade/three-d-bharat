"use client";

import { motion } from "framer-motion";

import DealCard from "./DealCard";
import LoadingSkeleton from "./LoadingSkeleton";
import EmptyState from "./EmptyState";
import type { Deal } from "@/src/types/deal";

interface DealGridProps {
  deals?: Deal[];
  loading: boolean;
}

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function DealGrid({ deals = [], loading }: DealGridProps) {
  if (loading) {
    return (
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (deals.length === 0) {
    return <EmptyState onReset={() => {}} />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
    >
      {deals.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </motion.div>
  );
}
