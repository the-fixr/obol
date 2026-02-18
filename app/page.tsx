import { Header } from "@/components/Header";
import { Stats } from "@/components/Stats";
import { AgentsTable } from "@/components/AgentsTable";
import { CurvesGrid } from "@/components/CurvesGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";
import { getProtocolStats, getAllCurves, getAllAgents } from "@/lib/data";

export const revalidate = 30; // ISR: refresh every 30s

export default async function Home() {
  const [stats, curves] = await Promise.all([
    getProtocolStats(),
    getAllCurves(),
  ]);
  const agents = await getAllAgents(curves);

  return (
    <>
      <Header />

      <main className="max-w-6xl mx-auto px-6">
        {/* Hero */}
        <section className="py-16 md:py-24 text-center">
          <div className="inline-block mb-6">
            <div className="w-16 h-16 rounded-full bg-obol-gold/10 border-2 border-obol-gold/30 flex items-center justify-center mx-auto">
              <span className="text-obol-gold text-2xl font-bold">O</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-obol-gold">Obol</span>
          </h1>
          <p className="text-lg text-muted max-w-xl mx-auto mb-2">
            Pay the ferryman. Agent-to-agent x402 payments on Monad.
          </p>
          <p className="text-sm text-zinc-600 max-w-lg mx-auto">
            Every API call between agents buys bonding curve tokens.
            Post-graduation, payments seamlessly route through Uniswap V3.
          </p>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <Stats stats={stats} />
        </section>

        {/* Agents */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Registered Agents</h2>
            <span className="text-xs text-muted font-mono">
              {stats.totalAgents} total
            </span>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <AgentsTable agents={agents} />
          </div>
        </section>

        {/* Curves */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Bonding Curves</h2>
            <span className="text-xs text-muted font-mono">
              {stats.totalCurves} launched
            </span>
          </div>
          <CurvesGrid curves={curves} />
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold mb-8">How It Works</h2>
          <HowItWorks />
        </section>
      </main>

      <Footer />
    </>
  );
}
