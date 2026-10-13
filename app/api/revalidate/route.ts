import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

function handle(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag("catalog", { expire: 0 });
  return NextResponse.json({ ok: true, revalidated: true, now: Date.now() });
}

export async function POST(request: NextRequest) {
  return handle(request);
}

export async function GET(request: NextRequest) {
  return handle(request);
}
