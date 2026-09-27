import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import AdminShell from "@/components/admin/AdminShell";
import MenuManager, { type AdminMenuRow } from "@/components/admin/MenuManager";

export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const admin = createSupabaseAdminClient();
  const { data } = await admin
    .from("menu_items")
    .select("*")
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });

  return (
    <AdminShell email={user.email ?? ""} title="Menu Management">
      <MenuManager initialItems={(data ?? []) as AdminMenuRow[]} />
    </AdminShell>
  );
}
