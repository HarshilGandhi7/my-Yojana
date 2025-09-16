"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.message) {
    setStatus("Please fill in all fields.");
    return;
  }

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus(data.message || "Something went wrong. Please try again.");
    }
  } catch (error) {
    setStatus("Something went wrong. Please try again.");
  }
};


  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative bg-gradient-to-r from-[#2c5364] via-[#203a43] to-[#0f2027] text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            We'd love to hear from you! Reach out with questions, feedback, or partnership opportunities.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-[#2c5364] mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c5364]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Your Email</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c5364]"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                name="message"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c5364] h-32"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#2c5364] text-white py-3 rounded-lg hover:bg-[#203a43] transition-colors"
            >
              Send Message
            </button>
          </form>

          {/* Status Message */}
          {status && (
            <p className="mt-4 text-center text-sm text-gray-700">{status}</p>
          )}
        </div>

        {/* Contact Information */}
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-semibold text-[#2c5364] mb-4">Contact Details</h2>
            <p className="text-gray-600">
              Have a question or need help? Reach out to us directly.
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800">Email:</h4>
                <p className="text-gray-600">mail id of all 3 of us</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Phone:</h4>
                <p className="text-gray-600">Phone number of all 3 of us</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Address:</h4>
                <p className="text-gray-600">
                 Vellore Institute of Technology
                </p>
              </div>
            </div>
          </div>

          {/* Google Map Embed */}
          
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-[#2c5364] to-[#203a43] text-white text-center py-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          We're Here to Help You!
        </h2>
        <p className="max-w-xl mx-auto mb-6">
          Whether you're a user, partner, or just curious about what we do, our team is ready to assist you.
        </p>
        <a
          href="/signup"
          className="bg-white text-[#2c5364] px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Get Started
        </a>
      </section>
    </div>
  );
}
