import type { ProtocolStats } from "@/lib/data";
import { formatNumber } from "@/lib/data";

const statCards = [
  { key: "totalAgents" as const, label: "Registered Agents", prefix: "" },
  { key: "totalCurves" as const, label: "Active Curves", prefix: "" },
  { key: "totalPayments" as const, label: "x402 Payments", prefix: "" },
  { key: "totalVolumeUsdc" as const, label: "Total Volume", prefix: "$" },
];

export function Stats({ stats }: { stats: ProtocolStats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map(({ key, label, prefix }) => (
        <div
          key={key}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
        >
          <p className="text-xs text-muted uppercase tracking-wider mb-1">
            {label}
          </p>
          <p className="text-2xl font-semibold text-zinc-50">
            {prefix}
            {formatNumber(stats[key])}
          </p>
        </div>
      ))}
    </div>
  );
}
