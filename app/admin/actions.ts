"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { SupabaseClient } from "@supabase/supabase-js";

const CATEGORIES = ["burgers", "drinks", "sides", "extras"] as const;
type Category = (typeof CATEGORIES)[number];

export interface ActionResult {
  ok?: boolean;
  error?: string;
}

async function requireAdmin() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/menu");
  revalidatePath("/admin");
}

function parseFields(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "").trim();
  const category = String(formData.get("category") ?? "") as Category;
  const price = Number(priceRaw);

  if (!name) return { error: "Name is required." as const };
  if (!CATEGORIES.includes(category))
    return { error: "Please choose a valid category." as const };
  if (Number.isNaN(price) || price < 0)
    return { error: "Price must be a valid number." as const };

  return { fields: { name, description, price, category } };
}

async function resolveImage(
  admin: SupabaseClient,
  formData: FormData
): Promise<string> {
  const file = formData.get("image");
  const existing = String(formData.get("image_url") ?? "");

  if (file instanceof File && file.size > 0) {
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const path = `${crypto.randomUUID()}.${ext}`;
    const bytes = new Uint8Array(await file.arrayBuffer());
    const { error } = await admin.storage
      .from("menu-images")
      .upload(path, bytes, {
        contentType: file.type || "image/jpeg",
        upsert: false,
      });
    if (error) throw new Error(`Image upload failed: ${error.message}`);
    return admin.storage.from("menu-images").getPublicUrl(path).data.publicUrl;
  }
  return existing;
}

export async function createItem(formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const parsed = parseFields(formData);
  if ("error" in parsed) return { error: parsed.error };

  const admin = createSupabaseAdminClient();
  try {
    const image_url = await resolveImage(admin, formData);
    const { data: maxRow } = await admin
      .from("menu_items")
      .select("sort_order")
      .order("sort_order", { ascending: false })
      .limit(1)
      .maybeSingle();
    const sort_order = (maxRow?.sort_order ?? 0) + 1;

    const { error } = await admin
      .from("menu_items")
      .insert({ ...parsed.fields, image_url, sort_order });
    if (error) return { error: error.message };
  } catch (e) {
    return { error: (e as Error).message };
  }
  revalidateAll();
  return { ok: true };
}

export async function updateItem(formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing item id." };
  const parsed = parseFields(formData);
  if ("error" in parsed) return { error: parsed.error };

  const admin = createSupabaseAdminClient();
  try {
    const image_url = await resolveImage(admin, formData);
    const { error } = await admin
      .from("menu_items")
      .update({ ...parsed.fields, image_url })
      .eq("id", id);
    if (error) return { error: error.message };
  } catch (e) {
    return { error: (e as Error).message };
  }
  revalidateAll();
  return { ok: true };
}

export async function deleteItem(id: string): Promise<ActionResult> {
  await requireAdmin();
  if (!id) return { error: "Missing item id." };
  const admin = createSupabaseAdminClient();
  const { error } = await admin.from("menu_items").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidateAll();
  return { ok: true };
}
