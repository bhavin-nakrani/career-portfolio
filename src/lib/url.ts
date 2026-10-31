/**
 * Prefix an internal path with the configured Astro `base`, so links and assets work
 * both on a project site (/career-portfolio/) and at a domain root.
 */
export function url(path = ""): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const clean = path.replace(/^\//, "");
  return `${base}/${clean}`;
}

/** Absolute URL on the production site, for canonical, Open Graph and JSON-LD. */
export function absoluteUrl(path: string, site: URL | undefined): string {
  return new URL(url(path), site ?? "http://localhost:4321").toString();
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2024-06" -> "Jun 2024"; null -> "Present". */
export function formatMonth(value: string | null): string {
  if (!value) return "Present";
  const [year, month] = value.split("-");
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

/** Human duration between two YYYY-MM values (end null = today). */
export function duration(start: string, end: string | null): string {
  const [sy, sm] = start.split("-").map(Number);
  const now = new Date();
  const [ey, em] = end ? end.split("-").map(Number) : [now.getFullYear(), now.getMonth() + 1];
  const months = (ey - sy) * 12 + (em - sm);
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y ? `${y} yr${y > 1 ? "s" : ""}` : "", m ? `${m} mo` : ""].filter(Boolean).join(" ") || "1 mo";
}
