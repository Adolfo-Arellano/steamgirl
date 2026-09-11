import type { PostCategory } from "../../types";
import { categoryMeta, categoryOrder } from "../../data/categories";

interface CategoryChipsProps {
  active: PostCategory | "todo";
  onChange: (value: PostCategory | "todo") => void;
}

const chipDot: Record<PostCategory, string> = {
  evento: "var(--color-cobalto)",
  oportunidad: "var(--color-coral)",
  recap: "#BA7517",
  investigacion: "var(--color-menta)",
};

export function CategoryChips({ active, onChange }: CategoryChipsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2.5 rounded-[20px] bg-white py-5 shadow-[0_12px_30px_rgba(8,10,29,0.06)]">
      <Chip
        label="Todo"
        dotColor="var(--color-techblack)"
        isActive={active === "todo"}
        onClick={() => onChange("todo")}
      />
      {categoryOrder.map((cat) => (
        <Chip
          key={cat}
          label={categoryMeta[cat].label + "s"}
          dotColor={chipDot[cat]}
          isActive={active === cat}
          onClick={() => onChange(cat)}
        />
      ))}
    </div>
  );
}

function Chip({
  label,
  dotColor,
  isActive,
  onClick,
}: {
  label: string;
  dotColor: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full border-[1.5px] px-5 py-2.5 text-[13.5px] font-bold transition-colors ${
        isActive
          ? "border-techblack bg-techblack text-white"
          : "border-gris-20 text-grafito hover:border-gris-50"
      }`}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: isActive ? "white" : dotColor }}
      />
      {label}
    </button>
  );
}
