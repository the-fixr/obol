import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ADDRESSES, MONADSCAN_URL } from "@/lib/contracts";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Integration guide for Obol x402 agent-to-agent payments on Base, Solana, and Monad.",
};

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-zinc-800/60 text-obol-gold px-1.5 py-0.5 rounded text-sm">
      {children}
    </code>
  );
}

export default function DocsPage() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Documentation</h1>
        <p className="text-muted mb-12">
          Integrate x402 payments into your agent in minutes. Pay per call on
          Base, Solana, or Monad.
        </p>

        {/* Quick Start */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-6" id="quickstart">
            Quick Start
          </h2>
          <p className="text-zinc-400 mb-4">
            Call any Fixr API endpoint. If you haven&apos;t paid, you&apos;ll
            get a <Code>402 Payment Required</Code> response with payment
            instructions. Pay on-chain, retry with proof, get your data.
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 font-mono text-sm leading-relaxed overflow-x-auto mb-4">
            <div className="text-zinc-500"># 1. Try the request (get 402)</div>
            <div className="text-zinc-300 mt-1">
              curl https://agent.fixr.nexus/api/v1/security/audit
            </div>
            <div className="text-zinc-500 mt-4">
              # 2. Pay on-chain (Base example)
            </div>
            <div className="text-zinc-500 mt-1">
              # Transfer 0.01 USDC to 0xBe2Cc...B5y on Base
            </div>
            <div className="text-zinc-500 mt-4">
              # 3. Retry with payment proof
            </div>
            <div className="text-zinc-300 mt-1">
              curl -H &quot;X-Payment-TxHash: 0x...&quot; \
            </div>
            <div className="text-zinc-300 pl-5">
              -H &quot;X-Payment-Chain: base&quot; \
            </div>
            <div className="text-zinc-300 pl-5">
              https://agent.fixr.nexus/api/v1/security/audit
            </div>
          </div>
        </section>

        {/* Payment Chains */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-6" id="chains">
            Payment Chains
          </h2>

          {/* Base */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <img
                src="/chains/base.svg"
                alt="Base"
                className="w-5 h-5"
              />
              Base (Chain ID 8453)
            </h3>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Token</span>
                <span className="font-mono text-zinc-300">
                  USDC (0x8335...2913)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Recipient</span>
                <span className="font-mono text-zinc-300">
                  0xBe2Cc...B5y
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Amount</span>
                <span className="font-mono text-obol-gold">
                  0.01 USDC (10000 units)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Header</span>
                <span className="font-mono text-zinc-300">
                  X-Payment-TxHash
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Verification</span>
                <span className="text-zinc-400">
                  USDC Transfer event in tx receipt
                </span>
              </div>
            </div>
          </div>

          {/* Solana */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <img
                src="/chains/solana.svg"
                alt="Solana"
                className="w-5 h-5"
              />
              Solana (Mainnet-Beta)
            </h3>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Mint</span>
                <span className="font-mono text-zinc-300">
                  EPjFWdd5...Dt1v
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Recipient</span>
                <span className="font-mono text-zinc-300">
                  96vRDB...EvuU
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Amount</span>
                <span className="font-mono text-obol-gold">
                  0.01 USDC (10000 units)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Header</span>
                <span className="font-mono text-zinc-300">
                  X-Payment-TxHash (signature)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Verification</span>
                <span className="text-zinc-400">
                  Token balance delta (pre/post)
                </span>
              </div>
            </div>
          </div>

          {/* Monad */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <img
                src="/chains/monad.svg"
                alt="Monad"
                className="w-5 h-5"
              />
              Monad / Obol (Chain ID 143)
            </h3>
            <p className="text-zinc-500 text-sm mb-3">
              Payments route through the Obol bonding curve. Every API call buys
              $FIXR tokens.
            </p>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Router</span>
                <a
                  href={`${MONADSCAN_URL}/address/${ADDRESSES.x402CurveRouter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-obol-gold hover:underline"
                >
                  {ADDRESSES.x402CurveRouter.slice(0, 10)}...
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Curve ID</span>
                <span className="font-mono text-zinc-300">0 (FIXR)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Token</span>
                <span className="font-mono text-zinc-300">
                  USDC (0x7547...0603)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Amount</span>
                <span className="font-mono text-obol-gold">
                  0.01 USDC (10000 units)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Header</span>
                <span className="font-mono text-zinc-300">
                  X-Payment-Nonce (bytes16 hex)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Verification</span>
                <span className="text-zinc-400">
                  verifyPayment(nonce) on-chain receipt
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Headers */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-6" id="headers">
            Request Headers
          </h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-left">
                  <th className="px-5 py-3 text-zinc-500 font-medium">
                    Header
                  </th>
                  <th className="px-5 py-3 text-zinc-500 font-medium">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                <tr>
                  <td className="px-5 py-3 font-mono text-zinc-300">
                    X-Payment-Chain
                  </td>
                  <td className="px-5 py-3 text-zinc-400">
                    <Code>base</Code> | <Code>solana</Code> |{" "}
                    <Code>monad</Code> (default: base)
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-mono text-zinc-300">
                    X-Payment-TxHash
                  </td>
                  <td className="px-5 py-3 text-zinc-400">
                    Transaction hash (Base) or signature (Solana)
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-mono text-zinc-300">
                    X-Payment-Nonce
                  </td>
                  <td className="px-5 py-3 text-zinc-400">
                    bytes16 hex nonce (Monad/Obol only)
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-mono text-zinc-300">
                    X-Wallet-Address
                  </td>
                  <td className="px-5 py-3 text-zinc-400">
                    EVM address for staking tier lookup (optional)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Monad Flow */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-6" id="obol-flow">
            Obol Payment Flow (Monad)
          </h2>
          <div className="space-y-4 text-sm text-zinc-400">
            <div className="flex gap-4 items-start">
              <span className="text-obol-gold font-mono font-bold shrink-0">
                1
              </span>
              <p>
                Agent calls{" "}
                <Code>payViaCurve(curveId, usdcAmount, nonce)</Code> on the
                X402CurveRouter contract. The nonce is a unique{" "}
                <Code>bytes16</Code> value chosen by the caller.
              </p>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-obol-gold font-mono font-bold shrink-0">
                2
              </span>
              <p>
                The router transfers USDC from the caller, buys tokens on the
                bonding curve, and stores a <Code>Receipt</Code> on-chain keyed
                by the nonce.
              </p>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-obol-gold font-mono font-bold shrink-0">
                3
              </span>
              <p>
                Agent retries the API call with{" "}
                <Code>X-Payment-Nonce: 0x...</Code> and{" "}
                <Code>X-Payment-Chain: monad</Code>.
              </p>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-obol-gold font-mono font-bold shrink-0">
                4
              </span>
              <p>
                The server calls <Code>verifyPayment(nonce)</Code> via{" "}
                <Code>eth_call</Code>, decodes the receipt struct, verifies the
                payer and amount, and grants access.
              </p>
            </div>
            <div className="flex gap-4 items-start">
              <span className="text-obol-gold font-mono font-bold shrink-0">
                5
              </span>
              <p>
                Post-graduation, the same flow seamlessly routes through
                Uniswap V3 instead of the bonding curve. No client-side changes
                needed.
              </p>
            </div>
          </div>
        </section>

        {/* Receipt Struct */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-6" id="receipt">
            Receipt Struct
          </h2>
          <p className="text-zinc-400 text-sm mb-4">
            The on-chain receipt returned by <Code>verifyPayment(nonce)</Code>:
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 font-mono text-sm leading-relaxed overflow-x-auto">
            <div className="text-zinc-500">
              {"// Solidity struct (ABI-encoded return)"}
            </div>
            <div className="text-zinc-300 mt-1">
              {"struct Receipt {"}
            </div>
            <div className="text-zinc-400 pl-4">
              address payer;
              <span className="text-zinc-600 ml-4">// Who paid</span>
            </div>
            <div className="text-zinc-400 pl-4">
              uint256 curveId;
              <span className="text-zinc-600 ml-4">// 0 = FIXR</span>
            </div>
            <div className="text-zinc-400 pl-4">
              uint256 usdcAmount;
              <span className="text-zinc-600 ml-4">// Payment amount</span>
            </div>
            <div className="text-zinc-400 pl-4">
              uint256 tokensReceived;
              <span className="text-zinc-600 ml-4">// Tokens bought</span>
            </div>
            <div className="text-zinc-400 pl-4">
              uint256 fee;
              <span className="text-zinc-600 ml-4">// Protocol fee</span>
            </div>
            <div className="text-zinc-400 pl-4">
              uint256 blockNumber;
              <span className="text-zinc-600 ml-4">// Timestamp</span>
            </div>
            <div className="text-zinc-400 pl-4">
              bool viaUniswap;
              <span className="text-zinc-600 ml-4">
                // Post-graduation flag
              </span>
            </div>
            <div className="text-zinc-300">{"}"}</div>
          </div>
        </section>

        {/* Staking Tiers */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-6" id="tiers">
            Staking Tiers
          </h2>
          <p className="text-zinc-400 text-sm mb-4">
            Alternatively, stake FIXR tokens on Base for persistent rate limits
            without per-call payments.
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-left">
                  <th className="px-5 py-3 text-zinc-500 font-medium">Tier</th>
                  <th className="px-5 py-3 text-zinc-500 font-medium">
                    Min Stake
                  </th>
                  <th className="px-5 py-3 text-zinc-500 font-medium">
                    Rate Limit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {[
                  { tier: "FREE", stake: "0", limit: "10/min" },
                  { tier: "BUILDER", stake: "1,000,000 FIXR", limit: "20/min" },
                  {
                    tier: "PRO",
                    stake: "10,000,000 FIXR",
                    limit: "50/min",
                  },
                  {
                    tier: "ELITE",
                    stake: "50,000,000 FIXR",
                    limit: "Unlimited",
                  },
                ].map((row) => (
                  <tr key={row.tier}>
                    <td className="px-5 py-3 font-mono text-obol-gold">
                      {row.tier}
                    </td>
                    <td className="px-5 py-3 font-mono text-zinc-300">
                      {row.stake}
                    </td>
                    <td className="px-5 py-3 text-zinc-400">{row.limit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Contracts */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-6" id="contracts">
            Contracts (Monad Mainnet)
          </h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-left">
                  <th className="px-5 py-3 text-zinc-500 font-medium">
                    Contract
                  </th>
                  <th className="px-5 py-3 text-zinc-500 font-medium">
                    Address
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {(
                  [
                    ["AgentRegistry", ADDRESSES.agentRegistry],
                    ["AgentLaunchpad", ADDRESSES.agentLaunchpad],
                    ["X402CurveRouter", ADDRESSES.x402CurveRouter],
                    ["$FIXR Token", ADDRESSES.fixrToken],
                  ] as const
                ).map(([name, addr]) => (
                  <tr key={name}>
                    <td className="px-5 py-3 text-zinc-300">{name}</td>
                    <td className="px-5 py-3">
                      <a
                        href={`${MONADSCAN_URL}/address/${addr}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-obol-gold hover:underline text-xs md:text-sm"
                      >
                        {addr}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-zinc-600 mt-3">
            All contracts verified on MonadScan via Etherscan v2 API.
          </p>
        </section>

        {/* Live Endpoint */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-6" id="try-it">
            Try It
          </h2>
          <p className="text-zinc-400 text-sm mb-4">
            Hit the payment info endpoint to see live chain options:
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 font-mono text-sm">
            <span className="text-zinc-300">
              curl https://agent.fixr.nexus/api/access/payment
            </span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
