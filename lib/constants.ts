export const CATEGORIES = [
  { id: "clasicos", name: "Postres Clásicos" },
  { id: "bocados", name: "Bocados Dulces" },
  { id: "batidos", name: "Batidos y Gelatinas" },
  { id: "frutas", name: "Frutas y Cremas" },
  { id: "promos", name: "Promos para Compartir" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export const CATEGORY_IDS = CATEGORIES.map((c) => c.id);

export function categoryName(id: string): string {
  return CATEGORIES.find((c) => c.id === id)?.name ?? id;
}
