import { useState, useEffect } from "react";

export default function FormatSelector({ formats = [], onChange }) {
  const [chosen, setChosen] = useState(null);

  useEffect(() => {
    if (formats.length) {
      setChosen(formats[0]);
      onChange?.(formats[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formats]);

  if (!formats.length) return null;

  return (
    <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
      <h3 className="text-sm font-semibold text-slate-800 mb-3">Choose format</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {formats.map((f) => (
          <button
            key={f.itag || f.quality || f.url}
            onClick={() => {
              setChosen(f);
              onChange?.(f);
            }}
            className={`text-left rounded-lg border px-3 py-2 text-sm transition ${
              chosen === f
                ? "border-blue-600 bg-blue-50 text-blue-800"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="font-medium">{f.label || f.container || f.ext || "Unknown"}</div>
            {f.size && (
              <div className="text-xs text-slate-500">{f.size}</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
