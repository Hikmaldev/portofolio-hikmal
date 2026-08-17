import { requireAdmin } from "@/lib/auth";
import { AdminNav } from "@/app/panel-x7k2/_components/admin-nav";

export default async function AdminDashboardPage() {
  await requireAdmin();

  return (
    <main className="mx-auto mt-8 w-full max-w-6xl px-4 pb-12">
      <AdminNav />
      <section className="card p-6">
        <h1 className="text-3xl font-semibold">Dashboard Admin</h1>
        <p className="mt-2 text-muted">
          Kelola seluruh konten portfolio dari sini tanpa edit kode atau redeploy manual.
        </p>
      </section>
    </main>
  );
}
