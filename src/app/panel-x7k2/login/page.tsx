"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    };

    setLoading(true);
    setMessage("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json();

    if (!res.ok) {
      setLoading(false);
      setMessage(json.message ?? "Login gagal.");
      return;
    }

    const nextPath =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("next") || "/panel-x7k2"
        : "/panel-x7k2";
    router.push(nextPath);
    router.refresh();
  }

  return (
    <main className="mx-auto mt-20 w-full max-w-md px-4">
      <section className="card p-6">
        <h1 className="text-2xl font-semibold">Login Admin</h1>
        <p className="mt-1 text-sm text-muted">Akses privat panel pengelolaan konten.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="w-full rounded-xl border border-black/15 px-3 py-2"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            className="w-full rounded-xl border border-black/15 px-3 py-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-accent px-4 py-2 font-medium text-white"
          >
            {loading ? "Loading..." : "Login"}
          </button>
          {message ? <p className="text-sm text-red-600">{message}</p> : null}
        </form>
      </section>
    </main>
  );
}
