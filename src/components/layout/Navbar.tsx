"use client";

import { Bell, Menu, Search } from "lucide-react";

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 border-b border-slate-200 bg-white/80 px-4 backdrop-blur sm:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="shrink-0 rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div className="hidden items-center gap-3 rounded-xl bg-slate-100 px-4 py-2.5 transition-colors focus-within:bg-slate-100 focus-within:ring-2 focus-within:ring-[#F5A623]/60 sm:flex sm:w-72 lg:w-96">
          <Search size={18} className="shrink-0 text-slate-400" />
          <label htmlFor="deal-search" className="sr-only">
            Search deals, companies, or sectors
          </label>
          <input
            id="deal-search"
            type="search"
            autoComplete="off"
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            placeholder="Search deals, companies, sectors..."
          />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 sm:gap-5">
        <button
          type="button"
          aria-label="View notifications"
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
        >
          <Bell size={20} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#F5A623]" />
        </button>

        <div className="flex items-center gap-3">
          {/* Placeholder initials — swap for the signed-in user's avatar/name */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1E2A5E] text-sm font-semibold text-white">
            AV
          </div>
          <span className="hidden text-sm font-medium text-slate-700 md:inline">
            Aarav Verma
          </span>
        </div>
      </div>
    </header>
  );
}
  