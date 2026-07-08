"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Building2,
  Heart,
  Settings,
  X,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

// Routes match the app/ tree: dashboard lives at "/", the rest are siblings.
const menus: NavItem[] = [
  { title: "Dashboard", href: "/", icon: LayoutDashboard },
  { title: "Deals", href: "/deals", icon: BriefcaseBusiness },
  { title: "Investments", href: "/investments", icon: Heart },
  { title: "Corporate", href: "/corporate", icon: Building2 },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

function NavLinks({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="space-y-1">
      {menus.map(({ title, href, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={title}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1220] ${
              active
                ? "bg-white/10 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {active && (
              <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-[#F5A623]" />
            )}
            <Icon size={20} strokeWidth={active ? 2.25 : 1.75} />
            <span>{title}</span>
          </Link>
        );
      })}

      <button
        type="button"
        disabled
        title="Coming soon"
        className="flex w-full cursor-not-allowed items-center gap-3 rounded-xl px-4 py-2 text-sm font-medium text-slate-600"
      >
        <Settings size={20} strokeWidth={1.75} />
        <span>Settings</span>
      </button>
    </nav>
  );
}

function Brand() {
  return (
    <div className="mb-10 flex items-center gap-2.5">
      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#F5A623]" />
      <div>
        <h1 className="text-2xl font-bold leading-none text-white">
          3D Bharat
        </h1>
        <p className="mt-1.5 text-xs font-medium uppercase tracking-wider text-slate-500">
          Investor Platform
        </p>
      </div>
    </div>
  );
}

export default function Sidebar({ open = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop: permanent rail */}
      <aside className="sticky top-0 hidden h-screen w-50 shrink-0 flex-col bg-[#0B1220] p-6 lg:flex">
        <Brand />
        <NavLinks pathname={pathname} />
      </aside>

      {/* Mobile: off-canvas drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              aria-hidden="true"
            />
            <motion.aside
              key="sidebar-drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 34 }}
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#0B1220] p-6 lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
            >
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]"
              >
                <X size={20} />
              </button>
              <Brand />
              <NavLinks pathname={pathname} onNavigate={onClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
