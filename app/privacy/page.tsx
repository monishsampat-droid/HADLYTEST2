import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-[hsl(var(--background))] text-slate-900 dark:text-[hsl(var(--foreground))]">
      
      {/* Header */}
      <div className="bg-[#0f2318] px-6 py-16 text-center">
        <p className="text-xs tracking-[0.2em] text-green-400 font-semibold mb-3">
          LEGAL
        </p>
        <h1 className="text-4xl font-bold text-white">
          Privacy Policy
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-14 space-y-8 text-gray-600 dark:text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">

        <section>
          <h2 className="text-lg font-bold text-gray-800 dark:text-[hsl(var(--foreground))] mb-3">
            1. Information We Collect
          </h2>
          <p>
            When you place an order or contact us, we may collect your name,
            email address, phone number, shipping address, and payment details
            (processed securely via payment gateways).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800 dark:text-[hsl(var(--foreground))] mb-3">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc ml-5 space-y-1">
            <li>To process and deliver your orders</li>
            <li>To communicate order updates and support</li>
            <li>
              To send growing tips, offers, and community updates (with your
              consent)
            </li>
            <li>To improve our products and services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800 dark:text-[hsl(var(--foreground))] mb-3">
            3. Data Sharing
          </h2>
          <p>
            We do not sell or rent your personal data. We may share necessary
            information with delivery partners and payment processors solely to
            fulfil your order.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800 dark:text-[hsl(var(--foreground))] mb-3">
            4. Cookies
          </h2>
          <p>
            Our website uses cookies to improve your browsing experience. You
            may disable cookies in your browser settings, though some features
            may not function correctly.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800 dark:text-[hsl(var(--foreground))] mb-3">
            5. Data Security
          </h2>
          <p>
            We take reasonable technical and organisational measures to protect
            your personal information from unauthorised access or disclosure.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800 dark:text-[hsl(var(--foreground))] mb-3">
            6. Your Rights
          </h2>
          <p>
            You have the right to access, correct, or request deletion of your
            personal data. Contact us at{" "}
            <a
              href="mailto:info@hadly.live"
              className="text-[#1a3a2a] dark:text-emerald-300 font-medium"
            >
              info@hadly.live
            </a>{" "}
            to exercise these rights.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800 dark:text-[hsl(var(--foreground))] mb-3">
            7. Contact
          </h2>
          <p>
            For privacy-related queries:{" "}
            <a
              href="mailto:info@hadly.live"
              className="text-[#1a3a2a] dark:text-emerald-300 font-medium"
            >
              info@hadly.live
            </a>{" "}
            ·{" "}
            <a
              href="tel:+919019053878"
              className="text-[#1a3a2a] dark:text-emerald-300 font-medium"
            >
              +91 90190 53878
            </a>
          </p>
        </section>

        {/* Footer */}
        <p className="text-xs text-gray-400 dark:text-[hsl(var(--muted-foreground))] border-t border-gray-100 dark:border-[hsl(var(--border))] pt-6">
          Last updated: March 2026 · HADLY, Bangalore, India
        </p>

      </div>
    </div>
  );
}