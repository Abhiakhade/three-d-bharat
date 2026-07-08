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
    icon: <TrendingUp className="text-green-600" size={20} />,
  },
  {
    id: 2,
    title: "New Startup",
    description: "GreenVolt Energy added to marketplace.",
    time: "18 min ago",
    icon: <Building2 className="text-blue-600" size={20} />,
  },
  {
    id: 3,
    title: "Investor Joined",
    description: "5 new investors joined FinEdge.",
    time: "1 hour ago",
    icon: <Users className="text-purple-600" size={20} />,
  },
  {
    id: 4,
    title: "Funding Goal Achieved",
    description: "MediCare Plus reached 100% funding.",
    time: "Today",
    icon: <BadgeCheck className="text-amber-500" size={20} />,
  },
];

export default function RecentActivity() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-6 flex items-center gap-3">
        <Activity className="text-blue-600" />

        <div>
          <h2 className="text-xl font-bold">Recent Activity</h2>

          <p className="text-sm text-slate-500">
            Latest updates from your investment dashboard.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {activities.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ x: 4 }}
            className="flex items-start gap-4 rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50"
          >
            <div className="rounded-xl bg-slate-100 p-3">{item.icon}</div>

            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>

              <p className="mt-1 text-sm text-slate-500">{item.description}</p>
            </div>

            <span className="text-xs text-slate-400">{item.time}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
