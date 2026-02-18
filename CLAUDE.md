# Obol — Agent-to-Agent x402 Payments on Monad

## Overview

Obol is an agent-to-agent payment protocol built on Monad (chain ID 143). Every API call between agents is routed through a bonding curve — paying for a service also buys the agent's token, creating continuous buy pressure.

The name comes from the Greek coin placed in the mouths of the dead to pay Charon, the ferryman, for passage across the river Styx. "Pay the ferryman."

## URLs

- **Dashboard**: https://obol.fixr.nexus
- **Demo**: https://obol.fixr.nexus/demo
- **Vercel Team**: fixr-55f3551c/obol

## Stack

- Next.js 15, React 19, Tailwind 3.4, TypeScript
- viem for Monad RPC reads
- Vercel hosting (Node 20.x — 24.x NOT supported)
- ISR with 30s revalidation on main page

## Contracts (Monad Mainnet, Chain 143)

| Contract | Address |
|----------|---------|
| AgentRegistry | `0xACAf06fd443e9890AfCf5b5305605272E9759dc4` |
| AgentLaunchpad | `0xeeFc3DdCbf23c682782581FB9d04B03DCA332d28` |
| X402CurveRouter | `0x873830D10E06b6BE85337B50D6b4b76E9f79Cf1F` |
| $FIXR Token | `0x50A0da08c4cf216e466d850Eb276B915769b9270` |
| USDC (Monad) | `0x754704Bc059F8C67012fEd69BC8A327a5aafb603` |
| Deployer/Admin | `0xBe2Cc1861341F3b058A3307385BEBa84167b3fa4` |

All contracts verified on MonadScan via Etherscan v2 API (`api.etherscan.io/v2/api?chainid=143`).

## Architecture

```
lib/
  contracts.ts  — Addresses + minimal read-only ABIs
  viem.ts       — Monad chain definition + public client
  data.ts       — Server-side data fetching (stats, curves, agents)
components/     — Header, Stats, AgentsTable, CurveCard, CurvesGrid, HowItWorks, Footer
app/
  page.tsx      — Main dashboard (ISR, server component)
  layout.tsx    — Root layout with full SEO metadata
  demo/page.tsx — 8-scene cinematic x402 explainer
  og/route.tsx  — Dynamic OG image (Edge runtime)
  robots.ts     — robots.txt
  sitemap.ts    — sitemap.xml
```

## Key Design Decisions

- **No events/logs**: Monad RPC limits `eth_getLogs` to 100 block range. All data is read via `readContract` calls — iterate curves by ID, read ERC-20 name/symbol directly.
- **No wallet connection**: Dashboard is read-only. No write operations from the frontend.
- **Three x402 chains**: Fixr's API accepts payments on Base (tx hash), Solana (tx signature), and Monad (Obol nonce). Monad is the only chain where payments route through a bonding curve.

## Gotchas

- `tsconfig.json` target must be `ES2020` (not ES2017) for BigInt literal support
- Always use `vercel build --prod && vercel deploy --prebuilt --prod` (not raw `next build`)
- Node 24.x fails on Vercel — `engines.node` is pinned to `20.x`
- MonadScan verification uses Etherscan v2: `api.etherscan.io/v2/api?chainid=143` with MonadScan API key

## Theme

- Background: `#09090b`
- Gold accent: `#D4A853` (obol-gold)
- Gold light: `#E8C373`, Gold dim: `#8B7340`
- Surface: `#18181b`, Border: `#27272a`, Muted: `#71717a`
- Fonts: Geist (sans) + Geist Mono

## Deployment

```bash
cd /Users/chadneal/Desktop/obol
vercel build --prod && vercel deploy --prebuilt --prod
```

## Related

- **Foundry contracts**: `/Users/chadneal/Desktop/x402-monad/`
- **Fixr worker** (x402 middleware): `/Users/chadneal/Desktop/fixr-agent/workers/src/lib/publicApi.ts`
- **Fixr agent**: https://agent.fixr.nexus
