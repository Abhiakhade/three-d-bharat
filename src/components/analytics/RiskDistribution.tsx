"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

interface RiskDistributionProps {
  data?: {
    risk: string;
    deals: number;
  }[];
}

const defaultData = [
  {
    risk: "Low",
    deals: 18,
  },
  {
    risk: "Medium",
    deals: 22,
  },
  {
    risk: "High",
    deals: 10,
  },
];

const COLORS = ["#22C55E", "#F59E0B", "#EF4444"];

export default function RiskDistribution({
  data = defaultData,
}: RiskDistributionProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Risk Distribution</h2>

        <p className="text-sm text-slate-500">
          Number of deals by risk category
        </p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis dataKey="risk" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Bar dataKey="deals" radius={[8, 8, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
