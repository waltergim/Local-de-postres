"use client";

import { useActionState } from "react";
import Image from "next/image";
import { CATEGORIES } from "@/lib/constants";
import type { Product } from "@/lib/db/schema";
import type { ProductFormState } from "@/app/actions/products";

type FormAction = (
  prev: ProductFormState,
  formData: FormData,
) => Promise<ProductFormState>;

const inputClass =
  "w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-900";

export function ProductForm({
  action,
  product,
}: {
  action: FormAction;
  product?: Product;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div className="space-y-1.5">
        <label htmlFor="name" className="block text-sm font-medium">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={product?.name ?? ""}
          className={inputClass}
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name[0]}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="price" className="block text-sm font-medium">
            Precio (ARS)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min={0}
            step={1}
            required
            defaultValue={product?.price ?? ""}
            className={inputClass}
          />
          {errors.price && (
            <p className="text-sm text-red-600">{errors.price[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="category" className="block text-sm font-medium">
            Categoría
          </label>
          <select
            id="category"
            name="category"
            defaultValue={product?.category ?? CATEGORIES[0].id}
            className={inputClass}
          >
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-sm text-red-600">{errors.category[0]}</p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="description" className="block text-sm font-medium">
          Descripción <span className="text-neutral-400">(opcional)</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={product?.description ?? ""}
          className={inputClass}
        />
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <span className="block text-sm font-medium">Foto</span>
        {product?.image && (
          <div className="relative h-32 w-32 overflow-hidden rounded-md border border-neutral-200">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>
        )}
        <input
          name="image"
          type="file"
          accept="image/*"
          className="block text-sm"
        />
        <input type="hidden" name="imageUrl" value={product?.image ?? ""} />
        <p className="text-xs text-neutral-500">
          Subí una foto para reemplazar la actual. Si no elegís ninguna, se
          mantiene la existente.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="sortOrder" className="block text-sm font-medium">
            Orden
          </label>
          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            step={1}
            defaultValue={product?.sortOrder ?? 0}
            className={inputClass}
          />
        </div>

        <label className="flex items-end gap-2 pb-2 text-sm font-medium">
          <input
            type="checkbox"
            name="available"
            defaultChecked={product?.available ?? true}
            className="h-4 w-4"
          />
          Disponible
        </label>
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {pending ? "Guardando…" : "Guardar"}
      </button>
    </form>
  );
}
