"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { getDb } from "@/lib/db";
import { siteConfig } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/dal";
import { siteSchema } from "@/lib/validation";

export type SiteFormState = {
  error?: string;
  success?: boolean;
  fieldErrors?: Record<string, string[] | undefined>;
};

export async function updateSite(
  _prev: SiteFormState,
  formData: FormData,
): Promise<SiteFormState> {
  await requireAdmin();

  const parsed = siteSchema.safeParse({
    name: formData.get("name"),
    shortName: formData.get("shortName"),
    tagline: formData.get("tagline") ?? "",
    description: formData.get("description") ?? "",
    location: formData.get("location") ?? "",
    address: formData.get("address") ?? "",
    phoneDisplay: formData.get("phoneDisplay") ?? "",
    whatsapp: formData.get("whatsapp"),
    instagram: formData.get("instagram") ?? "",
    facebook: formData.get("facebook") ?? "",
    email: formData.get("email") ?? "",
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const days = formData.getAll("days");
  const times = formData.getAll("time");
  const hours = days
    .map((day, index) => ({
      days: String(day).trim(),
      time: String(times[index] ?? "").trim(),
    }))
    .filter((row) => row.days.length > 0 || row.time.length > 0);

  const values = { ...parsed.data, hours };

  await getDb()
    .insert(siteConfig)
    .values({ id: 1, ...values })
    .onConflictDoUpdate({
      target: siteConfig.id,
      set: { ...values, updatedAt: new Date() },
    });

  revalidateTag("catalog", { expire: 0 });
  revalidatePath("/admin/site");
  return { success: true };
}
