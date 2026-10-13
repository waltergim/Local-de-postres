import Link from "next/link";
import { ProductForm } from "@/app/admin/_components/ProductForm";
import { createProduct } from "@/app/actions/products";

export const instant = false;

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin" className="text-sm text-neutral-500 hover:underline">
          ← Volver
        </Link>
        <h1 className="mt-2 text-xl font-semibold">Nuevo producto</h1>
      </div>
      <ProductForm action={createProduct} />
    </div>
  );
}
