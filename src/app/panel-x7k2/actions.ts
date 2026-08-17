"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { assertSameOrigin, requireAdmin } from "@/lib/auth";
import {
  experienceSchema,
  profileSchema,
  projectSchema,
  skillSchema,
} from "@/lib/validators";

function normalizeOptional(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function toNumber(value: FormDataEntryValue | null) {
  return Number(typeof value === "string" ? value : 0);
}

export async function upsertProfileAction(formData: FormData) {
  await requireAdmin();
  await assertSameOrigin();

  const parsed = profileSchema.safeParse({
    nama: formData.get("nama"),
    tagline: formData.get("tagline"),
    bio: formData.get("bio"),
    foto_url: normalizeOptional(formData.get("foto_url")),
    email: formData.get("email"),
    link_github: normalizeOptional(formData.get("link_github")),
    link_linkedin: normalizeOptional(formData.get("link_linkedin")),
    link_instagram: normalizeOptional(formData.get("link_instagram")),
  });

  if (!parsed.success) {
    throw new Error("Data profile tidak valid.");
  }

  const existing = await prisma.profile.findFirst();

  if (existing) {
    await prisma.profile.update({
      where: { id: existing.id },
      data: parsed.data,
    });
  } else {
    await prisma.profile.create({ data: parsed.data });
  }

  revalidatePath("/");
  revalidatePath("/panel-x7k2/profile");
}

export async function upsertProjectAction(formData: FormData) {
  await requireAdmin();
  await assertSameOrigin();

  const parsed = projectSchema.safeParse({
    id: formData.get("id") ? toNumber(formData.get("id")) : undefined,
    judul: formData.get("judul"),
    deskripsi: formData.get("deskripsi"),
    tech_stack: formData.get("tech_stack"),
    gambar_url: normalizeOptional(formData.get("gambar_url")),
    link_demo: normalizeOptional(formData.get("link_demo")),
    link_repo: normalizeOptional(formData.get("link_repo")),
    urutan: toNumber(formData.get("urutan")),
  });

  if (!parsed.success) {
    throw new Error("Data project tidak valid.");
  }

  const payload = {
    ...parsed.data,
    tech_stack: parsed.data.tech_stack
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  };

  if (parsed.data.id) {
    await prisma.project.update({ where: { id: parsed.data.id }, data: payload });
  } else {
    await prisma.project.create({ data: payload });
  }

  revalidatePath("/");
  revalidatePath("/panel-x7k2/projects");
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdmin();
  await assertSameOrigin();

  const id = toNumber(formData.get("id"));
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/panel-x7k2/projects");
}

export async function upsertSkillAction(formData: FormData) {
  await requireAdmin();
  await assertSameOrigin();

  const parsed = skillSchema.safeParse({
    id: formData.get("id") ? toNumber(formData.get("id")) : undefined,
    nama: formData.get("nama"),
    kategori: formData.get("kategori"),
    level: toNumber(formData.get("level")),
    icon: normalizeOptional(formData.get("icon")),
  });

  if (!parsed.success) {
    throw new Error("Data skill tidak valid.");
  }

  if (parsed.data.id) {
    await prisma.skill.update({ where: { id: parsed.data.id }, data: parsed.data });
  } else {
    await prisma.skill.create({ data: parsed.data });
  }

  revalidatePath("/");
  revalidatePath("/panel-x7k2/skills");
}

export async function deleteSkillAction(formData: FormData) {
  await requireAdmin();
  await assertSameOrigin();

  const id = toNumber(formData.get("id"));
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/panel-x7k2/skills");
}

export async function upsertExperienceAction(formData: FormData) {
  await requireAdmin();
  await assertSameOrigin();

  const parsed = experienceSchema.safeParse({
    id: formData.get("id") ? toNumber(formData.get("id")) : undefined,
    posisi: formData.get("posisi"),
    institusi: formData.get("institusi"),
    tanggal_mulai: formData.get("tanggal_mulai"),
    tanggal_selesai: normalizeOptional(formData.get("tanggal_selesai")),
    deskripsi: formData.get("deskripsi"),
  });

  if (!parsed.success) {
    throw new Error("Data experience tidak valid.");
  }

  const payload = {
    posisi: parsed.data.posisi,
    institusi: parsed.data.institusi,
    tanggal_mulai: new Date(parsed.data.tanggal_mulai),
    tanggal_selesai: parsed.data.tanggal_selesai
      ? new Date(parsed.data.tanggal_selesai)
      : null,
    deskripsi: parsed.data.deskripsi,
  };

  if (parsed.data.id) {
    await prisma.experience.update({ where: { id: parsed.data.id }, data: payload });
  } else {
    await prisma.experience.create({ data: payload });
  }

  revalidatePath("/");
  revalidatePath("/panel-x7k2/experience");
}

export async function deleteExperienceAction(formData: FormData) {
  await requireAdmin();
  await assertSameOrigin();

  const id = toNumber(formData.get("id"));
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/panel-x7k2/experience");
}
