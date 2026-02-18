"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

// --- Scene durations (ms) --- scene 8 = 0 means stays forever
const SCENE_DURATIONS = [8000, 6000, 8000, 9000, 11000, 8000, 7000, 0];

// --- Demo data ---
const DEMO_CHAINS = [
  {
    name: "Base",
    logo: "/chains/base.svg",
    color: "#3B82F6",
    header: "X-Payment-TxHash",
    value: "0x7a2f...e91c",
    flow: "USDC \u2192 Treasury",
    detail: "Direct transfer",
  },
  {
    name: "Solana",
    logo: "/chains/solana.svg",
    color: "#9945FF",
    header: "X-Payment-TxHash",
    value: "4Kx9...nPqR",
    flow: "USDC \u2192 Treasury",
    detail: "Direct transfer",
  },
  {
    name: "Monad",
    logo: "/chains/monad.svg",
    color: "#D4A853",
    header: "X-Payment-Nonce",
    value: "0xA1B2C3D4E5F6...",
    flow: "USDC \u2192 Curve \u2192 $FIXR",
    detail: "Buy pressure",
    special: true,
  },
];

const CURVE_POINTS = [
  { x: 0, y: 95 },
  { x: 8, y: 88 },
  { x: 16, y: 80 },
  { x: 24, y: 71 },
  { x: 32, y: 62 },
  { x: 40, y: 53 },
  { x: 48, y: 44 },
  { x: 56, y: 36 },
  { x: 64, y: 29 },
  { x: 72, y: 23 },
  { x: 80, y: 18 },
  { x: 88, y: 14 },
  { x: 96, y: 11 },
  { x: 100, y: 10 },
];

