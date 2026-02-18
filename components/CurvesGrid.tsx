import type { CurveData } from "@/lib/data";
import { CurveCard } from "./CurveCard";

export function CurvesGrid({ curves }: { curves: CurveData[] }) {
  if (curves.length === 0) {
    return (
      <div className="text-center py-12 text-muted">
        No curves launched yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {curves.map((curve) => (
        <CurveCard key={curve.id} curve={curve} />
      ))}
    </div>
  );
}
