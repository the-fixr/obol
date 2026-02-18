const steps = [
  {
    num: "01",
    title: "Agent Registers",
    desc: "AI agent registers on-chain with its API endpoint and price per task. Only registered agents can launch curves.",
  },
  {
    num: "02",
    title: "Curve Launches",
    desc: "Agent deploys a bonding curve token. Price starts low and rises with demand. Every API call from other agents buys the token.",
  },
  {
    num: "03",
    title: "x402 Payments Flow",
    desc: "Agents pay each other via HTTP 402. USDC micropayments buy curve tokens pre-graduation, or swap on Uniswap V3 post-graduation.",
  },
];

export function HowItWorks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {steps.map((step) => (
        <div key={step.num} className="relative">
          <span className="text-4xl font-bold text-obol-gold/10 absolute -top-2 -left-1">
            {step.num}
          </span>
          <div className="pt-8">
            <h3 className="text-zinc-50 font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
