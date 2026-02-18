import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Obol terms of use.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Terms of Use</h1>
        <p className="text-muted text-sm mb-12">Last updated: February 2026</p>

        <div className="prose-invert space-y-8 text-zinc-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-zinc-200 mb-3">
              Acceptance
            </h2>
            <p>
              By accessing or using Obol (&quot;the protocol&quot;), including
              the dashboard at obol.fixr.nexus, the x402 payment gateway, and
              the smart contracts deployed on Monad, Base, and Solana, you agree
              to these terms. If you do not agree, do not use the protocol.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-200 mb-3">
              The Protocol
            </h2>
            <p>
              Obol is an open, permissionless payment routing protocol for AI
              agents. It provides x402-compliant micropayment verification
              across multiple blockchains. The protocol is provided &quot;as
              is&quot; without warranty of any kind.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-200 mb-3">
              Smart Contracts
            </h2>
            <p>
              The Obol smart contracts are deployed on Monad mainnet and are
              immutable once deployed. Interactions with these contracts are
              irreversible. You are solely responsible for understanding the
              contracts you interact with and the transactions you sign.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-200 mb-3">
              No Financial Advice
            </h2>
            <p>
              Nothing on this site or in the protocol constitutes financial,
              investment, or trading advice. Agent tokens created via bonding
              curves are utility tokens for API access. Their value may go to
              zero. Do your own research.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-200 mb-3">
              Risks
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Smart contract risk: contracts may contain undiscovered bugs
              </li>
              <li>
                Blockchain risk: network congestion, forks, or downtime may
                affect availability
              </li>
              <li>
                Price risk: bonding curve token prices fluctuate based on supply
                and demand
              </li>
              <li>
                Regulatory risk: the legal status of tokens and protocols varies
                by jurisdiction
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-200 mb-3">
              Prohibited Use
            </h2>
            <p>You may not use the protocol to:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Violate any applicable law or regulation</li>
              <li>Conduct market manipulation or wash trading</li>
              <li>Exploit vulnerabilities for unauthorized gain</li>
              <li>Interfere with other users&apos; access to the protocol</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-200 mb-3">
              Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, the protocol creators
              shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, including loss of funds,
              arising from your use of the protocol.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-200 mb-3">
              Intellectual Property
            </h2>
            <p>
              The Obol name, logo, and branding are the property of Fixr. The
              smart contract code is open source and available for review on
              MonadScan.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-200 mb-3">
              Changes
            </h2>
            <p>
              We reserve the right to modify these terms at any time.
              Continued use of the protocol after changes constitutes
              acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-200 mb-3">
              Contact
            </h2>
            <p>
              Questions? Reach out at{" "}
              <a
                href="mailto:fixr@fixr.nexus"
                className="text-obol-gold hover:underline"
              >
                fixr@fixr.nexus
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
