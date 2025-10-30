"use client";
import { useEffect, useState } from "react";
import SchemeCard from "../components/schemeCard";
import SchemeProps from "@/lib/types";

export default function SavedSchemesPage() {
  const [email, setEmail] = useState("");
  const [schemes, setSchemes] = useState<SchemeProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const user = JSON.parse(
          sessionStorage.getItem("userDisplayInfo") || "{}"
        );
        if (!user.email) return;

        setEmail(user.email);

        const response = await fetch("/api/saved-schemes", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.email}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data.savedSchemes)) {
            const schemeDataList = [];

            for (const Id of data.savedSchemes) {
              const schemeResponse = await fetch(`/api/schemes/${Id}`);
              if (schemeResponse.ok) {
                const schemeData = await schemeResponse.json();
                schemeDataList.push(schemeData);
              }
            }

            setSchemes(schemeDataList);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2c5364]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#2c5364] mb-2">
            Your Saved Schemes
          </h1>
          <p className="text-gray-600">
            Keep track of government schemes that interest you
          </p>
        </div>

        {/* Content Section */}
        {schemes.length > 0 ? (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <p className="text-gray-600">
                You have saved{" "}
                <span className="font-semibold text-[#2c5364]">
                  {schemes.length}
                </span>{" "}
                schemes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schemes.map((scheme, index) => (
                <SchemeCard
                  key={scheme._id || index}
                  {...scheme}
                  email={email}
                  saved={true}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No saved schemes found
            </h3>
            <p className="text-gray-500 mb-6">
              Start exploring and save schemes that interest you
            </p>
            <a
              href="/schemes"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2c5364] hover:bg-[#203a43] transition-colors"
            >
              Explore Schemes
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
