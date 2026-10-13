import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/queries";
import { ProductForm } from "@/app/admin/_components/ProductForm";
import { updateProduct } from "@/app/actions/products";

export const instant = false;

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const action = updateProduct.bind(null, product.id);

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin" className="text-sm text-neutral-500 hover:underline">
          ← Volver
        </Link>
        <h1 className="mt-2 text-xl font-semibold">Editar producto</h1>
      </div>
      <ProductForm action={action} product={product} />
    </div>
  );
}
