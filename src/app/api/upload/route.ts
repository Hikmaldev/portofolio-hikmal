import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "File tidak ditemukan." }, { status: 400 });
  }

  const fileExt = file.name.split(".").pop();
  const filePath = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

  const { error } = await supabase.storage.from("portfolio").upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  const { data } = supabase.storage.from("portfolio").getPublicUrl(filePath);
  return NextResponse.json({ url: data.publicUrl });
}
