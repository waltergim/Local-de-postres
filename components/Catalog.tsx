"use client";

import { useMemo, useState } from "react";
import { categories, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { SearchIcon } from "@/components/icons";

export function Catalog() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = active === "all" || p.category === active;
      const matchesQuery = q === "" || p.name.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, active]);

  return (
    <section
      id="catalogo"
      className="scroll-mt-24 border-t border-line py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-medium uppercase tracking-[0.25em] text-muted">
            Productos
          </span>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
            Elegí tu postre y pedilo por WhatsApp
          </h2>
          <p className="mt-4 text-lg text-muted">
            Tocá &quot;Pedir por WhatsApp&quot; en cualquier producto y el mensaje
            se arma solo con tu elección.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-5">
          <label className="relative w-full max-w-md">
            <span className="sr-only">Buscar producto</span>
            <SearchIcon className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-faint" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar un postre..."
              className="w-full rounded-full border border-line bg-surface py-3.5 pl-13 pr-5 text-base text-ink outline-none transition placeholder:text-faint focus:border-ink/40"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            <FilterPill
              label="Todos"
              activeState={active === "all"}
              onClick={() => setActive("all")}
            />
            {categories.map((c) => (
              <FilterPill
                key={c.id}
                label={c.name}
                activeState={active === c.id}
                onClick={() => setActive(c.id)}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-12 text-lg text-muted">
            No encontramos productos con esa búsqueda.
          </p>
        ) : null}
      </div>
    </section>
  );
}

function FilterPill({
  label,
  activeState,
  onClick,
}: {
  label: string;
  activeState: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activeState}
      className={
        "rounded-full px-4 py-2 text-base font-medium transition " +
        (activeState
          ? "bg-ink text-paper"
          : "border border-line text-ink-soft hover:border-ink/30 hover:text-ink")
      }
    >
      {label}
    </button>
  );
}
