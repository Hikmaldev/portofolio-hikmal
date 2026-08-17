import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import {
  deleteExperienceAction,
  upsertExperienceAction,
} from "@/app/panel-x7k2/actions";
import { AdminNav } from "@/app/panel-x7k2/_components/admin-nav";

export default async function AdminExperiencePage() {
  await requireAdmin();
  const experiences = await prisma.experience.findMany({ orderBy: { tanggal_mulai: "desc" } });

  return (
    <main className="mx-auto mt-8 w-full max-w-6xl px-4 pb-12">
      <AdminNav />
      <section className="card p-6">
        <h1 className="mb-4 text-2xl font-semibold">Kelola Experience</h1>
        <form action={upsertExperienceAction} className="mb-6 grid gap-3 sm:grid-cols-2">
          <input name="posisi" required placeholder="Posisi" className="rounded-xl border border-black/15 px-3 py-2" />
          <input name="institusi" required placeholder="Institusi" className="rounded-xl border border-black/15 px-3 py-2" />
          <input name="tanggal_mulai" type="date" required className="rounded-xl border border-black/15 px-3 py-2" />
          <input name="tanggal_selesai" type="date" className="rounded-xl border border-black/15 px-3 py-2" />
          <textarea name="deskripsi" required placeholder="Deskripsi" className="min-h-28 rounded-xl border border-black/15 px-3 py-2 sm:col-span-2" />
          <button type="submit" className="rounded-xl bg-accent px-4 py-2 font-medium text-white sm:col-span-2">Tambah Experience</button>
        </form>

        <div className="space-y-3">
          {experiences.map((item) => (
            <article key={item.id} className="rounded-xl border border-black/10 p-4">
              <form action={upsertExperienceAction} className="grid gap-2 sm:grid-cols-2">
                <input type="hidden" name="id" value={item.id} />
                <input name="posisi" defaultValue={item.posisi} required className="rounded-xl border border-black/15 px-3 py-2" />
                <input name="institusi" defaultValue={item.institusi} required className="rounded-xl border border-black/15 px-3 py-2" />
                <input name="tanggal_mulai" type="date" defaultValue={item.tanggal_mulai.toISOString().slice(0, 10)} required className="rounded-xl border border-black/15 px-3 py-2" />
                <input name="tanggal_selesai" type="date" defaultValue={item.tanggal_selesai ? item.tanggal_selesai.toISOString().slice(0, 10) : ""} className="rounded-xl border border-black/15 px-3 py-2" />
                <textarea name="deskripsi" defaultValue={item.deskripsi} required className="min-h-24 rounded-xl border border-black/15 px-3 py-2 sm:col-span-2" />
                <button type="submit" className="rounded-lg bg-accent px-3 py-1.5 text-sm text-white sm:col-span-2">Simpan Perubahan</button>
              </form>
              <form action={deleteExperienceAction} className="mt-3">
                <input type="hidden" name="id" value={item.id} />
                <button type="submit" className="rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white">Hapus</button>
              </form>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
