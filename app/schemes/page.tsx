"use client";

import { useState } from "react";
import TagsDropdown from "../components/tagsDropdown";
import { levels, states } from "../constants/index";
import SchemeProps from "@/lib/types";
import { WithIntersectionObserver } from "../components/WithIntersectionObserver";

export default function SchemePage() {
  const [loading, setLoading] = useState(false);

  const [selectedTag, setSelectedTag] = useState("");
  const [state, setState] = useState("");
  const [level, setLevel] = useState("");
  const [schemes, setSchemes] = useState<SchemeProps[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchSchemes = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_URL
        }/api/schemes?level=${level}&state=${state}&tag=${selectedTag}&limit=10&skip=${
          (page - 1) * 10
        }`
      );
      const data = await response.json();

      if (response.ok && data.success) {
        setSchemes((prev) => [...prev, ...data.schemes]);
        setHasMore(data.pagination.hasMore);
      }
    } catch (error) {
      console.error("Error fetching schemes");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterApply = () => {
    setPage(1);
    setSchemes([]);
    setHasMore(true);
    fetchSchemes(1);
  };

  return (
    <div className="min-h-screen bg-[#0f2027]/5 ">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#2c5364] via-[#203a43] to-[#0f2027] py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="grid"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 8 0 L 0 0 0 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Government Schemes for Every Citizen
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Find and access government schemes tailored to your needs. We help
            you discover benefits you're eligible for.
          </p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-[#203a43] mb-10">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: 1,
              title: "Search & Filter",
              desc: "Find relevant schemes based on your category, state, or specific needs.",
            },
            {
              step: 2,
              title: "Check Eligibility",
              desc: "Review the eligibility criteria to see if you qualify for the scheme.",
            },
            {
              step: 3,
              title: "Apply Online",
              desc: "Follow our step-by-step guides to apply directly through official channels.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
            >
              <div className="w-16 h-16 bg-[#2c5364]/10 text-[#2c5364] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#203a43]">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-[#203a43]">
            Filter Schemes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#2c5364] focus:ring focus:ring-[#2c5364]/20 h-9"
              >
                <option value="All">All Levels</option>
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <div className="relative">
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  disabled={level !== "State"}
                  className={`w-full border-gray-300 rounded-md shadow-sm focus:border-[#2c5364] focus:ring focus:ring-[#2c5364]/20 h-9 
        ${
          level !== "State"
            ? "bg-gray-50 text-gray-500 cursor-not-allowed opacity-75 filter blur-[0.3px]"
            : "bg-white"
        }`}
                >
                  <option value="All">All States</option>
                  {states.map((stateOption) => (
                    <option key={stateOption} value={stateOption}>
                      {stateOption}
                    </option>
                  ))}
                </select>

                {level !== "State" && (
                  <div className="absolute right-0 top-0 bottom-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {level !== "State" && (
                <p className="mt-1 text-xs text-gray-500 italic">
                  State selection only applies to state-level schemes
                </p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <TagsDropdown
                selectedTag={selectedTag}
                onChange={(value) => setSelectedTag(value)}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              className="bg-gradient-to-r from-[#2c5364] to-[#203a43] text-white px-5 py-2 rounded-md hover:from-[#2c5364] hover:to-[#0f2027] transition-all duration-300 shadow-md"
              onClick={handleFilterApply}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
      <WithIntersectionObserver
        hasMore={hasMore}
        schemes={schemes}
        fetchSchemes={fetchSchemes}
        loading={loading}
      />
    </div>
  );
}
