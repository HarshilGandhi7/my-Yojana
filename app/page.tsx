"use client";
import Image from "next/image";
import Link from "next/link";
import {
  languages,
  stats,
  howItWorks,
  faqs,
  categories,
  features,
} from "./constants";
import IconComponent from "./components/iconComponent";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    const userInfo = sessionStorage.getItem("userDisplayInfo");
    setUser(userInfo);
  });
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative min-h-[600px]">
        <Image
          src="/family.png"
          alt="Background"
          fill
          priority
          className="object-cover object-center brightness-100 "
        />

        <div className="relative z-10 container mx-auto px-6 py-32">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
                Find Government Schemes Made Simple
              </h1>
              <p className="text-xl mb-12 text-gray-300 leading-relaxed max-w-2xl">
                MyYojana helps you discover relevant government schemes and
                benefits in your preferred language. Start your journey to
                better opportunities today.
              </p>
              <div className="flex gap-6">
                <Link
                  href="/schemes"
                  className="bg-white/90 backdrop-blur-sm text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-white transition-colors shadow-lg inline-flex items-center gap-2"
                >
                  Explore Schemes
                </Link>
                {user && (
                  <Link
                    href="/profile"
                    className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors shadow-lg"
                  >
                    Create Profile
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-24 container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Browse by Category
        </h2>
        <p className="text-gray-600 text-center mb-16 text-lg">
          Explore schemes based on your interests and needs
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group bg-white p-8 rounded-2xl hover:bg-gradient-to-r from-[#2c5364] via-[#203a43] to-[#0f2027] transition-all duration-300 border border-gray-100 hover:border-transparent shadow-sm hover:shadow-md"
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <IconComponent name={category.icon} className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-white">
                {category.title}
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-300">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-r from-[#2c5364] via-[#203a43] to-[#0f2027] py-24 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose MyYojana?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-200 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2c5364] to-[#203a43] mb-4">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Language Selection */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Available in Multiple Languages
          </h2>
          <p className="text-gray-600 text-center mb-16 text-lg">
            Access information in your preferred language
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className="p-4 rounded-xl border border-gray-200 hover:border-[#2c5364] hover:shadow-md transition-all flex items-center gap-3 group"
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="text-gray-600 group-hover:text-[#2c5364]">
                  {lang.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {howItWorks.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="text-5xl mb-6">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq) => (
              <div key={faq.question} className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
