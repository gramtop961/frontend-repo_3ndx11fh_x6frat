import { useMemo, useState } from "react";
import Header from "./components/Header";
import UrlInput from "./components/UrlInput";
import FormatSelector from "./components/FormatSelector";
import ResultCard from "./components/ResultCard";

const computedBackend = typeof window !== "undefined"
  ? (window.location.origin.replace(":3000", ":8000"))
  : "";
const API_BASE = import.meta.env.VITE_BACKEND_URL || computedBackend;

export default function App() {
  const [meta, setMeta] = useState(null);
  const [formats, setFormats] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");

  const canDownload = useMemo(() => !!(meta && selected), [meta, selected]);

  const fetchInfo = async (url) => {
    setMeta(null);
    setFormats([]);
    setSelected(null);
    setError("");

    const res = await fetch(`${API_BASE}/analyze?url=` + encodeURIComponent(url));
    if (!res.ok) throw new Error("Failed to analyze the URL");
    const data = await res.json();

    setMeta(data.meta);
    setFormats(data.formats || []);
  };

  const handleDownload = async () => {
    if (!canDownload) return;
    const query = new URLSearchParams({ url: meta.url, format: selected.id || selected.itag || "best" });
    const a = document.createElement("a");
    a.href = `${API_BASE}/download?${query.toString()}`;
    a.target = "_blank";
    a.rel = "noopener";
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />

      <main className="max-w-3xl mx-auto px-4 pb-16">
        <section className="text-center pt-8 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Download videos and music from your favorite platforms
          </h1>
          <p className="mt-3 text-slate-600">
            Paste a link from YouTube, TikTok, Instagram, Twitter, or a direct file URL. Select MP4 or MP3 when available.
          </p>
        </section>

        <div className="bg-white/60 backdrop-blur rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm">
          <UrlInput onSubmit={fetchInfo} />

          {error && (
            <div className="mt-4 text-sm text-red-600">{error}</div>
          )}

          {meta && (
            <div className="mt-6 space-y-4">
              <ResultCard meta={meta} onDownload={handleDownload} />
              <FormatSelector formats={formats} onChange={setSelected} />
            </div>
          )}
        </div>

        <section className="mt-10 text-xs text-slate-500 text-center leading-relaxed">
          This site is for personal use only. Respect copyright laws and creators. Some sources may restrict downloads.
        </section>
      </main>
    </div>
  );
}
