import { client } from "./viem";
import {
  ADDRESSES,
  agentRegistryAbi,
  agentLaunchpadAbi,
  x402CurveRouterAbi,
} from "./contracts";
import { formatUnits, type Address, parseAbi } from "viem";

// --- Types ---

export type AgentData = {
  address: Address;
  name: string;
  endpointUrl: string;
  pricePerTask: string;
  status: number;
  totalTasks: number;
  totalEarned: string;
};

export type CurveData = {
  id: number;
  creator: Address;
  token: Address;
  tokenName: string;
  tokenSymbol: string;
  price: string;
  usdcReserve: string;
  tokensSold: string;
  totalSupply: string;
  graduationUsdc: string;
  graduationPct: number;
  graduated: boolean;
  feeBps: number;
  uniswapPool: Address;
};

export type ProtocolStats = {
  totalAgents: number;
  totalCurves: number;
  totalPayments: number;
  totalVolumeUsdc: string;
};

// --- ERC-20 minimal ABI for name/symbol ---

const erc20NameSymbolAbi = parseAbi([
  "function name() view returns (string)",
  "function symbol() view returns (string)",
]);

// --- Fetchers ---

export async function getProtocolStats(): Promise<ProtocolStats> {
  const [totalAgents, totalCurves, totalPayments, totalVolumeUsdc] =
    await Promise.all([
      client.readContract({
        address: ADDRESSES.agentRegistry,
        abi: agentRegistryAbi,
        functionName: "totalAgents",
      }),
      client.readContract({
        address: ADDRESSES.agentLaunchpad,
        abi: agentLaunchpadAbi,
        functionName: "totalCurves",
      }),
      client.readContract({
        address: ADDRESSES.x402CurveRouter,
        abi: x402CurveRouterAbi,
        functionName: "totalPayments",
      }),
      client.readContract({
        address: ADDRESSES.x402CurveRouter,
        abi: x402CurveRouterAbi,
        functionName: "totalVolumeUsdc",
      }),
    ]);

  return {
    totalAgents: Number(totalAgents),
    totalCurves: Number(totalCurves),
    totalPayments: Number(totalPayments),
    totalVolumeUsdc: formatUnits(totalVolumeUsdc, 6),
  };
}

export async function getAllCurves(): Promise<CurveData[]> {
  const totalCurves = await client.readContract({
    address: ADDRESSES.agentLaunchpad,
    abi: agentLaunchpadAbi,
    functionName: "totalCurves",
  });

  const n = Number(totalCurves);
  if (n === 0) return [];

  // Fetch all curves and prices in parallel
  const [curveResults, priceResults] = await Promise.all([
    Promise.all(
      Array.from({ length: n }, (_, i) =>
        client.readContract({
          address: ADDRESSES.agentLaunchpad,
          abi: agentLaunchpadAbi,
          functionName: "getCurve",
          args: [BigInt(i)],
        })
      )
    ),
    Promise.all(
      Array.from({ length: n }, (_, i) =>
        client.readContract({
          address: ADDRESSES.agentLaunchpad,
          abi: agentLaunchpadAbi,
          functionName: "getPrice",
          args: [BigInt(i)],
        })
      )
    ),
  ]);

  // Read token name/symbol directly from ERC-20 contracts
  const tokenMeta = await Promise.all(
    curveResults.map(async (curve) => {
      try {
        const [name, symbol] = await Promise.all([
          client.readContract({
            address: curve.token,
            abi: erc20NameSymbolAbi,
            functionName: "name",
          }),
          client.readContract({
            address: curve.token,
            abi: erc20NameSymbolAbi,
            functionName: "symbol",
          }),
        ]);
        return { name, symbol };
      } catch {
        return { name: "Unknown Token", symbol: "???" };
      }
    })
  );

  return curveResults.map((curve, i) => {
    const reserveNum = Number(curve.usdcReserve);
    const gradNum = Number(curve.graduationUsdc);

    return {
      id: i,
      creator: curve.creator,
      token: curve.token,
      tokenName: tokenMeta[i].name,
      tokenSymbol: tokenMeta[i].symbol,
      price: formatUnits(priceResults[i], 18),
      usdcReserve: formatUnits(curve.usdcReserve, 6),
      tokensSold: formatUnits(curve.tokensSold, 18),
      totalSupply: formatUnits(curve.totalSupply, 18),
      graduationUsdc: formatUnits(curve.graduationUsdc, 6),
      graduationPct: gradNum > 0 ? Math.min((reserveNum / gradNum) * 100, 100) : 0,
      graduated: curve.graduated,
      feeBps: Number(curve.feeBps),
      uniswapPool: curve.uniswapPool,
    };
  });
}

export async function getAllAgents(curves: CurveData[]): Promise<AgentData[]> {
  // Get unique creator addresses from curves
  const creatorAddresses = [...new Set(curves.map((c) => c.creator))];

  if (creatorAddresses.length === 0) return [];

  const agentResults = await Promise.all(
    creatorAddresses.map((addr) =>
      client.readContract({
        address: ADDRESSES.agentRegistry,
        abi: agentRegistryAbi,
        functionName: "getAgent",
        args: [addr],
      })
    )
  );

  return agentResults
    .map((agent, i) => ({
      address: creatorAddresses[i],
      name: agent.name,
      endpointUrl: agent.endpointUrl,
      pricePerTask: formatUnits(agent.pricePerTask, 6),
      status: Number(agent.status),
      totalTasks: Number(agent.totalTasks),
      totalEarned: formatUnits(agent.totalEarned, 6),
    }))
    .filter((a) => a.name !== "");
}

// --- Helpers ---

export function truncateAddress(addr: string): string {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function statusLabel(status: number): string {
  switch (status) {
    case 1: return "Active";
    case 2: return "Paused";
    case 3: return "Deregistered";
    default: return "Unknown";
  }
}

export function formatNumber(n: string | number): string {
  const num = typeof n === "string" ? parseFloat(n) : n;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(2)}K`;
  return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
}
