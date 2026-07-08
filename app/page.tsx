// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { motion, AnimatePresence, type Variants } from "framer-motion";
// import {
//   TrendingUp,
//   ShieldAlert,
//   Building2,
//   IndianRupee,
//   ArrowRight,
//   ChevronLeft,
//   ChevronRight,
//   type LucideIcon,
// } from "lucide-react";

// import { dealService } from "@/src/services/dealService";
// import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
// import { setDeals, setLoading, setError } from "@/src/store/slices/dealSlice";
// import DashboardLayout from "@/src/components/layout/DashboardLayout";
// import InvestmentChart from "@/src/components/charts/InvestmentChart";
// import IndustryChart from "@/src/components/charts/IndustryChart";
// import RiskChart from "@/src/components/charts/RiskChart";

// type RiskLevel = "Low" | "Medium" | "High";

// interface Deal {
//   id: string | number;
//   companyName: string;
//   industry: string;
//   roi: number;
//   investmentRequired: number;
//   risk: RiskLevel;
// }

// const containerVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.08, delayChildren: 0.1 },
//   },
// };

// const itemVariants: Variants = {
//   hidden: { opacity: 0, y: 16 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// const headerVariants: Variants = {
//   hidden: { opacity: 0, y: -8 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
// };

// // ---------------------------------------------------------------------------
// // Presentation tokens
// // ---------------------------------------------------------------------------
// const riskStyles: Record<RiskLevel, string> = {
//   High: "bg-red-50 text-red-600",
//   Medium: "bg-amber-50 text-amber-700",
//   Low: "bg-emerald-50 text-emerald-700",
// };

// const currency = new Intl.NumberFormat("en-IN", {
//   style: "currency",
//   currency: "INR",
//   maximumFractionDigits: 0,
// });

// type Tone = "green" | "blue" | "purple" | "amber";

// const toneStyles: Record<Tone, { chip: string; icon: string }> = {
//   green: { chip: "bg-emerald-50", icon: "text-emerald-600" },
//   blue: { chip: "bg-blue-50", icon: "text-blue-600" },
//   purple: { chip: "bg-[#1E2A5E]/10", icon: "text-[#1E2A5E]" },
//   amber: { chip: "bg-amber-50", icon: "text-amber-600" },
// };

// function SummaryCard({
//   icon: Icon,
//   tone,
//   label,
//   value,
// }: {
//   icon: LucideIcon;
//   tone: Tone;
//   label: string;
//   value: React.ReactNode;
// }) {
//   const { chip, icon } = toneStyles[tone];
//   return (
//     <motion.div
//       variants={itemVariants}
//       whileHover={{ y: -4, transition: { duration: 0.2 } }}
//       className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-shadow duration-300 hover:shadow-md"
//     >
//       <div
//         className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${chip}`}
//       >
//         <Icon size={22} className={icon} />
//       </div>
//       <p className="text-sm text-slate-500">{label}</p>
//       <h2 className="mt-1 font-mono text-3xl font-semibold tabular-nums text-slate-900">
//         {value}
//       </h2>
//     </motion.div>
//   );
// }

// function DealCardSkeleton() {
//   return (
//     <div className="animate-pulse overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-900/5">
//       <div className="h-20 bg-slate-100" />
//       <div className="space-y-4 p-6">
//         <div className="h-4 w-1/2 rounded bg-slate-100" />
//         <div className="h-4 w-2/3 rounded bg-slate-100" />
//         <div className="h-4 w-1/3 rounded bg-slate-100" />
//         <div className="mt-4 h-10 rounded-xl bg-slate-100" />
//       </div>
//     </div>
//   );
// }

// function PaginationControls({
//   currentPage,
//   totalPages,
//   onPageChange,
// }: {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }) {
//   if (totalPages <= 1) return null;

//   const pageNumbers = useMemo(() => {
//     const pages: (number | "ellipsis")[] = [];
//     const windowSize = 1;

//     for (let i = 1; i <= totalPages; i++) {
//       const isEdge = i === 1 || i === totalPages;
//       const isNearCurrent = Math.abs(i - currentPage) <= windowSize;

//       if (isEdge || isNearCurrent) {
//         pages.push(i);
//       } else if (pages[pages.length - 1] !== "ellipsis") {
//         pages.push("ellipsis");
//       }
//     }

//     return pages;
//   }, [currentPage, totalPages]);

