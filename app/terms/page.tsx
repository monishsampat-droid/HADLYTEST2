import React from "react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white dark:bg-[hsl(var(--background))] text-slate-900 dark:text-[hsl(var(--foreground))]">
      
      {/* Header */}
      <div className="bg-[#0f2318] px-6 py-16 text-center">
        <p className="text-xs tracking-[0.2em] text-green-400 font-semibold mb-3">
          LEGAL
        </p>
        <h1 className="text-4xl font-bold text-white">
          Terms of Service
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-14 space-y-8 text-gray-600 dark:text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">

        <section>
          <h2 className="text-lg font-bold text-gray-800 dark:text-[hsl(var(--foreground))] mb-3">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using the HADLY website and purchasing our products,
            you agree to be bound by these Terms of Service. If you do not agree,
            please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800 dark:text-[hsl(var(--foreground))] mb-3">
            2. Products & Descriptions
          </h2>
          <p>
            We make every effort to display product descriptions, images, and
            pricing accurately. HADLY reserves the right to modify product
            offerings and pricing at any time without prior notice.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800 dark:text-[hsl(var(--foreground))] mb-3">
            3. Orders & Payments
          </h2>
          <p>
            All orders are subject to availability and payment confirmation. We
            accept UPI, credit/debit cards, and net banking. Prices are inclusive
            of applicable taxes unless stated otherwise.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800 dark:text-[hsl(var(--foreground))] mb-3">
            4. Intellectual Property
          </h2>
          <p>
            All content on this website — including text, images, logos, and
            product descriptions — is the property of HADLY and may not be
            reproduced without written permission.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800 dark:text-[hsl(var(--foreground))] mb-3">
            5. Limitation of Liability
          </h2>
          <p>
            HADLY is not liable for any indirect, incidental, or consequential
            damages arising from the use of our products beyond the product's
            purchase value.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800 dark:text-[hsl(var(--foreground))] mb-3">
            6. Governing Law
          </h2>
          <p>
            These terms are governed by the laws of India. Any disputes shall be
            subject to the jurisdiction of courts in Bangalore, Karnataka.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800 dark:text-[hsl(var(--foreground))] mb-3">
            7. Contact
          </h2>
          <p>
            For any questions, contact us at{" "}
            <a
              href="mailto:info@hadly.live"
              className="text-[#1a3a2a] dark:text-emerald-300 font-medium"
            >
              info@hadly.live
            </a>{" "}
            or{" "}
            <a
              href="tel:+919019053878"
              className="text-[#1a3a2a] dark:text-emerald-300 font-medium"
            >
              +91 90190 53878
            </a>
            .
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