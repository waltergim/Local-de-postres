import { NextResponse } from "next/server";
import { connection } from "next/server";
import { getSite, listProducts } from "@/lib/queries";

export async function GET() {
  // Garantiza que la ruta se ejecute en cada request (no en build).
  await connection();

  const [products, site] = await Promise.all([listProducts(), getSite()]);

  return NextResponse.json(
    { products, site },
    { headers: { "Cache-Control": "no-store" } },
  );
}
