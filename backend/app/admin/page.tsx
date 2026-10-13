import Link from "next/link";
import Image from "next/image";
import { listProducts } from "@/lib/queries";
import { categoryName } from "@/lib/constants";
import { formatPrice } from "@/lib/money";
import { DeleteProductButton } from "./_components/DeleteProductButton";

export const instant = false;

export default async function AdminProductsPage() {
  const items = await listProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Productos</h1>
          <p className="text-sm text-neutral-500">
            {items.length} {items.length === 1 ? "producto" : "productos"}
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white"
        >
          Nuevo producto
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-neutral-300 bg-white p-8 text-center text-sm text-neutral-500">
          Todavía no hay productos. Creá el primero con “Nuevo producto”.
        </p>
      ) : (
        <ul className="divide-y divide-neutral-200 overflow-hidden rounded-lg border border-neutral-200 bg-white">
          {items.map((product) => (
            <li
              key={product.id}
              className="flex items-center gap-4 px-4 py-3"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                ) : null}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{product.name}</p>
                <p className="text-sm text-neutral-500">
                  {categoryName(product.category)} · #{product.sortOrder}
                  {!product.available && (
                    <span className="ml-2 rounded bg-neutral-200 px-1.5 py-0.5 text-xs text-neutral-600">
                      No disponible
                    </span>
                  )}
                </p>
              </div>

              <span className="whitespace-nowrap text-sm font-medium">
                {formatPrice(product.price)}
              </span>

              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/products/${product.id}`}
                  className="text-sm text-neutral-700 hover:underline"
                >
                  Editar
                </Link>
                <DeleteProductButton id={product.id} name={product.name} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
