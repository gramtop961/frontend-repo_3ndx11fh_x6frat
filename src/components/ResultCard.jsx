import { Download, Video, Music2, FileText } from "lucide-react";

export default function ResultCard({ meta, onDownload }) {
  if (!meta) return null;

  const icon = meta.type === "audio" ? (
    <Music2 className="h-5 w-5" />
  ) : meta.type === "video" ? (
    <Video className="h-5 w-5" />
  ) : (
    <FileText className="h-5 w-5" />
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white grid place-items-center">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-slate-800 truncate">
            {meta.title || meta.filename || "Media"}
          </p>
          {meta.source && (
            <p className="text-xs text-slate-500 truncate">{meta.source}</p>
          )}
        </div>
        <button
          onClick={onDownload}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white text-sm font-medium px-3 py-2 hover:bg-blue-700 transition"
        >
          <Download className="h-4 w-4" />
          Download
        </button>
      </div>
      {meta.thumbnail && (
        <img
          alt="thumbnail"
          src={meta.thumbnail}
          className="mt-4 w-full rounded-lg object-cover max-h-64"
        />
      )}
    </div>
  );
}
