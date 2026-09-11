import type { ReactNode } from "react";
import { ArrowUpRight, AlertCircle } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: ReactNode;
  trend?: string;
  trendTone?: "positive" | "neutral" | "warning";
}

export function MetricCard({
  label,
  value,
  trend,
  trendTone = "positive",
}: MetricCardProps) {
  const trendColor =
    trendTone === "positive"
      ? "text-[#0F6E56]"
      : trendTone === "warning"
        ? "text-[#854F0B]"
        : "text-gris-50";

  return (
    <div className="rounded-2xl border border-gris-20 bg-white p-5">
      <span className="font-mono text-[12.5px] text-gris-50">{label}</span>
      <b className="mt-2 block font-display text-[28px] font-extrabold">
        {value}
      </b>
      {trend && (
        <div
          className={`mt-1 flex items-center gap-1 text-xs font-semibold ${trendColor}`}
        >
          {trendTone === "warning" ? (
            <AlertCircle size={13} />
          ) : (
            <ArrowUpRight size={13} />
          )}
          {trend}
        </div>
      )}
    </div>
  );
}
