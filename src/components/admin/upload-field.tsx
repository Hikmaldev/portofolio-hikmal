"use client";

import { useState } from "react";

type UploadFieldProps = {
  name: string;
  defaultValue?: string | null;
};

export function UploadField({ name, defaultValue = "" }: UploadFieldProps) {
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleUpload(file: File) {
    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    setUploading(false);

    if (!res.ok) {
      setMessage(json.message ?? "Upload gagal.");
      return;
    }

    setUrl(json.url);
    setMessage("Upload berhasil.");
  }

  return (
    <div className="space-y-2 sm:col-span-2">
      <input type="hidden" name={name} value={url ?? ""} readOnly />
      <div className="flex flex-wrap items-center gap-2">
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              void handleUpload(file);
            }
          }}
          className="text-sm"
        />
        <span className="text-xs text-muted">{uploading ? "Mengupload..." : "Opsional"}</span>
      </div>
      <input
        type="url"
        value={url ?? ""}
        onChange={(event) => setUrl(event.target.value)}
        placeholder="Atau isi URL manual"
        className="w-full rounded-xl border border-black/15 px-3 py-2"
      />
      {message ? <p className="text-xs text-muted">{message}</p> : null}
    </div>
  );
}
