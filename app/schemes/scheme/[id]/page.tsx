"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { MapPinIcon, TagIcon, FileTextIcon, CheckCircleIcon, HelpCircleIcon, BookOpenIcon } from "lucide-react";
import SchemeProps from "../../../../lib/types";
import Link from "next/link";

export default function Scheme() {
  const params = useParams();
  const id = params.id;
  const [scheme, setScheme] = useState<SchemeProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    let isMounted = true;
    const fetchScheme = async () => {
      try {
        const response = await fetch(`/api/schemes/${id}`);
        const data = await response.json();
        
        if (isMounted) {
          setScheme(data);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchScheme();
    
    return () => {
      isMounted = false;
    };
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  if (!scheme) {
    return (
      <div className="max-w-4xl mx-auto p-8 pt-10">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <h1 className="text-2xl font-bold text-red-700 mb-2">Scheme Not Found</h1>
          <p className="text-red-600">The scheme you're looking for could not be found.</p>
          <Link href="/schemes" className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Back to All Schemes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-16 pt-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 rounded-b-lg shadow-lg text-white">
        <div className="flex flex-wrap items-start justify-between">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold mb-2">{scheme.schemeName}</h1>
            {scheme.schemeShortTitle && (
              <p className="text-green-100 text-lg mb-4">({scheme.schemeShortTitle})</p>
            )}
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 mr-1" />
                <span>{scheme.state}</span>
              </div>
              <div className="flex items-center">
                <TagIcon className="h-5 w-5 mr-1" />
                <span>{scheme.level} Scheme</span>
              </div>
            </div>
          </div>
          
          {scheme.references && scheme.references.length > 0 && (
            <div className="mt-4 md:mt-0">
              {scheme.references
                .filter(ref => ref.url && !ref.url.startsWith('file:///'))
                .map((ref, index) => (
                  <a
                    key={index}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white text-green-700 px-4 py-2 rounded mb-2 hover:bg-green-50 transition-colors font-medium"
                  >
                    {ref.title || "Official Link"}
                  </a>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="sticky top-0 bg-white border-b z-10">
        <div className="flex overflow-x-auto">
          <button 
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 font-medium text-sm ${activeTab === "overview" ? "border-b-2 border-green-600 text-green-600" : "text-gray-600"}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab("eligibility")}
            className={`px-6 py-3 font-medium text-sm ${activeTab === "eligibility" ? "border-b-2 border-green-600 text-green-600" : "text-gray-600"}`}
          >
            Eligibility
          </button>
          <button 
            onClick={() => setActiveTab("benefits")}
            className={`px-6 py-3 font-medium text-sm ${activeTab === "benefits" ? "border-b-2 border-green-600 text-green-600" : "text-gray-600"}`}
          >
            Benefits
          </button>
          <button 
            onClick={() => setActiveTab("application")}
            className={`px-6 py-3 font-medium text-sm ${activeTab === "application" ? "border-b-2 border-green-600 text-green-600" : "text-gray-600"}`}
          >
            How to Apply
          </button>
          <button 
            onClick={() => setActiveTab("documents")}
            className={`px-6 py-3 font-medium text-sm ${activeTab === "documents" ? "border-b-2 border-green-600 text-green-600" : "text-gray-600"}`}
          >
            Documents
          </button>
          <button 
            onClick={() => setActiveTab("faq")}
            className={`px-6 py-3 font-medium text-sm ${activeTab === "faq" ? "border-b-2 border-green-600 text-green-600" : "text-gray-600"}`}
          >
            FAQs
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <BookOpenIcon className="h-5 w-5 mr-2 text-green-600" />
                About the Scheme
              </h2>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: scheme.detailedDescription_md || '.' }} />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4">Categories & Tags</h2>
              {scheme.category && scheme.category.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Categories:</h3>
                  <div className="flex flex-wrap gap-2">
                    {scheme.category.map((cat, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {scheme.tags && scheme.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {scheme.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Eligibility Tab */}
        {activeTab === "eligibility" && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CheckCircleIcon className="h-5 w-5 mr-2 text-green-600" />
              Eligibility Criteria
            </h2>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: scheme.eligibilityDescription_md || '.'}} />
          </div>
        )}
        
        {/* Benefits Tab */}
        {activeTab === "benefits" && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <TagIcon className="h-5 w-5 mr-2 text-green-600" />
              Scheme Benefits
            </h2>
            {scheme.benefits && scheme.benefits.map((benefit, index) => (
              <div key={index} className="mb-2">
                {benefit.children && benefit.children.map((child, childIndex) => (
                  <p key={childIndex} className="mb-4">{child.text}</p>
                ))}
              </div>
            ))}
          </div>
        )}
        
        {/* Application Tab */}
        {activeTab === "application" && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileTextIcon className="h-5 w-5 mr-2 text-green-600" />
              Application Process
            </h2>
            
            {scheme.applicationProcess && scheme.applicationProcess.map((app, index) => (
              <div key={index} className="mb-6">
                <div className="bg-green-50 inline-block px-3 py-1 rounded-full text-green-800 text-sm font-medium mb-4">
                  Mode: {app.mode}
                </div>
                
                {app.process && app.process.map((proc, procIndex) => (
                  <div key={procIndex} className="ml-4">
                    {proc.children && proc.children.map((child, childIndex) => {
                      if (child.type === "list_item") {
                        return (
                          <div key={childIndex} className="flex items-start mb-3">
                            <div className="bg-green-100 text-green-800 rounded-full h-6 w-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                              {childIndex + 1}
                            </div>
                            <div className="ml-3">{child?.children?.[0]?.text || '.'}</div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        
        {/* Documents Tab */}
        {activeTab === "documents" && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileTextIcon className="h-5 w-5 mr-2 text-green-600" />
              Required Documents
            </h2>
            
            {scheme.documents_required && scheme.documents_required.map((doc, index) => (
              <div key={index}>
                {doc.children && doc.children.map((child, childIndex) => {
                  if (child.type === "list_item") {
                    return (
                      <div key={childIndex} className="flex items-start mb-3">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="ml-3">{child.children?.[0]?.text || ''}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ))}
          </div>
        )}
        
        {/* FAQ Tab */}
        {activeTab === "faq" && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <HelpCircleIcon className="h-5 w-5 mr-2 text-green-600" />
              Frequently Asked Questions
            </h2>
            
            {scheme.faqs && scheme.faqs.map((faq, index) => (
              <div key={index} className="mb-6 border-b pb-5 last:border-b-0">
                <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                <p className="text-gray-600 whitespace-pre-line">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/schemes" className="text-gray-600 hover:text-gray-900">
            ← Back to All Schemes
          </Link>
        </div>
      </div>
    </div>
  );
}