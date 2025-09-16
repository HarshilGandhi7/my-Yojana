"use client";

import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const user = sessionStorage.getItem("userDisplayInfo");
    if (user) router.push("/");
  }, [router]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    const data = await res.json();
    if (res.ok) {
      sessionStorage.setItem(
        "userDisplayInfo",
        JSON.stringify({
          email: formData.email,
          name: data.user?.name || "User",
        })
      );
      toast.success(data.message);
      router.push("/");
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-[#2c5364] mb-6">
          Welcome Back
        </h1>

        {error && (
          <p className="mb-4 text-sm text-red-600 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c5364]"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c5364]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2c5364] text-white py-3 rounded-lg hover:bg-[#203a43] transition-colors font-medium"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-[#2c5364] hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
