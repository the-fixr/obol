import { type Abi } from "viem";

// --- Addresses (Monad Mainnet, Chain 143) ---

export const ADDRESSES = {
  agentRegistry: "0xACAf06fd443e9890AfCf5b5305605272E9759dc4" as const,
  agentLaunchpad: "0xeeFc3DdCbf23c682782581FB9d04B03DCA332d28" as const,
  x402CurveRouter: "0x873830D10E06b6BE85337B50D6b4b76E9f79Cf1F" as const,
  fixrToken: "0x50A0da08c4cf216e466d850Eb276B915769b9270" as const,
} as const;

export const MONAD_CHAIN_ID = 143;
export const MONADSCAN_URL = "https://monadscan.com";

// --- Minimal ABIs (read-only functions only) ---

export const agentRegistryAbi = [
  {
    type: "function",
    name: "totalAgents",
    inputs: [],
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAgent",
    inputs: [{ name: "agent", type: "address" }],
    outputs: [
      {
        type: "tuple",
        components: [
          { name: "name", type: "string" },
          { name: "endpointUrl", type: "string" },
          { name: "pricePerTask", type: "uint256" },
          { name: "status", type: "uint8" },
          { name: "registeredAt", type: "uint256" },
          { name: "totalTasks", type: "uint256" },
          { name: "totalEarned", type: "uint256" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isActive",
    inputs: [{ name: "agent", type: "address" }],
    outputs: [{ type: "bool" }],
    stateMutability: "view",
  },
] as const satisfies Abi;

export const agentLaunchpadAbi = [
  {
    type: "function",
    name: "totalCurves",
    inputs: [],
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCurve",
    inputs: [{ name: "curveId", type: "uint256" }],
    outputs: [
      {
        type: "tuple",
        components: [
          { name: "creator", type: "address" },
          { name: "token", type: "address" },
          { name: "totalSupply", type: "uint256" },
          { name: "virtualUsdc", type: "uint256" },
          { name: "k", type: "uint256" },
          { name: "usdcReserve", type: "uint256" },
          { name: "tokensSold", type: "uint256" },
          { name: "graduationUsdc", type: "uint256" },
          { name: "feeBps", type: "uint256" },
          { name: "accruedFees", type: "uint256" },
          { name: "graduated", type: "bool" },
          { name: "createdAt", type: "uint256" },
          { name: "creatorShareBps", type: "uint256" },
          { name: "uniswapPool", type: "address" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPrice",
    inputs: [{ name: "curveId", type: "uint256" }],
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
] as const satisfies Abi;

export const x402CurveRouterAbi = [
  {
    type: "function",
    name: "totalPayments",
    inputs: [],
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalVolumeUsdc",
    inputs: [],
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
] as const satisfies Abi;
