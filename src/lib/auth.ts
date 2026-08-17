import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/panel-x7k2/login");
  }

  return user;
}

export async function assertSameOrigin() {
  const headerStore = await headers();
  const origin = headerStore.get("origin");
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");

  if (!origin || !host) {
    throw new Error("Origin validation failed.");
  }

  const originHost = new URL(origin).host;
  if (originHost !== host) {
    throw new Error("CSRF validation failed.");
  }
}
