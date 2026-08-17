# Portfolio Hikmal

Website portfolio dengan panel admin privat berbasis Next.js + Supabase + Prisma.

## Fitur

- Halaman publik: Hero, About, Projects, Skills, Experience, Contact
- Panel admin privat di `/panel-x7k2`
- Login email/password via Supabase Auth
- CRUD penuh: Profile, Projects, Skills, Experience
- Upload gambar langsung ke Supabase Storage bucket `portfolio`
- Route protection via `src/proxy.ts`

## Setup

1. Install dependency:

```bash
npm install
```

2. Salin env:

```bash
cp .env.example .env
```

3. Isi `.env` dengan kredensial Supabase.

4. Generate Prisma client dan sinkronkan schema:

```bash
npm run db:generate
npm run db:push
```

5. Jalankan dev server:

```bash
npm run dev
```

## Catatan

- Pastikan bucket Supabase Storage bernama `portfolio` sudah dibuat dan public read jika ingin menampilkan gambar publik.
- `DATABASE_URL` harus menggunakan Postgres URL dari Supabase project.
