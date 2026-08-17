"use client";

import { motion } from "framer-motion";

type PublicProfile = {
  nama: string;
  tagline: string;
  bio: string;
  foto_url: string | null;
  email: string;
  link_github: string | null;
  link_linkedin: string | null;
  link_instagram: string | null;
};

type PublicProject = {
  id: number;
  judul: string;
  deskripsi: string;
  tech_stack: string[];
  gambar_url: string | null;
  link_demo: string | null;
  link_repo: string | null;
};

type PublicSkill = {
  id: number;
  nama: string;
  kategori: string;
  level: number;
};

type PublicExperience = {
  id: number;
  posisi: string;
  institusi: string;
  tanggal_mulai: string;
  tanggal_selesai: string | null;
  deskripsi: string;
};

type PortfolioViewProps = {
  profile: PublicProfile | null;
  projects: PublicProject[];
  skills: PublicSkill[];
  experiences: PublicExperience[];
};

const block = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function PortfolioView({ profile, projects, skills, experiences }: PortfolioViewProps) {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-8">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={block}
        transition={{ duration: 0.55 }}
        className="card mb-6 overflow-hidden p-8"
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.26em] text-muted">
          Portfolio Hikmal
        </p>
        <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">
          {profile?.nama ?? "Nama Kamu"}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          {profile?.tagline ??
            "Full-stack developer yang fokus membangun produk web cepat, aman, dan mudah di-maintain."}
        </p>
        <div className="mt-7 flex flex-wrap gap-3 text-sm">
          <a href="#projects" className="rounded-full bg-accent px-5 py-2 text-white">
            Lihat Project
          </a>
          <a href="#contact" className="rounded-full border border-black/20 px-5 py-2">
            Contact
          </a>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={block}
        transition={{ duration: 0.4 }}
        className="card mb-6 p-8"
      >
        <h2 className="mb-3 text-2xl font-semibold">About</h2>
        <p className="leading-7 text-muted">{profile?.bio ?? "Isi bio dapat dikelola dari panel admin."}</p>
      </motion.section>

      <motion.section
        id="projects"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={block}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h2 className="mb-3 text-2xl font-semibold">Projects</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <article key={project.id} className="card p-5">
              <h3 className="text-xl font-semibold">{project.judul}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{project.deskripsi}</p>
              <p className="mt-3 text-xs uppercase tracking-wider text-muted">
                {project.tech_stack.join(" | ")}
              </p>
              <div className="mt-4 flex gap-3 text-sm">
                {project.link_demo && (
                  <a className="underline" href={project.link_demo} target="_blank" rel="noreferrer">
                    Demo
                  </a>
                )}
                {project.link_repo && (
                  <a className="underline" href={project.link_repo} target="_blank" rel="noreferrer">
                    Repo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={block}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h2 className="mb-3 text-2xl font-semibold">Skills</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {skills.map((skill) => (
            <div key={skill.id} className="card p-4">
              <p className="font-medium">{skill.nama}</p>
              <p className="text-xs text-muted">{skill.kategori}</p>
              <div className="mt-3 h-2 rounded-full bg-black/10">
                <div className="h-2 rounded-full bg-accent-2" style={{ width: `${skill.level}%` }} />
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={block}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h2 className="mb-3 text-2xl font-semibold">Experience</h2>
        <div className="space-y-3">
          {experiences.map((item) => (
            <div key={item.id} className="card p-4">
              <p className="font-medium">
                {item.posisi} - {item.institusi}
              </p>
              <p className="mb-1 text-xs text-muted">
                {item.tanggal_mulai} {item.tanggal_selesai ? `- ${item.tanggal_selesai}` : "- sekarang"}
              </p>
              <p className="text-sm text-muted">{item.deskripsi}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={block}
        transition={{ duration: 0.4 }}
        className="card p-8"
      >
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="mt-2 text-muted">Reach me at {profile?.email ?? "email@domain.com"}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          {profile?.link_github && (
            <a href={profile.link_github} className="underline" target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
          {profile?.link_linkedin && (
            <a href={profile.link_linkedin} className="underline" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
          {profile?.link_instagram && (
            <a href={profile.link_instagram} className="underline" target="_blank" rel="noreferrer">
              Instagram
            </a>
          )}
        </div>
      </motion.section>
    </main>
  );
}
