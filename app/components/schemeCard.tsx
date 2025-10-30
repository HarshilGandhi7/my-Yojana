"use client";

import { useEffect, useState } from "react";
import SchemeProps from "../../lib/types";
import { toast } from "react-toastify";

export default function SchemeCard({
  _id,
  schemeName,
  schemeShortTitle,
  state,
  level,
  tags,
  category,
  detailedDescription_md,
  openDate,
  closeDate,
  nodalMinistryName,
  email,
  saved,
}: SchemeProps & { email: string } & { saved?: boolean }) {
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    async function fetchSavedSchemes() {
      const response = await fetch("/api/saved-schemes", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${email}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data && Array.isArray(data.savedSchemes)) {
          setIsSaved(data.savedSchemes.includes(_id!));
        }
      }
    }

    fetchSavedSchemes();
  }, [_id, email]);

  const truncatedDescription =
    detailedDescription_md && detailedDescription_md.length > 150
      ? detailedDescription_md.slice(0, 150) + "..."
      : detailedDescription_md || "";

  const truncatedName =
    schemeName && schemeName.length > 30
      ? schemeName.slice(0, 30) + "..."
      : schemeName || "";

  const mainCategory = category?.[0] || "";

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const addSavedSchemeHandler = async () => {
    try {
      const response = await fetch("/api/saved-schemes", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${email}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      });

      if (!response.ok) {
        throw new Error("Failed to save scheme");
      }

      const data = await response.json();
      setIsSaved(data.savedSchemes.includes(_id!));
      toast.success("Scheme saved successfully");
    } catch (error) {
      toast.error("Error saving scheme");
    }
  };

  const removeSavedSchemeHandler = async () => {
    try {
      const response = await fetch("/api/saved-schemes", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${email}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id }),
      });

      if (!response.ok) {
        throw new Error("Failed to save scheme");
      }

      const data = await response.json();
      setIsSaved(data.savedSchemes.includes(_id!));
      toast.success("Scheme deleted successfully");
    } catch (error) {
      toast.error("Error deleting scheme");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
      <div className="h-1.5 bg-green-600"></div>

      <div className="p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="px-2.5 py-0.5 text-xs font-medium bg-green-50 text-green-700 rounded-full">
            {mainCategory || "General"}
          </span>
          <span className="text-xs text-gray-500">{level}</span>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-700 line-clamp-2">
          {truncatedName}
        </h3>

        {schemeShortTitle && (
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Short title:</span>{" "}
              {schemeShortTitle}
            </p>
            {saved === false  ? (
              <button
                onClick={() =>
                  isSaved ? removeSavedSchemeHandler() : addSavedSchemeHandler()
                }
                className="transition-colors hover:scale-110"
              >
                {isSaved ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600 fill-green-600"
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
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400"
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
                )}
              </button>
            ) : null}
          </div>
        )}

        {truncatedDescription && (
          <p className="text-gray-600 text-sm line-clamp-3">
            {truncatedDescription}
          </p>
        )}

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
            {tags.length > 2 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                +{tags.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Metadata section */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
          {state && (
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {state}
            </span>
          )}

          {nodalMinistryName && (
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              {nodalMinistryName}
            </span>
          )}

          {(openDate || closeDate) && (
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {openDate ? formatDate(openDate) : ""}
              {openDate && closeDate && " - "}
              {closeDate ? formatDate(closeDate) : ""}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-gray-100 flex justify-end">
          <a
            href={`/schemes/scheme/${_id}`}
            className="text-green-600 font-medium hover:text-green-700 text-sm flex items-center gap-1"
          >
            View Details
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
