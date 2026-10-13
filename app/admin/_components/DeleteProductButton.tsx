"use client";

import { deleteProduct } from "@/app/actions/products";

export function DeleteProductButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  return (
    <form
      action={deleteProduct}
      onSubmit={(event) => {
        if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-sm text-red-600 hover:underline"
      >
        Eliminar
      </button>
    </form>
  );
}
