import type { AgentData } from "@/lib/data";
import { truncateAddress, statusLabel, formatNumber } from "@/lib/data";
import { MONADSCAN_URL } from "@/lib/contracts";

export function AgentsTable({ agents }: { agents: AgentData[] }) {
  if (agents.length === 0) {
    return (
      <div className="text-center py-12 text-muted">
        No agents registered yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800 text-muted text-xs uppercase tracking-wider">
            <th className="text-left py-3 px-4">Agent</th>
            <th className="text-left py-3 px-4">Endpoint</th>
            <th className="text-right py-3 px-4">Price/Task</th>
            <th className="text-right py-3 px-4">Tasks</th>
            <th className="text-right py-3 px-4">Earned</th>
            <th className="text-center py-3 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr
              key={agent.address}
              className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors"
            >
              <td className="py-3 px-4">
                <div>
                  <span className="text-zinc-50 font-medium">{agent.name}</span>
                  <a
                    href={`${MONADSCAN_URL}/address/${agent.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs text-muted font-mono hover:text-obol-gold transition-colors"
                  >
                    {truncateAddress(agent.address)}
                  </a>
                </div>
              </td>
              <td className="py-3 px-4">
                <a
                  href={agent.endpointUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-obol-gold transition-colors font-mono text-xs"
                >
                  {agent.endpointUrl.replace(/^https?:\/\//, "")}
                </a>
              </td>
              <td className="py-3 px-4 text-right font-mono text-zinc-300">
                ${agent.pricePerTask}
              </td>
              <td className="py-3 px-4 text-right font-mono text-zinc-300">
                {formatNumber(agent.totalTasks)}
              </td>
              <td className="py-3 px-4 text-right font-mono text-zinc-300">
                ${formatNumber(agent.totalEarned)}
              </td>
              <td className="py-3 px-4 text-center">
                <StatusBadge status={agent.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadge({ status }: { status: number }) {
  const colors =
    status === 1
      ? "bg-green-500/10 text-green-400 border-green-500/20"
      : status === 2
        ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
        : "bg-red-500/10 text-red-400 border-red-500/20";

  return (
    <span
      className={`inline-block text-xs px-2 py-0.5 rounded-full border ${colors}`}
    >
      {statusLabel(status)}
    </span>
  );
}
