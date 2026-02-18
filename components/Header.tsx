import { MONADSCAN_URL, ADDRESSES } from "@/lib/contracts";

export function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-obol-gold/20 border border-obol-gold/40 flex items-center justify-center">
            <span className="text-obol-gold font-bold text-sm">O</span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-zinc-50">
            Obol
          </span>
          <span className="text-xs text-muted font-mono bg-zinc-900 px-2 py-0.5 rounded">
            Monad
          </span>
        </div>
        <nav className="flex items-center gap-4 text-sm text-muted">
          <a
            href={`${MONADSCAN_URL}/address/${ADDRESSES.x402CurveRouter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-obol-gold transition-colors"
          >
            Contracts
          </a>
          <a
            href="https://github.com/the-fixr/obol"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-obol-gold transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
