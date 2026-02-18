import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Obol privacy policy.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted text-sm mb-12">Last updated: February 2026</p>

        <div className="prose-invert space-y-8 text-zinc-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-zinc-200 mb-3">
              Overview
            </h2>
            <p>
              Obol (&quot;we&quot;, &quot;us&quot;, &quot;the protocol&quot;) is
              an agent-to-agent payment protocol built on public blockchains. We
              believe in transparency by default. This policy explains what data
              we collect, how we use it, and your rights.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-200 mb-3">
              What We Collect
            </h2>
            <p className="mb-3">
              <strong className="text-zinc-300">On-chain data:</strong> All
              transactions on Base, Solana, and Monad are publicly visible on
              their respective blockchains. We read this data to verify payments
              but do not store personal information derived from it.
            </p>
            <p className="mb-3">
              <strong className="text-zinc-300">API requests:</strong> When you
              interact with our x402 gateway, we temporarily store payment
              proofs (transaction hashes, signatures, nonces) in Cloudflare KV
              for replay protection. These are automatically deleted after 30
              days.
            </p>
            <p className="mb-3">
              <strong className="text-zinc-300">Analytics:</strong> We use
              Vercel Analytics for basic page view metrics. No cookies are used
              for tracking. No personal data is collected.
            </p>
            <p>
              <strong className="text-zinc-300">
                Wallet addresses:
              </strong>{" "}
              If you provide an <code>X-Wallet-Address</code> header, it is used
              solely for staking tier lookup and is not stored beyond the request
              lifecycle.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-200 mb-3">
              What We Don&apos;t Collect
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>No personal identifying information (name, email, phone)</li>
              <li>No cookies or browser fingerprinting</li>
              <li>No IP address logging beyond standard CDN operations</li>
              <li>No third-party advertising trackers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-200 mb-3">
              Data Retention
            </h2>
            <p>
              Payment proof data (tx hashes, nonces) is stored for 30 days in
              Cloudflare KV for replay protection, then automatically purged. No
              permanent database of user activity is maintained.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-200 mb-3">
              Third-Party Services
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong className="text-zinc-300">Cloudflare:</strong> CDN and
                Workers runtime
              </li>
              <li>
                <strong className="text-zinc-300">Vercel:</strong> Frontend
                hosting
              </li>
              <li>
                <strong className="text-zinc-300">
                  Public RPC providers:
                </strong>{" "}
                Base, Solana, and Monad RPC endpoints for on-chain reads
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-200 mb-3">
              Your Rights
            </h2>
            <p>
              Since we don&apos;t collect personal data, there is generally
              nothing to delete or export. If you have questions about data
              associated with a specific wallet address, contact us at{" "}
              <a
                href="mailto:fixr@fixr.nexus"
                className="text-obol-gold hover:underline"
              >
                fixr@fixr.nexus
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-200 mb-3">
              Changes
            </h2>
            <p>
              We may update this policy as the protocol evolves. Changes will be
              reflected on this page with an updated date.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
