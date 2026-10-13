import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-lg text-ink">{site.name}</p>
          <p className="mt-1 text-sm text-muted">{site.address}</p>
        </div>
        <p className="text-xs text-faint">
          © 2026 {site.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
