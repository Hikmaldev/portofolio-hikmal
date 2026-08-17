import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  const headerStore = await headers();
  const ip =
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerStore.get("x-real-ip") ??
    "unknown";

  const limiter = checkRateLimit(`login:${ip}`);
  if (!limiter.allowed) {
    return NextResponse.json(
      { message: "Terlalu banyak percobaan login. Coba lagi beberapa menit." },
      { status: 429 },
    );
  }

  const body = await request.json();
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Input login tidak valid." }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return NextResponse.json({ message: "Email atau password salah." }, { status: 401 });
  }

  return NextResponse.json({ message: "Login berhasil." });
}
