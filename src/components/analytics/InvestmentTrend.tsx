"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", investment: 1200000 },
  { month: "Feb", investment: 1800000 },
  { month: "Mar", investment: 2400000 },
  { month: "Apr", investment: 2100000 },
  { month: "May", investment: 3000000 },
  { month: "Jun", investment: 4200000 },
  { month: "Jul", investment: 5200000 },
  { month: "Aug", investment: 4800000 },
  { month: "Sep", investment: 6100000 },
  { month: "Oct", investment: 6900000 },
  { month: "Nov", investment: 7600000 },
  { month: "Dec", investment: 8500000 },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

export default function InvestmentTrend() {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Investment Trend</h2>

        <p className="text-sm text-slate-500">Monthly investment growth</p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="investmentGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis dataKey="month" />

          <YAxis tickFormatter={formatCurrency} />

          <Tooltip
            formatter={(value) => [
              new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(Number(value)),
              "Investment",
            ]}
          />

          <Area
            type="monotone"
            dataKey="investment"
            stroke="#2563eb"
            strokeWidth={3}
            fill="url(#investmentGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
