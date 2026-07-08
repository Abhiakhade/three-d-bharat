"use client";

import { useEffect, useMemo, useState } from "react";

import { dealService } from "@/src/services/dealService";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { setDeals, setLoading, setError } from "@/src/store/slices/dealSlice";

import useDebounce from "./useDebounce";

export default function useDashboard() {
  const dispatch = useAppDispatch();

  const { deals, loading } = useAppSelector((state) => state.deals);

  // -------------------------
  // States
  // -------------------------

  const [search, setSearch] = useState("");

  const [industry, setIndustry] = useState("All");

  const [risk, setRisk] = useState("All");

  const [sortBy, setSortBy] = useState("None");

  const [lastUpdated, setLastUpdated] = useState("");

  const debouncedSearch = useDebounce(search, 500);
const [currentPage, setCurrentPage] = useState(1);

const dealsPerPage = 6;
  // -------------------------
  // Fetch Deals
  // -------------------------

useEffect(() => {
  async function fetchDeals() {
    try {
      dispatch(setLoading(true));

      const data = await dealService.getDeals();

      dispatch(setDeals(data));

      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error("Dashboard Error:", error);

      dispatch(setError("Failed to load deals."));
    } finally {
      dispatch(setLoading(false));
    }
  }

  fetchDeals();
}, [dispatch]);


  const filteredDeals = useMemo(() => {
    let result = [...deals];

    if (debouncedSearch) {
      result = result.filter((deal) =>
        deal.companyName.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }

    if (industry !== "All") {
      result = result.filter((deal) => deal.industry === industry);
    }

    if (risk !== "All") {
      result = result.filter((deal) => deal.risk === risk);
    }

    switch (sortBy) {
      case "ROI":
        result.sort((a, b) => b.roi - a.roi);
        break;

      case "Investment":
        result.sort((a, b) => b.investmentRequired - a.investmentRequired);
        break;
    }

    return result;
  }, [deals, debouncedSearch, industry, risk, sortBy]);

  const totalPages = Math.ceil(filteredDeals.length / dealsPerPage);

  const paginatedDeals = useMemo(() => {
    const start = (currentPage - 1) * dealsPerPage;

    return filteredDeals.slice(start, start + dealsPerPage);
  }, [filteredDeals, currentPage]);

  const totalInvestment = filteredDeals.reduce(
    (sum, deal) => sum + deal.investmentRequired,
    0,
  );

  const averageROI =
    filteredDeals.length > 0
      ? (
          filteredDeals.reduce((sum, deal) => sum + deal.roi, 0) /
          filteredDeals.length
        ).toFixed(1)
      : "0";

  const highRiskCount = filteredDeals.filter(
    (deal) => deal.risk === "High",
  ).length;

  // -------------------------
  // Industry Chart
  // -------------------------

  const industryData = useMemo(() => {
    const map = new Map<string, number>();

    filteredDeals.forEach((deal) => {
      map.set(deal.industry, (map.get(deal.industry) ?? 0) + 1);
    });

    return [...map].map(([industry, value]) => ({
      industry,
      value,
    }));
  }, [filteredDeals]);

  // -------------------------

 return {
   loading,
   deals,
   filteredDeals,

   // Pagination
   paginatedDeals,
   currentPage,
   totalPages,
   setCurrentPage,

   // Search
   search,
   setSearch,

   // Filters
   industry,
   setIndustry,

   risk,
   setRisk,

   sortBy,
   setSortBy,

   // Summary
   totalInvestment,
   averageROI,
   highRiskCount,

   industryData,

   lastUpdated,
 };
}
