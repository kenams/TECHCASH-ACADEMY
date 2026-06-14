import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard-shell";
import { isAdminUserId } from "@/lib/admin";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

export const metadata: Metadata = {
  robots: { index: false, follow: false }
};

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  return (
    <DashboardShell email={user.email || ""} canManageCatalog={isAdminUserId(user.id)}>
      {children}
    </DashboardShell>
  );
}
