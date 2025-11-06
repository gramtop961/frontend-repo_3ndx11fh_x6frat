import { CloudDownload, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full">
      <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 grid place-items-center text-white">
            <CloudDownload className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="text-xl font-bold tracking-tight">SwiftLoad</p>
            <p className="text-xs text-slate-500 -mt-0.5">Media downloader</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600 bg-white/60 backdrop-blur px-3 py-1.5 rounded-full border border-slate-200">
          <Sparkles className="h-4 w-4 text-yellow-500" />
          <span>No watermark for TikTok, HD when available</span>
        </div>
      </div>
    </header>
  );
}
