import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PortfolioView } from "@/components/public/portfolio-view";

export const metadata: Metadata = {
  title: "Hikmal | Portfolio",
  description: "Profile, project, skill, dan experience Hikmal.",
  openGraph: {
    title: "Hikmal | Portfolio",
    description: "Profile, project, skill, dan experience Hikmal.",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  if (!process.env.DATABASE_URL) {
    return (
      <PortfolioView
        profile={null}
        projects={[]}
        skills={[]}
        experiences={[]}
      />
    );
  }

  const [profile, projects, skills, experiences] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.project.findMany({ orderBy: { urutan: "asc" } }),
    prisma.skill.findMany({ orderBy: { created_at: "desc" } }),
    prisma.experience.findMany({ orderBy: { tanggal_mulai: "desc" } }),
  ]);

  return (
    <PortfolioView
      profile={profile}
      projects={projects}
      skills={skills}
      experiences={experiences.map((item) => ({
        ...item,
        tanggal_mulai: item.tanggal_mulai.toISOString().slice(0, 10),
        tanggal_selesai: item.tanggal_selesai?.toISOString().slice(0, 10) ?? null,
      }))}
    />
  );
}
