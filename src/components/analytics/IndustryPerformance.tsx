"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface IndustryPerformanceProps {
  data?: {
    industry: string;
    value: number;
  }[];
}

const COLORS = [
  "#2563EB",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
  "#F97316",
  "#84CC16",
];

const defaultData = [
  { industry: "AI", value: 12 },
  { industry: "FinTech", value: 8 },
  { industry: "Healthcare", value: 6 },
  { industry: "Energy", value: 5 },
  { industry: "EdTech", value: 4 },
  { industry: "SaaS", value: 7 },
];

export default function IndustryPerformance({
  data = defaultData,
}: IndustryPerformanceProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Industry Performance</h2>

        <p className="text-sm text-slate-500">
          Investment distribution across industries
        </p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="industry"
            innerRadius={70}
            outerRadius={120}
            paddingAngle={4}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />

          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