//   return (
//     <div className="mt-8 flex items-center justify-center gap-2">
//       <button
//         type="button"
//         onClick={() => onPageChange(Math.max(1, currentPage - 1))}
//         disabled={currentPage === 1}
//         className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
//         aria-label="Previous page"
//       >
//         <ChevronLeft size={18} />
//       </button>

//       {pageNumbers.map((page, idx) =>
//         page === "ellipsis" ? (
//           <span key={`ellipsis-${idx}`} className="px-2 text-sm text-slate-400">
//             …
//           </span>
//         ) : (
//           <button
//             type="button"
//             key={page}
//             onClick={() => onPageChange(page)}
//             aria-current={page === currentPage ? "page" : undefined}
//             className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition-colors ${
//               page === currentPage
//                 ? "bg-[#1E2A5E] text-white"
//                 : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
//             }`}
//           >
//             {page}
//           </button>
//         ),
//       )}

//       <button
//         type="button"
//         onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
//         disabled={currentPage === totalPages}
//         className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
//         aria-label="Next page"
//       >
//         <ChevronRight size={18} />
//       </button>
//     </div>
//   );
// }

// export default function Home() {
//   const [search, setSearch] = useState("");
//   const [industry, setIndustry] = useState("All");
//   const [risk, setRisk] = useState("All");
//   const [sortBy, setSortBy] = useState("None");
//   const [currentPage, setCurrentPage] = useState(1);
//   const dealsPerPage = 6;
//   const dispatch = useAppDispatch();

//   const { deals, loading, error } = useAppSelector((state) => state.deals);

//   const filteredDeals = useMemo(() => {
//     let result = [...deals];

//     if (search.trim()) {
//       result = result.filter((deal) =>
//         deal.companyName.toLowerCase().includes(search.toLowerCase()),
//       );
//     }

//     if (industry !== "All") {
//       result = result.filter((deal) => deal.industry === industry);
//     }

//     if (risk !== "All") {
//       result = result.filter((deal) => deal.risk === risk);
//     }

//     if (sortBy === "ROI") {
//       result.sort((a, b) => b.roi - a.roi);
//     }

//     if (sortBy === "Investment") {
//       result.sort((a, b) => b.investmentRequired - a.investmentRequired);
//     }

//     return result;
//   }, [deals, search, industry, risk, sortBy]);

//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredDeals.length / dealsPerPage),
//   );

//   const paginatedDeals = useMemo(() => {
//     const start = (currentPage - 1) * dealsPerPage;
//     return filteredDeals.slice(start, start + dealsPerPage);
//   }, [filteredDeals, currentPage]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [search, industry, risk, sortBy, deals]);

//   useEffect(() => {
//     if (currentPage > totalPages) {
//       setCurrentPage(totalPages);
//     }
//   }, [currentPage, totalPages]);

//   const [lastUpdated, setLastUpdated] = useState<string | null>(null);
//   const industryData = useMemo(() => {
//     const map = new Map<string, number>();

//     deals.forEach((deal) => {
//       map.set(deal.industry, (map.get(deal.industry) || 0) + 1);
//     });

//     return [...map].map(([industry, value]) => ({
//       industry,
//       value,
//     }));
//   }, [deals]);

//   useEffect(() => {
//     let isMounted = true;

//     async function fetchDeals() {
//       dispatch(setLoading(true));
//       try {
//         const data = await dealService.getDeals();
//         if (isMounted) {
//           dispatch(setDeals(data));
//           setLastUpdated(
//             new Date().toLocaleString("en-IN", {
//               dateStyle: "medium",
//               timeStyle: "short",
//             }),
//           );
//         }
//       } catch {
//         if (isMounted)
//           dispatch(setError("Failed to load deals. Please try again."));
//       } finally {
//         if (isMounted) dispatch(setLoading(false));
//       }
//     }

//     fetchDeals();
//     return () => {
//       isMounted = false;
//     };
//   }, [dispatch]);

//   const { totalInvestment, averageROI, highRiskCount } = useMemo(() => {
//     const list: Deal[] = deals ?? [];
//     const total = list.reduce((sum, deal) => sum + deal.investmentRequired, 0);
//     const avg =
//       list.length > 0
//         ? (list.reduce((sum, deal) => sum + deal.roi, 0) / list.length).toFixed(
//             1,
//           )
//         : "0.0";
//     const highRisk = list.filter((d) => d.risk === "High").length;
//     return { totalInvestment: total, averageROI: avg, highRiskCount: highRisk };
//   }, [deals]);

