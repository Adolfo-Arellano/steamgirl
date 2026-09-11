export function timeAgo(isoDate: string): string {
  const now = new Date();
  const date = new Date(isoDate);
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "recién";
  if (diffMinutes < 60) return `hace ${diffMinutes} min`;
  if (diffHours < 24) return `hace ${diffHours} h`;
  if (diffDays === 1) return "hace 1 día";
  if (diffDays < 7) return `hace ${diffDays} días`;

  return date.toLocaleDateString("es-AR", { day: "numeric", month: "short" });
}

export function formatEventDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
  });
}
