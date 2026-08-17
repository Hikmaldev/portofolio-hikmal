import { z } from "zod";

export const profileSchema = z.object({
  nama: z.string().min(2),
  tagline: z.string().min(2),
  bio: z.string().min(10),
  foto_url: z.string().url().optional().or(z.literal("")),
  email: z.string().email(),
  link_github: z.string().url().optional().or(z.literal("")),
  link_linkedin: z.string().url().optional().or(z.literal("")),
  link_instagram: z.string().url().optional().or(z.literal("")),
});

export const projectSchema = z.object({
  id: z.number().optional(),
  judul: z.string().min(2),
  deskripsi: z.string().min(10),
  tech_stack: z.string().min(1),
  gambar_url: z.string().url().optional().or(z.literal("")),
  link_demo: z.string().url().optional().or(z.literal("")),
  link_repo: z.string().url().optional().or(z.literal("")),
  urutan: z.number().int().min(0),
});

export const skillSchema = z.object({
  id: z.number().optional(),
  nama: z.string().min(1),
  kategori: z.string().min(1),
  level: z.number().int().min(1).max(100),
  icon: z.string().optional(),
});

export const experienceSchema = z.object({
  id: z.number().optional(),
  posisi: z.string().min(2),
  institusi: z.string().min(2),
  tanggal_mulai: z.string(),
  tanggal_selesai: z.string().optional(),
  deskripsi: z.string().min(10),
});