//   return (
//     <DashboardLayout>
//       <div className="mx-auto max-w-7xl">
//         <motion.div
//           variants={itemVariants}
//           className="mb-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5"
//         >
//           <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//             <div className="grid gap-6 lg:grid-cols-2 mb-10">
//               <InvestmentChart data={deals} />

//               <IndustryChart data={industryData} />
//             </div>

//             <div className="mb-10">
//               <RiskChart data={deals} />
//             </div>
//             <input
//               type="text"
//               placeholder="🔍 Search company..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#1E2A5E] lg:max-w-sm"
//             />

//             <div className="flex flex-wrap gap-3">
//               <select
//                 value={industry}
//                 onChange={(e) => setIndustry(e.target.value)}
//                 className="rounded-xl border border-slate-200 px-4 py-3"
//               >
//                 <option value="All">Industry</option>
//                 <option value="AI">AI</option>
//                 <option value="Healthcare">Healthcare</option>
//                 <option value="FinTech">FinTech</option>
//                 <option value="Energy">Energy</option>
//               </select>

//               <select
//                 value={risk}
//                 onChange={(e) => setRisk(e.target.value)}
//                 className="rounded-xl border border-slate-200 px-4 py-3"
//               >
//                 <option value="All">Risk</option>
//                 <option value="Low">Low</option>
//                 <option value="Medium">Medium</option>
//                 <option value="High">High</option>
//               </select>

//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="rounded-xl border border-slate-200 px-4 py-3"
//               >
//                 <option value="None">Sort By</option>
//                 <option value="ROI">Highest ROI</option>
//                 <option value="Investment">Highest Investment</option>
//               </select>
//             </div>
//           </div>

//           <div className="mt-4 text-sm text-slate-500">
//             {filteredDeals.length > 0 ? (
//               <>
//                 Showing{" "}
//                 <strong>
//                   {(currentPage - 1) * dealsPerPage + 1}–
//                   {Math.min(currentPage * dealsPerPage, filteredDeals.length)}
//                 </strong>{" "}
//                 of <strong>{filteredDeals.length}</strong> deals
//               </>
//             ) : (
//               <>
//                 Showing <strong>0</strong> of <strong>{deals.length}</strong>{" "}
//                 deals
//               </>
//             )}
//           </div>
//         </motion.div>

//         <AnimatePresence mode="wait">
//           {error ? (
//             <motion.div
//               key="error"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="flex flex-col items-center justify-center py-24 text-center"
//             >
//               <ShieldAlert className="mb-4 text-red-500" size={40} />
//               <p className="text-xl font-semibold text-red-600">{error}</p>
//             </motion.div>
//           ) : (
//             <motion.div
//               key="content"
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//                 <SummaryCard
//                   icon={IndianRupee}
//                   tone="green"
//                   label="Total Investment"
//                   value={loading ? "—" : currency.format(totalInvestment)}
//                 />
//                 <SummaryCard
//                   icon={TrendingUp}
//                   tone="blue"
//                   label="Average ROI"
//                   value={loading ? "—" : `${averageROI}%`}
//                 />
//                 <SummaryCard
//                   icon={Building2}
//                   tone="purple"
//                   label="Active Deals"
//                   value={loading ? "—" : deals.length}
//                 />
//                 <SummaryCard
//                   icon={ShieldAlert}
//                   tone="amber"
//                   label="High Risk Deals"
//                   value={loading ? "—" : highRiskCount}
//                 />
//               </div>

//               {/* Deal cards */}
//               <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//                 {loading
//                   ? Array.from({ length: 6 }).map((_, i) => (
//                       <DealCardSkeleton key={i} />
//                     ))
//                   : paginatedDeals.map((deal: Deal) => (
//                       <motion.div
//                         key={deal.id}
//                         variants={itemVariants}
//                         whileHover={{ y: -6, transition: { duration: 0.25 } }}
//                         className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-900/5 transition-shadow duration-300 hover:shadow-lg"
//                       >
//                         <div className="bg-gradient-to-r from-[#1E2A5E] to-[#0B1220] p-5 text-white">
//                           <h2 className="text-2xl font-bold">
//                             {deal.companyName}
//                           </h2>
//                           <p className="text-slate-300">{deal.industry}</p>
//                         </div>

