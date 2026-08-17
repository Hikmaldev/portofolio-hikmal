# PRD: Portofolio Website dengan Admin Panel

## 1. Ringkasan Produk

Website portofolio pribadi dengan dua bagian utama. Bagian publik menampilkan profile, project, skill, dan experience. Bagian admin bersifat privat, dilindungi login, dan digunakan untuk mengelola seluruh konten lewat CRUD tanpa perlu edit kode atau redeploy manual.

## 2. Tujuan

- Menampilkan portofolio profesional yang mudah diupdate
- Memisahkan konten dari kode, semua data disimpan di database
- Admin bisa tambah, edit, hapus data kapan saja lewat halaman privat
- Deploy di Vercel dengan biaya nol

## 3. Target Pengguna

- **Publik** — recruiter, klien, orang yang mengunjungi domain kamu
- **Admin** — kamu sendiri, satu-satunya user yang bisa login ke panel

## 4. Stack Teknologi Pilihan

| Kebutuhan                 | Pilihan              | Alasan                                                                   |
| ------------------------- | -------------------- | ------------------------------------------------------------------------ |
| Framework                 | Next.js (App Router) | Native support di Vercel, SSR/ISR bawaan, SEO friendly                   |
| Styling                   | Tailwind CSS         | Cepat, konsisten, gampang dikustom                                       |
| Animasi                   | Framer Motion        | Ringan, kontrol animasi presisi                                          |
| Database + Auth + Storage | Supabase             | Satu platform gratis untuk Postgres, autentikasi, dan penyimpanan gambar |
| ORM                       | Prisma               | Query database type-safe, migrasi schema gampang                         |
| Hosting                   | Vercel               | Gratis untuk project personal, auto deploy dari GitHub                   |

Supabase dipilih karena menyediakan Postgres, sistem login, dan storage gambar dalam satu free tier. Ini menghindari setup NextAuth terpisah, database terpisah, dan storage terpisah.

## 5. Fitur

### 5.1 Halaman Publik

- **Hero** — nama, role, tagline, tombol CTA
- **About** — bio singkat, foto, daftar skill
- **Experience** — timeline riwayat kerja/organisasi
- **Projects** — grid project dengan gambar, deskripsi, tech stack, link demo dan repo
- **Contact** — link sosial media dan email

Semua konten diambil langsung dari database, bukan hardcode.

### 5.2 Halaman Admin

- URL privat, tidak muncul di navigasi publik, contoh `/panel-x7k2`
- Login wajib sebelum akses dashboard
- Dashboard dengan CRUD penuh untuk:
  - **Profile** — edit nama, tagline, bio, foto, link sosial
  - **Projects** — tambah, edit, hapus, atur urutan tampil
  - **Skills** — tambah, edit, hapus, kategori dan level
  - **Experience** — tambah, edit, hapus, tanggal mulai dan selesai
- Upload gambar langsung dari form, tersimpan di Supabase Storage
- Perubahan data langsung tampil di halaman publik tanpa redeploy

### 5.3 Autentikasi

- Login pakai email dan password lewat Supabase Auth
- Middleware Next.js mengecek session sebelum akses route `/panel-x7k2/*`
- Belum login otomatis diarahkan ke halaman login
- Rate limiting pada percobaan login untuk cegah brute force

## 6. Struktur Data

**profile**
`id, nama, tagline, bio, foto_url, email, link_github, link_linkedin, link_instagram`

**projects**
`id, judul, deskripsi, tech_stack, gambar_url, link_demo, link_repo, urutan, created_at`

**skills**
`id, nama, kategori, level, icon, created_at`

**experience**
`id, posisi, institusi, tanggal_mulai, tanggal_selesai, deskripsi, created_at`

## 7. Kebutuhan Non-Fungsional

- Responsive penuh di mobile, tablet, desktop
- Skor Lighthouse minimal 90 di semua kategori
- Loading halaman publik di bawah 2 detik
- Gambar dikompresi otomatis sebelum tersimpan
- Meta tag SEO lengkap di setiap halaman publik
- Semua secret disimpan di environment variable, tidak ada yang hardcode

## 8. Keamanan

- Password admin di-hash, tidak pernah disimpan plain text
- Session token disimpan aman lewat cookie httpOnly
- Validasi input di setiap form untuk cegah data kotor
- Proteksi CSRF pada form admin
- URL admin memakai path acak, tidak memakai kata umum seperti `/admin` atau `/login`

## 9. Alur Kerja Pengguna

**Publik**

1. Buka domain, lihat hero, about, project, experience
2. Klik project untuk lihat demo atau repo
3. Klik link sosial atau email untuk kontak

**Admin**

1. Buka URL privat
2. Login dengan email dan password
3. Pilih menu (Profile, Projects, Skills, Experience)
4. Tambah, edit, atau hapus data lewat form
5. Simpan, perubahan langsung muncul di halaman publik

## 10. Di Luar Cakupan (Versi Awal)

- Multi-admin atau sistem role berjenjang
- Komentar atau interaksi pengunjung
- Blog atau artikel
- Analytics custom, cukup pakai Vercel Analytics bawaan

## 11. Kriteria Selesai

- Semua fitur CRUD berjalan tanpa error
- Halaman publik update otomatis setelah data diubah di admin
- Login admin aman, tidak bisa diakses tanpa kredensial benar
- Website live di domain sendiri lewat Vercel
- Lighthouse score minimal 90 di halaman publik
