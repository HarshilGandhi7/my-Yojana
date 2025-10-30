"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import TranslateWidget from "./TranslateWidget";

export default function NavbarWrapper() {
  const router = useRouter();
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(
    null
  );

  useEffect(() => {
    const userInfo = sessionStorage.getItem("userDisplayInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.removeItem("userDisplayInfo");

        router.push("/login");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      toast.error("Something went wrong during logout");
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 transition-all duration-200 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-[#2c5364] to-[#0f2027] bg-clip-text text-transparent hover:scale-105 transition-transform"
            >
              MyYojana
            </Link>
          </div>
          <TranslateWidget />

          <div className="hidden md:flex items-center space-x-6">
            
            {user && (
              <Link
                href="/saved-schemes"
                className="text-gray-600 hover:text-[#2c5364] font-medium py-2 flex items-center space-x-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
                <span>Saved</span>
              </Link>
            )}

            <Link
              href="/schemes"
              className="text-gray-600 hover:text-[#2c5364] font-medium py-2"
            >
              <span>Schemes</span>
            </Link>

            <Link
              href="/about"
              className="text-gray-600 hover:text-[#2c5364] font-medium py-2"
            >
              <span>About</span>
            </Link>

            {user ? (
              <div className="flex items-center space-x-6">
                <Link
                  href="/profile"
                  className="flex items-center text-gray-600 hover:text-[#2c5364] font-medium"
                >
                  <span>{user.name || "Profile"}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-[#2c5364]/20 text-[#2c5364] rounded-lg hover:bg-[#2c5364] hover:text-white transition-colors duration-300 font-medium flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-600 hover:text-[#2c5364] font-medium"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="px-4 py-2 bg-gradient-to-r from-[#2c5364] to-[#0f2027] text-white rounded-lg hover:shadow-lg hover:shadow-[#2c5364]/20 transition-all duration-300 font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button className="text-gray-600 hover:text-[#2c5364] focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