//                         <div className="space-y-4 p-6">
//                           <div className="flex items-baseline justify-between">
//                             <span className="text-sm text-slate-500">ROI</span>
//                             <span className="font-mono text-base font-semibold tabular-nums text-emerald-600">
//                               {deal.roi}%
//                             </span>
//                           </div>

//                           <div className="flex items-baseline justify-between">
//                             <span className="text-sm text-slate-500">
//                               Investment
//                             </span>
//                             <span className="font-mono text-base font-semibold tabular-nums text-slate-900">
//                               {currency.format(deal.investmentRequired)}
//                             </span>
//                           </div>

//                           <div className="flex items-center justify-between">
//                             <span className="text-sm text-slate-500">Risk</span>
//                             <span
//                               className={`rounded-full px-3 py-1 text-xs font-semibold ${riskStyles[deal.risk]}`}
//                             >
//                               {deal.risk}
//                             </span>
//                           </div>

//                           <motion.button
//                             whileTap={{ scale: 0.97 }}
//                             className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E2A5E] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0B1220] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2"
//                           >
//                             View Details
//                             <ArrowRight size={18} />
//                           </motion.button>
//                         </div>
//                       </motion.div>
//                     ))}
//               </div>

//               {!loading && filteredDeals.length > 0 && (
//                 <PaginationControls
//                   currentPage={currentPage}
//                   totalPages={totalPages}
//                   onPageChange={setCurrentPage}
//                 />
//               )}

//               {!loading && deals.length === 0 && (
//                 <motion.div
//                   variants={itemVariants}
//                   className="py-24 text-center text-slate-500"
//                 >
//                   <Building2
//                     className="mx-auto mb-4 text-slate-300"
//                     size={48}
//                   />
//                   <p className="text-lg">
//                     No deals yet. New opportunities will appear here.
//                   </p>
//                 </motion.div>
//               )}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </DashboardLayout>
//   );
// }

"use client";

import DashboardLayout from "@/src/components/layout/DashboardLayout";
import DashboardHeader from "@/src/components/dashboard/DashboardHeader";
import SummaryCards from "@/src/components/dashboard/SummaryCard";
import DealExplorer from "@/src/components/dashboard/DealExplorer";
import DealGrid from "@/src/components/dashboard/DealGrid";
import InvestmentChart from "@/src/components/charts/InvestmentChart";
import IndustryChart from "@/src/components/charts/IndustryChart";
import RiskChart from "@/src/components/charts/RiskChart";
import useDashboard from "@/src/hook/useDashboard";
import RecommendationSection from "@/src/components/dashboard/RecommendationSection";
import RecentActivity from "@/src/components/dashboard/RecentActivity";
import Pagination from "@/src/components/common/Pagination";

export default function Home() {
  const dashboard = useDashboard();

  return (
    <DashboardLayout>
      <DashboardHeader lastUpdated={dashboard.lastUpdated} />

      <SummaryCards
        loading={dashboard.loading}
        totalInvestment={dashboard.totalInvestment}
        averageROI={dashboard.averageROI}
        activeDeals={dashboard.deals.length}
        highRiskDeals={dashboard.highRiskCount}
      />
      <RecommendationSection deals={dashboard.filteredDeals} />

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <InvestmentChart data={dashboard.deals} />
        <IndustryChart data={dashboard.industryData} />
      </div>

      <div className="mb-8">
        <RiskChart data={dashboard.deals} />
      </div>
      <div className="grid gap-6 lg:grid-cols-3 mb-10">
        <div className="lg:col-span-2">
          <RiskChart data={dashboard.deals} />
        </div>

        <RecentActivity />
      </div>

      <DealExplorer
        search={dashboard.search}
        setSearch={dashboard.setSearch}
        industry={dashboard.industry}
        setIndustry={dashboard.setIndustry}
        risk={dashboard.risk}
        setRisk={dashboard.setRisk}
        sortBy={dashboard.sortBy}
        setSortBy={dashboard.setSortBy}
        totalDeals={dashboard.deals.length}
        filteredDeals={dashboard.filteredDeals.length}
      />

      <DealGrid deals={dashboard.paginatedDeals} loading={dashboard.loading} />

      <Pagination
        currentPage={dashboard.currentPage}
        totalPages={dashboard.totalPages}
        onPageChange={dashboard.setCurrentPage}
      />
    </DashboardLayout>
  );
}