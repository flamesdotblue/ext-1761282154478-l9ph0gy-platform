import { Heart } from "lucide-react";

const fallbackPoster =
  "data:image/svg+xml;utf8,\n  <svg xmlns='http://www.w3.org/2000/svg' width='300' height='450'>\n    <rect width='100%' height='100%' fill='%231a1a1a'/>\n    <text x='50%' y='50%' fill='%23666' font-size='22' dominant-baseline='middle' text-anchor='middle' font-family='Arial, Helvetica, sans-serif'>No Image</text>\n  </svg>";

export default function MovieCard({ movie, isFavorite, onToggleFavorite, onClick }) {
  const poster = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : fallbackPoster;
  const title = movie.Title || movie.title || "Untitled";
  const year = movie.Year || movie.year || "";

  return (
    <div className="group relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-900 transition-colors">
      <button onClick={onClick} className="block w-full text-left">
        <div className="aspect-[2/3] w-full overflow-hidden bg-neutral-900">
          <img
            src={poster}
            alt={`${title} poster`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-3">
          <h3 className="line-clamp-1 font-medium text-neutral-100">{title}</h3>
          <p className="text-xs text-neutral-400">{year}</p>
        </div>
      </button>
      <div className="absolute right-2 top-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.();
          }}
          className={`inline-flex items-center justify-center rounded-full p-2 transition-colors ${
            isFavorite ? "bg-emerald-500/20 text-emerald-400" : "bg-neutral-950/70 text-neutral-300 hover:text-neutral-100"
          } border border-neutral-800 backdrop-blur`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-emerald-400" : ""}`} />
        </button>
      </div>
    </div>
  );
}
