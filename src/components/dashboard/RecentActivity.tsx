"use client";

import { motion } from "framer-motion";
import {
  Activity,
  TrendingUp,
  Building2,
  Users,
  BadgeCheck,
} from "lucide-react";

interface ActivityItem {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
}

const activities: ActivityItem[] = [
  {
    id: 1,
    title: "New Investment",
    description: "TechNova AI received ₹12,00,000 funding.",
    time: "2 min ago",
    icon: <TrendingUp className="text-emerald-600" size={16} />,
  },
  {
    id: 2,
    title: "New Startup",
    description: "GreenVolt Energy added to marketplace.",
    time: "18 min ago",
    icon: <Building2 className="text-blue-600" size={16} />,
  },
  {
    id: 3,
    title: "Investor Joined",
    description: "5 new investors joined FinEdge.",
    time: "1 hour ago",
    icon: <Users className="text-purple-600" size={16} />,
  },
  {
    id: 4,
    title: "Funding Goal Achieved",
    description: "MediCare Plus reached 100% funding.",
    time: "Today",
    icon: <BadgeCheck className="text-amber-500" size={16} />,
  },
];

export default function RecentActivity() {
  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-center gap-2.5">
        <Activity className="text-blue-600" size={18} />

        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Recent Activity
          </h2>

          <p className="text-xs text-slate-500">
            Latest updates from your investment dashboard.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {activities.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:bg-slate-50"
          >
            <div className="shrink-0 rounded-lg bg-slate-100 p-2">
              {item.icon}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-slate-900">
                {item.title}
              </h3>

              <p className="truncate text-xs text-slate-500">
                {item.description}
              </p>
            </div>

            <span className="shrink-0 text-[11px] text-slate-400">
              {item.time}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
