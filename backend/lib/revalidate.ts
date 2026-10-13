import "server-only";

export async function triggerSiteRevalidate(): Promise<void> {
  const base = process.env.PUBLIC_SITE_URL;
  const secret = process.env.REVALIDATE_SECRET;

  if (!base || !secret) return;

  try {
    await fetch(
      `${base.replace(/\/$/, "")}/api/revalidate?secret=${encodeURIComponent(secret)}`,
      { method: "POST", cache: "no-store" },
    );
  } catch {
    // No bloqueamos la acción del panel si el sitio público no responde.
  }
}
