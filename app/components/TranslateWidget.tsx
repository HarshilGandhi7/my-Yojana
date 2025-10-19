"use client";

import { useEffect } from "react";

// Add type declaration for global Google Translate function
declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: {
      translate: {
        TranslateElement: {
          new (options: any, elementId: string): any;
          InlineLayout: {
            HORIZONTAL: string;
            SIMPLE: string;
            VERTICAL: string;
          };
        };
      };
    };
  }
}

export default function TranslateWidget() {
  useEffect(() => {
    // Create the script element for Google Translate
    const addScript = () => {
      const script = document.createElement("script");
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
      return script;
    };

    // Define the initialization function that Google will call
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL
        },
        "google_translate_element"
      );
    };

    const script = addScript();

    
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <div 
        id="google_translate_element" 
        className="inline-block text-sm"
        aria-label="Translate page"
      ></div>
    </div>
  );
}