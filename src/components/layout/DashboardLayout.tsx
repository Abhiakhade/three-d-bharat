"use client";

import { useState } from "react";
import { MotionConfig } from "framer-motion";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar onMenuClick={() => setMobileNavOpen(true)} />
          <main className="flex-1 p-6 sm:p-8">{children}</main>
        </div>
      </div>
    </MotionConfig>
  );
}
