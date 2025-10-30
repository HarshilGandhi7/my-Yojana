"use client";

import { useEffect, useRef, useState } from "react";
import SchemeProps from "@/lib/types";
import SchemeCard from "./schemeCard";

interface WithIntersectionObserverProps {
  hasMore: boolean;
  schemes: SchemeProps[];
  fetchSchemes: (page: number) => Promise<void>;
  loading: boolean;
  email:string;
}

export const WithIntersectionObserver = ({
  hasMore,
  schemes,
  fetchSchemes,
  loading,
  email,
}: WithIntersectionObserverProps) => {
  const [page, setPage] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loading || !hasMore) {
      return;
    }

    // Disconnecting previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !loading) {
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            fetchSchemes(nextPage);
            return nextPage;
          });
        }
      },
      {
        root: null,
        rootMargin: "20px",
        threshold: 0.1,
      }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [fetchSchemes, hasMore, loading, page]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {schemes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schemes.map((scheme, index) => (
              <SchemeCard key={scheme._id || index} {...scheme} email={email} saved={false}/>
            ))}
          </div>

          <div
            ref={loadMoreRef}
            className="w-full h-20 flex justify-center items-center mt-4"
          >
            {loading ? (
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#2c5364] border-r-transparent"></div>
            ) : hasMore ? (
              <p className="text-gray-500">Scroll for more...</p>
            ) : (
              <p className="text-gray-500">No more schemes to load</p>
            )}
          </div>
        </>
      ) : loading ? (
        <div className="flex justify-center py-16">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#2c5364] border-r-transparent"></div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <h3 className="text-xl font-medium text-gray-600">
            No schemes found
          </h3>
          <p className="text-gray-500 mt-2">
            Try adjusting your filters and click Apply Filters
          </p>
        </div>
      )}
    </div>
  );
};
