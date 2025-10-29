"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    const userInfo = sessionStorage.getItem("userDisplayInfo");
    setUser(userInfo);
  });
  const router = useRouter();

  if (user) router.push("/");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success(data.message);
      router.push("/login");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-[#2c5364] mb-6">
          Create Your Account
        </h1>

        {error && (
          <p className="mb-4 text-sm text-red-600 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c5364]"
              required
            />
          </div>

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
              placeholder="Create a password"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c5364]"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c5364]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2c5364] text-white py-3 rounded-lg hover:bg-[#203a43] transition-colors font-medium"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-[#2c5364] hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