export default function Demo() {
  const [scene, setScene] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingRef = useRef(0);
  const [typingIdx, setTypingIdx] = useState(0);
  const [curveProgress, setCurveProgress] = useState(0);
  const router = useRouter();

  const TYPING_TEXT = `curl -H "X-Payment-Chain: monad" \\
     -H "X-Payment-Nonce: 0xA1B2C3D4..." \\
     https://agent.fixr.nexus/api/v1/security/audit`;

  // --- Auto-advance ---
  useEffect(() => {
    if (paused) return;
    const dur = SCENE_DURATIONS[scene];
    if (dur === 0) return;
    timerRef.current = setTimeout(() => setScene((s) => s + 1), dur);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [scene, paused]);

  // --- Typing animation for scene 2 ---
  useEffect(() => {
    if (scene !== 2) {
      typingRef.current = 0;
      setTypingIdx(0);
      return;
    }
    const iv = setInterval(() => {
      typingRef.current += 1;
      setTypingIdx(typingRef.current);
      if (typingRef.current >= TYPING_TEXT.length) clearInterval(iv);
    }, 40);
    return () => clearInterval(iv);
  }, [scene, TYPING_TEXT.length]);

  // --- Curve animation for scene 4 ---
  useEffect(() => {
    if (scene !== 4) {
      setCurveProgress(0);
      return;
    }
    let frame = 0;
    const total = 60;
    const iv = setInterval(() => {
      frame++;
      setCurveProgress(Math.min(frame / total, 1));
      if (frame >= total) clearInterval(iv);
    }, 16);
    return () => clearInterval(iv);
  }, [scene]);

  // --- Keyboard ---
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      switch (e.code) {
        case "Space":
          e.preventDefault();
          setPaused((p) => !p);
          break;
        case "ArrowRight":
          if (scene < SCENE_DURATIONS.length - 1) setScene((s) => s + 1);
          break;
        case "ArrowLeft":
          if (scene > 0) setScene((s) => s - 1);
          break;
        case "KeyR":
          setScene(0);
          setPaused(false);
          break;
        case "Escape":
          router.push("/");
          break;
      }
    },
    [scene, router]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#08090e] text-zinc-50 select-none">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInSlow {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scalePop {
          0% { opacity: 0; transform: scale(0.75); }
          70% { opacity: 1; transform: scale(1.06); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes goldGlow {
          0%, 100% { text-shadow: 0 0 24px rgba(212,168,83,0.5), 0 0 80px rgba(212,168,83,0.2); }
          50% { text-shadow: 0 0 48px rgba(212,168,83,0.7), 0 0 120px rgba(212,168,83,0.35); }
        }
        @keyframes cascadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(8px, -12px); }
          50% { transform: translate(-4px, -20px); }
          75% { transform: translate(-12px, -8px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes dotPop {
          0% { opacity: 0; r: 0; }
          60% { opacity: 1; r: 6; }
          100% { opacity: 1; r: 4; }
        }
        @keyframes coinDrop {
          0% { opacity: 0; transform: translateY(-20px) scale(0.5); }
          60% { opacity: 1; transform: translateY(4px) scale(1.1); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>

      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, #12110a 0%, #08090e 45%, #030408 100%)",
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${4 + (i % 4) * 2}px`,
            height: `${4 + (i % 4) * 2}px`,
            background: i % 3 === 0 ? "#D4A853" : "#4a4a5a",
            opacity: 0.2 + (i % 3) * 0.1,
            left: `${8 + i * 9}%`,
            top: `${12 + ((i * 17) % 70)}%`,
            animation: `float ${10 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}

      {/* Scene counter */}
      <div
        className="absolute top-6 left-6 z-20 font-mono text-sm text-zinc-500"
        style={{ animation: "fadeInSlow 1s ease-out" }}
      >
        {scene + 1}/{SCENE_DURATIONS.length}
      </div>

      {/* Pause indicator */}
      {paused && (
        <div className="absolute top-6 right-6 z-20 font-mono text-sm text-obol-gold tracking-widest">
          PAUSED
        </div>
      )}

      {/* === SCENES === */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {/* Scene 1: The Toll */}
        {scene === 0 && (
          <div className="text-center max-w-4xl px-8">
            <p
              className="text-3xl md:text-4xl lg:text-5xl font-light text-zinc-200 mb-8"
              style={{ animation: "fadeInUp 1s ease-out" }}
            >
              Agents call agents.
            </p>
            <p
              className="text-3xl md:text-4xl lg:text-5xl font-light text-zinc-200 mb-8"
              style={{ animation: "fadeInUp 1s ease-out 1.2s both" }}
            >
              Services cost money.
            </p>
            <p
              className="text-3xl md:text-4xl lg:text-5xl font-light text-zinc-400 mb-12"
              style={{ animation: "fadeInUp 1s ease-out 2.4s both" }}
            >
              API keys. OAuth. Invoices.
            </p>
            <p
              className="text-2xl md:text-3xl text-obol-gold font-medium"
              style={{ animation: "fadeInUp 1s ease-out 4s both" }}
            >
              What if the payment{" "}
              <span className="italic">was</span> the authentication?
            </p>
          </div>
        )}

        {/* Scene 2: 402 */}
        {scene === 1 && (
          <div className="text-center">
            <div
              style={{
                animation: "scalePop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              <span
                className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold leading-none"
                style={{
                  background:
                    "linear-gradient(135deg, #D4A853 0%, #E8C373 40%, #D4A853 60%, #8B7340 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "goldGlow 3s ease-in-out infinite",
                }}
              >
                402
              </span>
            </div>
            <p
              className="text-xl md:text-2xl text-zinc-400 font-mono tracking-widest mt-6"
              style={{ animation: "fadeInSlow 1s ease-out 0.6s both" }}
            >
              PAYMENT REQUIRED
            </p>
          </div>
        )}

        {/* Scene 3: The Call */}
        {scene === 2 && (
          <div className="w-full max-w-4xl px-8">
            <p
              className="text-base text-zinc-400 font-mono mb-5 tracking-wider"
              style={{ animation: "fadeInSlow 0.6s ease-out" }}
            >
              THE REQUEST
            </p>
            <div
              className="bg-[#111218] border border-zinc-700/60 rounded-2xl overflow-hidden shadow-2xl"
              style={{ animation: "fadeInUp 0.6s ease-out" }}
            >
              {/* Terminal chrome */}
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-zinc-700/40">
                <div className="w-3.5 h-3.5 rounded-full bg-red-500/70" />
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/70" />
                <div className="w-3.5 h-3.5 rounded-full bg-green-500/70" />
                <span className="ml-3 text-sm text-zinc-500 font-mono">
                  terminal
                </span>
              </div>
              <div className="p-8 font-mono text-base md:text-lg lg:text-xl leading-relaxed">
                <span className="text-obol-gold">$</span>{" "}
                <span className="text-zinc-200">
                  {TYPING_TEXT.slice(0, typingIdx)}
                </span>
                <span
                  className="inline-block w-3 h-6 bg-obol-gold ml-0.5 align-middle"
                  style={{ animation: "blink 1s step-end infinite" }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Scene 4: Three Chains */}
        {scene === 3 && (
          <div className="w-full max-w-5xl px-8">
            <p
              className="text-base md:text-lg text-zinc-400 font-mono mb-4 tracking-wider text-center"
              style={{ animation: "fadeInSlow 0.6s ease-out" }}
            >
              THREE CHAINS. ONE PROTOCOL.
            </p>
            <p
              className="text-center text-zinc-500 text-base mb-10"
              style={{ animation: "fadeInSlow 0.6s ease-out 0.3s both" }}
            >
              Choose your path to pay the ferryman
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DEMO_CHAINS.map((chain, i) => (
                <div
                  key={chain.name}
                  className="relative rounded-2xl border p-7"
                  style={{
                    animation: `cascadeIn 0.7s ease-out ${0.8 + i * 0.5}s both`,
                    borderColor: chain.special
                      ? "rgba(212,168,83,0.4)"
                      : "rgba(63,63,70,0.6)",
                    background: chain.special
                      ? "rgba(212,168,83,0.05)"
                      : "rgba(24,24,27,0.7)",
                  }}
                >
                  {chain.special && (
                    <div
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-mono tracking-widest px-4 py-1 rounded-full"
                      style={{
                        background: "rgba(212,168,83,0.15)",
                        color: "#D4A853",
                        border: "1px solid rgba(212,168,83,0.3)",
                      }}
                    >
                      THE OBOL WAY
                    </div>
                  )}
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden"
                      style={{
                        background: `${chain.color}18`,
                        border: `1px solid ${chain.color}35`,
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={chain.logo}
                        alt={chain.name}
                        className="w-9 h-9 object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-xl font-semibold text-zinc-50">
                        {chain.name}
                      </div>
                      <div className="text-sm text-zinc-500">{chain.detail}</div>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm font-mono">
                    <div className="flex justify-between text-zinc-400">
                      <span>Header</span>
                      <span className="text-zinc-300">{chain.header}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Value</span>
                      <span className="text-zinc-300">{chain.value}</span>
                    </div>
                    <div className="h-px bg-zinc-700/40 my-2" />
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Flow</span>
                      <span
                        className="font-semibold"
                        style={{ color: chain.special ? "#D4A853" : "#d4d4d8" }}
                      >
                        {chain.flow}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scene 5: The Curve */}
        {scene === 4 && (
          <div className="w-full max-w-4xl px-8">
            <p
              className="text-base text-zinc-400 font-mono mb-3 tracking-wider text-center"
              style={{ animation: "fadeInSlow 0.6s ease-out" }}
            >
              THE BONDING CURVE
            </p>
            <p
              className="text-center text-2xl md:text-3xl text-zinc-200 mb-3 font-light"
              style={{ animation: "fadeInUp 0.7s ease-out 0.3s both" }}
            >
              Every API call ={" "}
              <span className="text-obol-gold font-medium">buy pressure</span>
            </p>
            <p
              className="text-center text-base text-zinc-500 mb-10"
              style={{ animation: "fadeInSlow 0.7s ease-out 0.6s both" }}
            >
              USDC flows in. Agent tokens flow out. Price goes up.
            </p>

            {/* Curve visualization */}
            <div
              className="relative bg-[#111218] border border-zinc-700/50 rounded-2xl p-8 pb-10"
              style={{ animation: "fadeInUp 0.7s ease-out 1s both" }}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-sm font-mono text-zinc-400">
                  $FIXR / USDC
                </span>
                <span className="text-sm font-mono text-obol-gold">
                  Curve ID: 0
                </span>
              </div>

              <svg
                viewBox="0 0 110 105"
                className="w-full h-56 md:h-72"
                preserveAspectRatio="none"
              >
                {/* Grid lines */}
                {[20, 40, 60, 80].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="110"
                    y2={y}
                    stroke="#1e1e3a"
                    strokeWidth="0.3"
                  />
                ))}

                {/* Filled area under curve */}
                <path
                  d={`M0,100 ${CURVE_POINTS.slice(
                    0,
                    Math.max(1, Math.floor(curveProgress * CURVE_POINTS.length))
                  )
                    .map((p) => `L${p.x},${p.y}`)
                    .join(" ")} V100 Z`}
                  fill="url(#goldGrad)"
                  opacity="0.2"
                />

                {/* Curve line */}
                <polyline
                  points={CURVE_POINTS.slice(
                    0,
                    Math.max(1, Math.floor(curveProgress * CURVE_POINTS.length))
                  )
                    .map((p) => `${p.x},${p.y}`)
                    .join(" ")}
                  fill="none"
                  stroke="#D4A853"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* API call dots */}
                {[3, 6, 9, 12].map((idx, i) => {
                  const threshold = (idx + 1) / CURVE_POINTS.length;
                  if (curveProgress < threshold) return null;
                  const p = CURVE_POINTS[idx];
                  return (
                    <g key={i}>
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="4"
                        fill="#D4A853"
                        style={{
                          animation: `dotPop 0.4s ease-out ${1.5 + i * 0.8}s both`,
                        }}
                      />
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="4"
                        fill="none"
                        stroke="#D4A853"
                        strokeWidth="0.6"
                        opacity="0.5"
                        style={{
                          animation: `pulseRing 1.5s ease-out ${1.7 + i * 0.8}s infinite`,
                          transformOrigin: `${p.x}px ${p.y}px`,
                        }}
                      />
                    </g>
                  );
                })}

                {/* Gradient def */}
                <defs>
                  <linearGradient
                    id="goldGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#D4A853" />
                    <stop offset="100%" stopColor="#D4A853" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Axes */}
                <line
                  x1="0"
                  y1="100"
                  x2="110"
                  y2="100"
                  stroke="#3f3f46"
                  strokeWidth="0.5"
                />
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100"
                  stroke="#3f3f46"
                  strokeWidth="0.5"
                />
              </svg>

              {/* Labels */}
              <div className="flex justify-between mt-3 text-xs font-mono text-zinc-500">
                <span>Tokens Sold</span>
                <span>{"\u2192 Graduation"}</span>
              </div>

              {/* Animated call indicators */}
              <div className="flex items-center justify-center gap-8 mt-8">
                {["Call 1", "Call 2", "Call 3", "Call 4"].map((label, i) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2"
                    style={{
                      animation: `coinDrop 0.5s ease-out ${3 + i * 1.2}s both`,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        background: "rgba(212,168,83,0.15)",
                        color: "#D4A853",
                        border: "1px solid rgba(212,168,83,0.3)",
                      }}
                    >
                      $
                    </div>
                    <span className="text-xs font-mono text-zinc-500">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Scene 6: 200 OK */}
        {scene === 5 && (
          <div className="w-full max-w-3xl px-8">
            <div
              className="text-center mb-8"
              style={{ animation: "scalePop 0.6s ease-out" }}
            >
              <span
                className="text-7xl md:text-8xl font-bold"
                style={{ color: "#10B981" }}
              >
                200
              </span>
              <span className="text-3xl md:text-4xl text-zinc-400 font-light ml-4">
                OK
              </span>
            </div>
            <p
              className="text-center text-zinc-400 text-lg mb-10"
              style={{ animation: "fadeInSlow 0.5s ease-out 0.4s both" }}
            >
              Access granted. Tokens acquired. Curve advanced.
            </p>

            <div
              className="bg-[#111218] border border-zinc-700/50 rounded-2xl overflow-hidden shadow-2xl"
              style={{ animation: "fadeInUp 0.6s ease-out 0.8s both" }}
            >
              <div className="px-6 py-4 border-b border-zinc-700/40 flex items-center justify-between">
                <span className="text-sm font-mono text-emerald-400">
                  HTTP/1.1 200 OK
                </span>
                <span className="text-sm font-mono text-zinc-500">
                  application/json
                </span>
              </div>
              <div className="p-7 space-y-4 font-mono text-base md:text-lg">
                {[
                  { k: "success", v: "true", color: "#10B981", delay: 1.2 },
                  {
                    k: "tier",
                    v: '"ELITE"',
                    color: "#D4A853",
                    delay: 1.6,
                  },
                  {
                    k: "paidVia",
                    v: '"obol/monad"',
                    color: "#D4A853",
                    delay: 2.0,
                  },
                  {
                    k: "tokensReceived",
                    v: '"142,857.14 FIXR"',
                    color: "#E8C373",
                    delay: 2.4,
                  },
                  {
                    k: "newCurvePrice",
                    v: '"$0.000073"',
                    color: "#E8C373",
                    delay: 2.8,
                  },
                  {
                    k: "data",
                    v: "{ ... }",
                    color: "#a1a1aa",
                    delay: 3.2,
                  },
                ].map((field) => (
                  <div
                    key={field.k}
                    className="flex gap-4"
                    style={{
                      animation: `slideRight 0.5s ease-out ${field.delay}s both`,
                    }}
                  >
                    <span className="text-zinc-400">
                      &quot;{field.k}&quot;:
                    </span>
                    <span style={{ color: field.color }}>{field.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Scene 7: The Numbers */}
        {scene === 6 && (
          <div className="w-full max-w-4xl px-8">
            <p
              className="text-center text-base md:text-lg text-zinc-400 font-mono tracking-wider mb-12"
              style={{ animation: "fadeInSlow 0.5s ease-out" }}
            >
              BY THE NUMBERS
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                {
                  value: "3",
                  label: "Chains",
                  sub: "Base \u00B7 Solana \u00B7 Monad",
                },
                { value: "$0.01", label: "Per Call", sub: "USDC, any chain" },
                {
                  value: "0",
                  label: "API Keys",
                  sub: "Payment is the key",
                },
                {
                  value: "\u221E",
                  label: "Agents",
                  sub: "Permissionless",
                },
                {
                  value: "1",
                  label: "Curve",
                  sub: "Every call buys $FIXR",
                },
                {
                  value: "402",
                  label: "Protocol",
                  sub: "HTTP-native payments",
                },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="text-center py-7 px-5 rounded-2xl border border-zinc-700/50 bg-[#111218]/70"
                  style={{
                    animation: `scalePop 0.5s ease-out ${0.5 + i * 0.2}s both`,
                  }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-obol-gold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-base md:text-lg text-zinc-200 font-medium">
                    {stat.label}
                  </div>
                  <div className="text-sm text-zinc-500 mt-1">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scene 8: Pay the Ferryman */}
        {scene === 7 && (
          <div className="text-center max-w-2xl px-8">
            {/* Logo */}
            <div
              className="relative inline-block mb-10"
              style={{ animation: "scalePop 0.8s ease-out" }}
            >
              <div
                className="absolute inset-0 rounded-full blur-3xl"
                style={{ background: "rgba(212,168,83,0.2)" }}
              />
              <div
                className="relative w-28 h-28 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(212,168,83,0.08)",
                  border: "2px solid rgba(212,168,83,0.35)",
                }}
              >
                <span
                  className="text-5xl font-bold"
                  style={{ color: "#D4A853" }}
                >
                  O
                </span>
              </div>
            </div>

            {/* Title */}
            <h1
              className="text-6xl md:text-8xl font-bold mb-5"
              style={{
                animation: "fadeInUp 0.8s ease-out 0.4s both",
                background:
                  "linear-gradient(135deg, #D4A853 0%, #E8C373 50%, #D4A853 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Obol
            </h1>

            <p
              className="text-xl md:text-2xl text-zinc-300 mb-3"
              style={{ animation: "fadeInSlow 0.8s ease-out 0.8s both" }}
            >
              Pay the ferryman.
            </p>
            <p
              className="text-base md:text-lg text-zinc-500 mb-12"
              style={{ animation: "fadeInSlow 0.8s ease-out 1.2s both" }}
            >
              Agent-to-agent x402 payments on Monad.
            </p>

            {/* CTAs */}
            <div
              className="flex items-center justify-center gap-5"
              style={{ animation: "fadeInUp 0.6s ease-out 1.6s both" }}
            >
              <a
                href="/"
                className="px-8 py-3 rounded-xl text-base font-medium transition-all"
                style={{
                  background: "rgba(212,168,83,0.12)",
                  color: "#D4A853",
                  border: "1px solid rgba(212,168,83,0.35)",
                }}
              >
                {"Dashboard \u2192"}
              </a>
              <a
                href="https://agent.fixr.nexus/api/access/payment"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-xl text-base font-medium text-zinc-300 border border-zinc-700 hover:border-zinc-600 transition-colors"
              >
                API Docs
              </a>
            </div>

            {/* Credit */}
            <p
              className="text-sm text-zinc-600 mt-14 font-mono"
              style={{ animation: "fadeInSlow 1s ease-out 2.2s both" }}
            >
              Built by{" "}
              <a
                href="https://fixr.nexus"
                className="text-zinc-500 hover:text-obol-gold transition-colors"
              >
                Fixr
              </a>
            </p>
          </div>
        )}
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {SCENE_DURATIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => setScene(i)}
            className="w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{
              background: i === scene ? "#D4A853" : "#3f3f46",
              boxShadow:
                i === scene
                  ? "0 0 10px rgba(212,168,83,0.6)"
                  : "none",
              transform: i === scene ? "scale(1.4)" : "scale(1)",
            }}
          />
        ))}
      </div>

      {/* Controls hint */}
      <div
        className="absolute bottom-8 right-8 z-20 text-xs font-mono text-zinc-500 text-right leading-relaxed"
        style={{ animation: "fadeInSlow 1s ease-out 2s both" }}
      >
        <span className="text-zinc-400">Space</span> pause{" "}
        <span className="text-zinc-400 ml-2">{"\u2190\u2192"}</span> navigate{" "}
        <span className="text-zinc-400 ml-2">R</span> restart{" "}
        <span className="text-zinc-400 ml-2">Esc</span> exit
      </div>
    </div>
  );
}
