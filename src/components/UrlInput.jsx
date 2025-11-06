import { useState } from "react";
import { Loader2, Download, Link2 } from "lucide-react";

export default function UrlInput({ onSubmit }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const trimmed = url.trim();
    if (!/^https?:\/\//i.test(trimmed)) {
      setError("Enter a valid URL starting with http or https");
      return;
    }
    try {
      setLoading(true);
      await onSubmit(trimmed);
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-stretch gap-2">
        <div className="flex-1 relative">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a YouTube, TikTok, Instagram, or direct file URL"
            className="w-full h-12 rounded-xl border border-slate-200 bg-white/80 backdrop-blur px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Link2 className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="h-12 px-4 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Fetch
            </>
          )}
        </button>
      </div>
      {error && (
        <p className="text-sm text-red-600 mt-2">{error}</p>
      )}
      <p className="text-xs text-slate-500 mt-2">
        By using this tool, you agree to download only content you have rights to.
      </p>
    </form>
  );
}
