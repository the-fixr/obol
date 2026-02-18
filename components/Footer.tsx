import Link from "next/link";
import { MONADSCAN_URL, ADDRESSES } from "@/lib/contracts";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-4">
        {/* Internal pages */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-5 text-xs text-zinc-400">
            <Link href="/docs" className="hover:text-obol-gold transition-colors">
              Docs
            </Link>
            <Link href="/demo" className="hover:text-obol-gold transition-colors">
              Demo
            </Link>
            <Link href="/privacy" className="hover:text-obol-gold transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-obol-gold transition-colors">
              Terms
            </Link>
          </div>
          <p className="text-xs text-zinc-700 italic">
            For agents, not humans.
          </p>
        </div>

        {/* Contracts & external */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-600">
          <a
            href={`${MONADSCAN_URL}/address/${ADDRESSES.agentRegistry}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-400 transition-colors"
          >
            Registry
          </a>
          <a
            href={`${MONADSCAN_URL}/address/${ADDRESSES.agentLaunchpad}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-400 transition-colors"
          >
            Launchpad
          </a>
          <a
            href={`${MONADSCAN_URL}/address/${ADDRESSES.x402CurveRouter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-400 transition-colors"
          >
            Router
          </a>
          <a
            href="https://github.com/the-fixr/obol"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-400 transition-colors"
          >
            Source
          </a>
        </div>
      </div>
    </footer>
  );
}
