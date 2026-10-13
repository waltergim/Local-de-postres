import "server-only";
import { redirect } from "next/navigation";
import { verifySession } from "./session";

export async function requireAdmin(): Promise<void> {
  if (!(await verifySession())) {
    redirect("/login");
  }
}
