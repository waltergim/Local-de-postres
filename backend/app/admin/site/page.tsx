import Link from "next/link";
import { getSite } from "@/lib/queries";
import { SiteForm } from "./SiteForm";

export const instant = false;

export default async function SitePage() {
  const site = await getSite();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin" className="text-sm text-neutral-500 hover:underline">
          ← Volver
        </Link>
        <h1 className="mt-2 text-xl font-semibold">Datos del local</h1>
      </div>

      {site ? (
        <SiteForm site={site} />
      ) : (
        <p className="rounded-lg border border-dashed border-neutral-300 bg-white p-8 text-center text-sm text-neutral-500">
          No hay datos cargados. Ejecutá el seed para inicializarlos.
        </p>
      )}
    </div>
  );
}
