import { useEffect, useRef, useState } from "react";
import { Film, Heart, Search } from "lucide-react";

export default function Header({ onSearch, currentQuery, view, onToggleView, favoritesCount }) {
  const [value, setValue] = useState(currentQuery || "");
  const inputRef = useRef(null);

  useEffect(() => {
    setValue(currentQuery || "");
  }, [currentQuery]);

  const submit = (e) => {
    e?.preventDefault?.();
    onSearch?.(value);
  };

  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 bg-neutral-950/90 border-b border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Film className="h-6 w-6 text-emerald-400" />
            <span className="font-semibold tracking-tight">CineScope</span>
          </div>

          <form onSubmit={submit} className="flex-1 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search movies (e.g., Inception)"
                className="w-full rounded-md bg-neutral-900 border border-neutral-800 pl-10 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-neutral-700 placeholder:text-neutral-500"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-emerald-500 text-emerald-950 px-3 py-2 text-sm font-medium hover:bg-emerald-400 transition-colors"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </form>

          <button
            onClick={onToggleView}
            className="inline-flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm hover:bg-neutral-800 transition-colors"
            aria-label={view === "search" ? "Go to favorites" : "Go to search"}
          >
            <Heart className={`h-4 w-4 ${view === "favorites" ? "text-emerald-400" : "text-neutral-300"}`} />
            <span className="hidden sm:inline">Favorites</span>
            {favoritesCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center rounded-full bg-emerald-500 text-emerald-950 text-xs font-semibold h-5 min-w-[20px] px-1">
                {favoritesCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
