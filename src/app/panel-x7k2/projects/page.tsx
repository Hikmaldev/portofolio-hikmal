import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import {
  deleteProjectAction,
  upsertProjectAction,
} from "@/app/panel-x7k2/actions";
import { AdminNav } from "@/app/panel-x7k2/_components/admin-nav";
import { UploadField } from "@/components/admin/upload-field";

export default async function AdminProjectsPage() {
  await requireAdmin();
  const projects = await prisma.project.findMany({ orderBy: { urutan: "asc" } });

  return (
    <main className="mx-auto mt-8 w-full max-w-6xl px-4 pb-12">
      <AdminNav />
      <section className="card p-6">
        <h1 className="mb-4 text-2xl font-semibold">Kelola Projects</h1>
        <form action={upsertProjectAction} className="mb-6 grid gap-3 sm:grid-cols-2">
          <input name="judul" required placeholder="Judul" className="rounded-xl border border-black/15 px-3 py-2" />
          <input name="urutan" type="number" min={0} defaultValue={0} required placeholder="Urutan" className="rounded-xl border border-black/15 px-3 py-2" />
          <UploadField name="gambar_url" />
          <input name="tech_stack" required placeholder="Tech stack (pisahkan dengan koma)" className="rounded-xl border border-black/15 px-3 py-2" />
          <input name="link_demo" placeholder="Link demo" className="rounded-xl border border-black/15 px-3 py-2" />
          <input name="link_repo" placeholder="Link repo" className="rounded-xl border border-black/15 px-3 py-2" />
          <textarea name="deskripsi" required placeholder="Deskripsi" className="min-h-28 rounded-xl border border-black/15 px-3 py-2 sm:col-span-2" />
          <button type="submit" className="rounded-xl bg-accent px-4 py-2 font-medium text-white sm:col-span-2">Tambah Project</button>
        </form>

        <div className="space-y-3">
          {projects.map((project) => (
            <article key={project.id} className="rounded-xl border border-black/10 p-4">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">Edit Project</p>
              <form action={upsertProjectAction} className="grid gap-2 sm:grid-cols-2">
                <input type="hidden" name="id" value={project.id} />
                <input name="judul" defaultValue={project.judul} required className="rounded-xl border border-black/15 px-3 py-2" />
                <input name="urutan" type="number" min={0} defaultValue={project.urutan} required className="rounded-xl border border-black/15 px-3 py-2" />
                <input name="tech_stack" defaultValue={project.tech_stack.join(", ")} required className="rounded-xl border border-black/15 px-3 py-2 sm:col-span-2" />
                <UploadField name="gambar_url" defaultValue={project.gambar_url} />
                <input name="link_demo" defaultValue={project.link_demo ?? ""} className="rounded-xl border border-black/15 px-3 py-2" />
                <input name="link_repo" defaultValue={project.link_repo ?? ""} className="rounded-xl border border-black/15 px-3 py-2" />
                <textarea name="deskripsi" defaultValue={project.deskripsi} required className="min-h-24 rounded-xl border border-black/15 px-3 py-2 sm:col-span-2" />
                <button type="submit" className="rounded-lg bg-accent px-3 py-1.5 text-sm text-white sm:col-span-2">Simpan Perubahan</button>
              </form>
              <form action={deleteProjectAction} className="mt-3">
                <input type="hidden" name="id" value={project.id} />
                <button type="submit" className="rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white">Hapus</button>
              </form>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
