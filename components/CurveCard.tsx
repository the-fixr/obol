import type { CurveData } from "@/lib/data";
import { truncateAddress, formatNumber } from "@/lib/data";
import { MONADSCAN_URL } from "@/lib/contracts";

export function CurveCard({ curve }: { curve: CurveData }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-obol-gold/30 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-zinc-50 font-semibold">{curve.tokenName}</h3>
          <span className="text-xs text-muted font-mono">${curve.tokenSymbol}</span>
        </div>
        {curve.graduated ? (
          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
            Graduated
          </span>
        ) : (
          <span className="text-xs px-2 py-0.5 rounded-full bg-obol-gold/10 text-obol-gold border border-obol-gold/20">
            Bonding Curve
          </span>
        )}
      </div>

      {/* Price */}
      <div className="mb-4">
        <p className="text-xs text-muted mb-1">Price per token</p>
        <p className="text-lg font-mono text-zinc-50">
          ${parseFloat(curve.price).toFixed(8)}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        <div>
          <p className="text-muted">USDC Reserve</p>
          <p className="text-zinc-300 font-mono">${formatNumber(curve.usdcReserve)}</p>
        </div>
        <div>
          <p className="text-muted">Tokens Sold</p>
          <p className="text-zinc-300 font-mono">{formatNumber(curve.tokensSold)}</p>
        </div>
        <div>
          <p className="text-muted">Fee</p>
          <p className="text-zinc-300 font-mono">{curve.feeBps / 100}%</p>
        </div>
        <div>
          <p className="text-muted">Creator</p>
          <a
            href={`${MONADSCAN_URL}/address/${curve.creator}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-300 font-mono hover:text-obol-gold transition-colors"
          >
            {truncateAddress(curve.creator)}
          </a>
        </div>
      </div>

      {/* Graduation progress */}
      {!curve.graduated && (
        <div>
          <div className="flex justify-between text-xs text-muted mb-1">
            <span>Graduation</span>
            <span>{curve.graduationPct.toFixed(1)}%</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-obol-gold rounded-full transition-all"
              style={{ width: `${curve.graduationPct}%` }}
            />
          </div>
          <p className="text-xs text-muted mt-1 font-mono">
            ${formatNumber(curve.usdcReserve)} / ${formatNumber(curve.graduationUsdc)}
          </p>
        </div>
      )}

      {/* Token address */}
      <div className="mt-4 pt-3 border-t border-zinc-800">
        <a
          href={`${MONADSCAN_URL}/token/${curve.token}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted font-mono hover:text-obol-gold transition-colors"
        >
          Token: {truncateAddress(curve.token)}
        </a>
      </div>
    </div>
  );
}
