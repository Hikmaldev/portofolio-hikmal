import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { upsertProfileAction } from "@/app/panel-x7k2/actions";
import { AdminNav } from "@/app/panel-x7k2/_components/admin-nav";
import { UploadField } from "@/components/admin/upload-field";

export default async function AdminProfilePage() {
  await requireAdmin();
  const profile = await prisma.profile.findFirst();

  return (
    <main className="mx-auto mt-8 w-full max-w-6xl px-4 pb-12">
      <AdminNav />
      <section className="card p-6">
        <h1 className="mb-4 text-2xl font-semibold">Kelola Profile</h1>
        <form action={upsertProfileAction} className="grid gap-3 sm:grid-cols-2">
          <input name="nama" defaultValue={profile?.nama ?? ""} required placeholder="Nama" className="rounded-xl border border-black/15 px-3 py-2" />
          <input name="tagline" defaultValue={profile?.tagline ?? ""} required placeholder="Tagline" className="rounded-xl border border-black/15 px-3 py-2" />
          <input name="email" type="email" defaultValue={profile?.email ?? ""} required placeholder="Email" className="rounded-xl border border-black/15 px-3 py-2" />
          <UploadField name="foto_url" defaultValue={profile?.foto_url} />
          <input name="link_github" defaultValue={profile?.link_github ?? ""} placeholder="GitHub URL" className="rounded-xl border border-black/15 px-3 py-2" />
          <input name="link_linkedin" defaultValue={profile?.link_linkedin ?? ""} placeholder="LinkedIn URL" className="rounded-xl border border-black/15 px-3 py-2" />
          <input name="link_instagram" defaultValue={profile?.link_instagram ?? ""} placeholder="Instagram URL" className="rounded-xl border border-black/15 px-3 py-2" />
          <textarea name="bio" defaultValue={profile?.bio ?? ""} required placeholder="Bio" className="min-h-36 rounded-xl border border-black/15 px-3 py-2 sm:col-span-2" />
          <button type="submit" className="rounded-xl bg-accent px-4 py-2 font-medium text-white sm:col-span-2">Simpan Profile</button>
        </form>
      </section>
    </main>
  );
}
