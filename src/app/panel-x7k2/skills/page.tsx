import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { deleteSkillAction, upsertSkillAction } from "@/app/panel-x7k2/actions";
import { AdminNav } from "@/app/panel-x7k2/_components/admin-nav";

export default async function AdminSkillsPage() {
  await requireAdmin();
  const skills = await prisma.skill.findMany({ orderBy: { created_at: "desc" } });

  return (
    <main className="mx-auto mt-8 w-full max-w-6xl px-4 pb-12">
      <AdminNav />
      <section className="card p-6">
        <h1 className="mb-4 text-2xl font-semibold">Kelola Skills</h1>
        <form action={upsertSkillAction} className="mb-6 grid gap-3 sm:grid-cols-2">
          <input name="nama" required placeholder="Nama skill" className="rounded-xl border border-black/15 px-3 py-2" />
          <input name="kategori" required placeholder="Kategori" className="rounded-xl border border-black/15 px-3 py-2" />
          <input name="level" type="number" min={1} max={100} required placeholder="Level (1-100)" className="rounded-xl border border-black/15 px-3 py-2" />
          <input name="icon" placeholder="Icon" className="rounded-xl border border-black/15 px-3 py-2" />
          <button type="submit" className="rounded-xl bg-accent px-4 py-2 font-medium text-white sm:col-span-2">Tambah Skill</button>
        </form>

        <div className="space-y-3">
          {skills.map((skill) => (
            <article key={skill.id} className="rounded-xl border border-black/10 p-4">
              <form action={upsertSkillAction} className="grid gap-2 sm:grid-cols-2">
                <input type="hidden" name="id" value={skill.id} />
                <input name="nama" defaultValue={skill.nama} required className="rounded-xl border border-black/15 px-3 py-2" />
                <input name="kategori" defaultValue={skill.kategori} required className="rounded-xl border border-black/15 px-3 py-2" />
                <input name="level" type="number" min={1} max={100} defaultValue={skill.level} required className="rounded-xl border border-black/15 px-3 py-2" />
                <input name="icon" defaultValue={skill.icon ?? ""} className="rounded-xl border border-black/15 px-3 py-2" />
                <button type="submit" className="rounded-lg bg-accent px-3 py-1.5 text-sm text-white sm:col-span-2">Simpan Perubahan</button>
              </form>
              <form action={deleteSkillAction} className="mt-3">
                <input type="hidden" name="id" value={skill.id} />
                <button type="submit" className="rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white">Hapus</button>
              </form>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
