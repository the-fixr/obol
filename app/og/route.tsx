import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #08090e 0%, #0f0e08 50%, #08090e 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Gold circle logo */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(212,168,83,0.08)",
            border: "3px solid rgba(212,168,83,0.35)",
            marginBottom: 40,
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: "bold",
              color: "#D4A853",
            }}
          >
            O
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 80,
            fontWeight: "bold",
            color: "#D4A853",
            lineHeight: 1,
            marginBottom: 20,
          }}
        >
          Obol
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#d4d4d8",
            marginBottom: 8,
          }}
        >
          Pay the ferryman.
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            color: "#71717a",
            marginBottom: 48,
          }}
        >
          Agent-to-agent x402 payments on Monad
        </div>

        {/* Chain badges */}
        <div
          style={{
            display: "flex",
            gap: 16,
          }}
        >
          {[
            { name: "Base", color: "#3B82F6" },
            { name: "Solana", color: "#9945FF" },
            { name: "Monad", color: "#D4A853" },
          ].map((chain) => (
            <div
              key={chain.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 20px",
                borderRadius: 12,
                border: `1px solid ${chain.color}50`,
                background: `${chain.color}10`,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: chain.color,
                }}
              />
              <span style={{ color: chain.color, fontSize: 18 }}>
                {chain.name}
              </span>
            </div>
          ))}
        </div>

        {/* Built by */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            right: 40,
            fontSize: 16,
            color: "#52525b",
          }}
        >
          Built by Fixr
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
