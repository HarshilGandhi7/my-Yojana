"use client";

import Image from "next/image";
import { useState,useEffect } from "react";

export default function AboutPage() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const userInfo = sessionStorage.getItem("userDisplayInfo");
    setUser(userInfo);
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2c5364] via-[#203a43] to-[#0f2027] opacity-90"></div>
        </div>
        <div className="relative container mx-auto px-6 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            About MyYojana
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Empowering individuals and communities by simplifying access to
            government schemes, benefits, and opportunities.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#2c5364] mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At <span className="font-semibold">MyYojana</span>, we are committed
            to helping individuals discover and apply for the right government
            schemes effortlessly. Our platform brings together information,
            guidance, and tools to ensure you never miss out on the benefits you
            deserve.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#2c5364] mb-12">
            Why Choose MyYojana?
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <Image
                  src="/icons/simplify.svg"
                  alt="Simplify"
                  width={60}
                  height={60}
                />
              </div>
              <h3 className="text-xl font-semibold text-[#203a43] mb-2">
                Simplified Process
              </h3>
              <p className="text-gray-600">
                Our platform breaks down complex government procedures into
                simple steps that anyone can follow.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <Image
                  src="/icons/ai.svg"
                  alt="AI Assistance"
                  width={60}
                  height={60}
                />
              </div>
              <h3 className="text-xl font-semibold text-[#203a43] mb-2">
                AI Powered Suggestions
              </h3>
              <p className="text-gray-600">
                Get personalized recommendations on schemes based on your
                eligibility and profile.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <Image
                  src="/icons/community.svg"
                  alt="Community Support"
                  width={60}
                  height={60}
                />
              </div>
              <h3 className="text-xl font-semibold text-[#203a43] mb-2">
                Multiple language Support
              </h3>
              <p className="text-gray-600">
                Connect with others and get help through our vibrant community
                and support network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#2c5364] mb-12">
          Meet the Team
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="text-center">
            <Image
              src="/team/shrey.jpg"
              alt="Shrey Sethia"
              width={150}
              height={150}
              className="rounded-full mx-auto mb-4 border-4 border-[#2c5364]"
            />
            <h3 className="text-xl font-semibold">Shrey Sethia</h3>
            <p className="text-gray-600">Student</p>
          </div>

          <div className="text-center">
            <Image
              src="/team/teammate1.jpg"
              alt="Team Member"
              width={150}
              height={150}
              className="rounded-full mx-auto mb-4 border-4 border-[#2c5364]"
            />
            <h3 className="text-xl font-semibold">Harshil Gandhi</h3>
            <p className="text-gray-600">Student</p>
          </div>

          <div className="text-center">
            <Image
              src="/team/teammate2.jpg"
              alt="Team Member"
              width={150}
              height={150}
              className="rounded-full mx-auto mb-4 border-4 border-[#2c5364]"
            />
            <h3 className="text-xl font-semibold">Lakshya Jain</h3>
            <p className="text-gray-600">Student</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {!user && (
        <section className="bg-gradient-to-r from-[#2c5364] to-[#203a43] py-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Ready to Explore Government Schemes?
          </h2>
          <p className="mb-6">
            Sign up now and take the first step towards simplifying your
            journey.
          </p>
          <a
            href="/signup"
            className="bg-white text-[#2c5364] px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Get Started
          </a>
        </section>
      )}
    </div>
  );
}
