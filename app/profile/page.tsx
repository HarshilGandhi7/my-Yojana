"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchUserDetails() {
      const user = JSON.parse(
        sessionStorage.getItem("userDisplayInfo") || "{}"
      );
      if (!user || !user.email) {
        window.location.href = "/login";
        const response = await fetch("/api/logout", { method: "POST" });
        if (response.ok) {
          sessionStorage.removeItem("userDisplayInfo");
        }
        router.push("/login");
      }
      const res = await fetch(`/api/profile?email=${user.email}`);
      const data = await res.json();
      if (res.ok) {
        setFormData(data.user);
      }
      setLoading(false);
    }
    fetchUserDetails();
  }, []);

  const [formData, setFormData] = useState({
    Name: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    incomeRange: "",
    educationLevel: "",
    employmentStatus: "",
    occupation: "",
    familySize: "",
    category: "",
    disability: "no",
    disabilityDetails: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear disability details if disability is set to "no"
    if (name === "disability" && value === "no") {
      setFormData((prev) => ({ ...prev, disabilityDetails: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Add validation here

      // Example API call
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#2c5364] border-r-transparent"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-[#2c5364] to-[#0f2027] py-6 px-8">
            <h1 className="text-2xl font-bold text-white">
              Complete Your Profile
            </h1>
            <p className="text-blue-100 mt-1">
              This information helps us find the most suitable schemes for you
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information Section */}
              <div className="md:col-span-2">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b">
                  Basic Information
                </h2>
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.Name}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#2c5364] focus:ring focus:ring-[#2c5364]/20"
                  required
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#2c5364] focus:ring focus:ring-[#2c5364]/20"
                  required
                  pattern="[0-9]{10}"
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#2c5364] focus:ring focus:ring-[#2c5364]/20"
                  required
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#2c5364] focus:ring focus:ring-[#2c5364]/20"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>

              {/* Address Section */}
              <div className="md:col-span-2 mt-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b">
                  Address Information
                </h2>
              </div>

              <div className="form-group md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#2c5364] focus:ring focus:ring-[#2c5364]/20"
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#2c5364] focus:ring focus:ring-[#2c5364]/20"
                  required
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#2c5364] focus:ring focus:ring-[#2c5364]/20"
                  required
                >
                  <option value="">Select State</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Andaman and Nicobar Islands">
                    Andaman and Nicobar Islands
                  </option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Dadra and Nagar Haveli">
                    Dadra and Nagar Haveli
                  </option>
                  <option value="Daman and Diu">Daman and Diu</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Puducherry">Puducherry</option>
                </select>
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PIN Code
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#2c5364] focus:ring focus:ring-[#2c5364]/20"
                  pattern="[0-9]{6}"
                  placeholder="6-digit PIN code"
                />
              </div>

              {/* Socioeconomic Information Section */}
              <div className="md:col-span-2 mt-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b">
                  Socioeconomic Information
                </h2>
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Income Range (Annual) <span className="text-red-500">*</span>
                </label>
                <select
                  name="incomeRange"
                  value={formData.incomeRange}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#2c5364] focus:ring focus:ring-[#2c5364]/20"
                  required
                >
                  <option value="">Select Income Range</option>
                  <option value="below_100000">Below ₹1,00,000</option>
                  <option value="100000_300000">₹1,00,000 - ₹3,00,000</option>
                  <option value="300000_500000">₹3,00,000 - ₹5,00,000</option>
                  <option value="500000_800000">₹5,00,000 - ₹8,00,000</option>
                  <option value="800000_1000000">₹8,00,000 - ₹10,00,000</option>
                  <option value="above_1000000">Above ₹10,00,000</option>
                </select>
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Education Level <span className="text-red-500">*</span>
                </label>
                <select
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#2c5364] focus:ring focus:ring-[#2c5364]/20"
                  required
                >
                  <option value="">Select Education Level</option>
                  <option value="below_primary">Below Primary</option>
                  <option value="primary">Primary (1-5)</option>
                  <option value="middle">Middle School (6-8)</option>
                  <option value="secondary">Secondary (9-10)</option>
                  <option value="higher_secondary">
                    Higher Secondary (11-12)
                  </option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="postgraduate">Postgraduate</option>
                  <option value="doctorate">Doctorate</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employment Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#2c5364] focus:ring focus:ring-[#2c5364]/20"
                  required
                >
                  <option value="">Select Employment Status</option>
                  <option value="employed">Employed</option>
                  <option value="self_employed">Self-employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="student">Student</option>
                  <option value="homemaker">Homemaker</option>
                  <option value="retired">Retired</option>
                </select>
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Occupation
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#2c5364] focus:ring focus:ring-[#2c5364]/20"
                  placeholder="If employed/self-employed"
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Family Size <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="familySize"
                  value={formData.familySize}
                  onChange={handleChange}
                  min="1"
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#2c5364] focus:ring focus:ring-[#2c5364]/20"
                  required
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#2c5364] focus:ring focus:ring-[#2c5364]/20"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="general">General</option>
                  <option value="obc">OBC</option>
                  <option value="sc">SC</option>
                  <option value="st">ST</option>
                  <option value="ews">EWS</option>
                </select>
              </div>

              {/* Disability Section */}
              <div className="md:col-span-2 mt-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b">
                  Disability Information
                </h2>
              </div>

              <div className="form-group md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Do you have any disability?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 flex space-x-6">
                  <div className="flex items-center">
                    <input
                      id="disability-no"
                      name="disability"
                      type="radio"
                      value="no"
                      checked={formData.disability === "no"}
                      onChange={handleChange}
                      className="h-4 w-4 text-[#2c5364] focus:ring-[#2c5364]"
                    />
                    <label
                      htmlFor="disability-no"
                      className="ml-2 text-sm text-gray-700"
                    >
                      No
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="disability-yes"
                      name="disability"
                      type="radio"
                      value="yes"
                      checked={formData.disability === "yes"}
                      onChange={handleChange}
                      className="h-4 w-4 text-[#2c5364] focus:ring-[#2c5364]"
                    />
                    <label
                      htmlFor="disability-yes"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Yes
                    </label>
                  </div>
                </div>
              </div>

              {formData.disability === "yes" && (
                <div className="form-group md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Disability Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="disabilityDetails"
                    value={formData.disabilityDetails}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-[#2c5364] focus:ring focus:ring-[#2c5364]/20"
                    placeholder="Please provide details about your disability"
                    required={formData.disability === "yes"}
                  ></textarea>
                </div>
              )}

              <div className="md:col-span-2 mt-8">
                <div className="flex items-center">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    className="h-4 w-4 text-[#2c5364] focus:ring-[#2c5364] rounded"
                    required
                  />
                  <label
                    htmlFor="consent"
                    className="ml-2 text-sm text-gray-700"
                  >
                    I confirm that the information provided is accurate and I
                    consent to it being used to identify suitable government
                    schemes. <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                className="mr-4 px-5 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c5364]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#2c5364] to-[#203a43] hover:from-[#2c5364] hover:to-[#0f2027] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c5364] disabled:opacity-70"
              >
                {loading ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p>
            All fields marked with <span className="text-red-500">*</span> are
            mandatory
          </p>
        </div>
      </div>
    </div>
  );
}
