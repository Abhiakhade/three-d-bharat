"use client";

export default function LoadingSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 animate-pulse">
      {/* Header */}
      <div className="bg-slate-200 p-6">
        <div className="h-7 w-44 rounded bg-slate-300" />

        <div className="mt-4 flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-slate-300" />
          <div className="h-4 w-24 rounded bg-slate-300" />
        </div>
      </div>

      {/* Body */}
      <div className="space-y-5 p-6">
        {/* Investment */}
        <div className="flex items-center justify-between">
          <div className="h-4 w-28 rounded bg-slate-200" />
          <div className="h-5 w-24 rounded bg-slate-300" />
        </div>

        {/* Funding */}
        <div className="flex items-center justify-between">
          <div className="h-4 w-28 rounded bg-slate-200" />
          <div className="h-5 w-24 rounded bg-slate-300" />
        </div>

        {/* Investors */}
        <div className="flex items-center justify-between">
          <div className="h-4 w-28 rounded bg-slate-200" />
          <div className="h-5 w-16 rounded bg-slate-300" />
        </div>

        {/* ROI */}
        <div className="flex items-center justify-between">
          <div className="h-4 w-20 rounded bg-slate-200" />
          <div className="h-5 w-16 rounded bg-slate-300" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-slate-200" />
          <div className="h-3 w-11/12 rounded bg-slate-200" />
          <div className="h-3 w-8/12 rounded bg-slate-200" />
        </div>

        {/* Button */}
        <div className="mt-4 h-12 w-full rounded-2xl bg-slate-300" />
      </div>
    </div>
  );
}
