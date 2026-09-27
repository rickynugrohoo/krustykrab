import Link from "next/link";
import { redirect } from "next/navigation";
import { UtensilsCrossed, ArrowRight } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { categories } from "@/lib/menu-data";
import AdminShell from "@/components/admin/AdminShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const admin = createSupabaseAdminClient();
  const { data } = await admin.from("menu_items").select("category");
  const rows = data ?? [];
  const total = rows.length;
  const countBy = (id: string) => rows.filter((r) => r.category === id).length;

  return (
    <AdminShell email={user.email ?? ""} title="Dashboard">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Overview</h2>
          <p className="text-sm text-muted-foreground">
            A quick look at what&apos;s live on the Krusty Krab menu.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{total}</p>
            </CardContent>
          </Card>
          {categories.map((c) => (
            <Card key={c.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {c.emoji} {c.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{countBy(c.id)}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick action */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <UtensilsCrossed className="h-4 w-4" />
              Manage the menu
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Add, edit, or remove items. Changes appear on the website
              immediately.
            </p>
            <Button asChild>
              <Link href="/admin/menu">
                Go to Menu
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
