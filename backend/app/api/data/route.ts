import { NextResponse } from "next/server";
import { getSite, listProducts } from "@/lib/queries";

export async function GET() {
  const [products, site] = await Promise.all([listProducts(), getSite()]);

  return NextResponse.json(
    { products, site },
    { headers: { "Cache-Control": "no-store" } },
  );
}
