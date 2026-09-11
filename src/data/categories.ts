import type { CategoryMeta, PostCategory } from "../types";

export const categoryMeta: Record<PostCategory, CategoryMeta> = {
  investigacion: {
    id: "investigacion",
    label: "Investigación",
    colorVar: "#0c447c",
    bgVar: "#e6f1fb",
  },
  oportunidad: {
    id: "oportunidad",
    label: "Oportunidad",
    colorVar: "#993556",
    bgVar: "#ffdbed",
  },
  evento: {
    id: "evento",
    label: "Evento",
    colorVar: "#0c447c",
    bgVar: "#e6f1fb",
  },
  recap: {
    id: "recap",
    label: "Recap",
    colorVar: "#633806",
    bgVar: "#faeeda",
  },
};

export const categoryOrder: PostCategory[] = [
  "evento",
  "oportunidad",
  "recap",
  "investigacion",
];
