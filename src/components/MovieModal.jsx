import { X, Star } from "lucide-react";

export default function MovieModal({ movie, onClose, onToggleFavorite, isFavorite }) {
  if (!movie) return null;
  const poster = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : undefined;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-800 bg-neutral-900/70 text-neutral-300 hover:text-neutral-100"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid md:grid-cols-3">
          <div className="md:col-span-1 bg-neutral-900/50">
            {poster ? (
              <img src={poster} alt={`${movie.Title} poster`} className="w-full h-full object-cover" />
            ) : (
              <div className="aspect-[2/3] w-full bg-neutral-900" />
            )}
          </div>
          <div className="md:col-span-2 p-5 md:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl md:text-2xl font-semibold">{movie.Title}</h2>
              {movie.Year && <span className="text-neutral-400">({movie.Year})</span>}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-neutral-300">
              {movie.Runtime && <span>{movie.Runtime}</span>}
              {movie.Genre && <span className="text-neutral-400">•</span>}
              {movie.Genre && <span>{movie.Genre}</span>}
              {movie.Rated && <span className="ml-auto rounded border border-neutral-800 bg-neutral-900 px-2 py-0.5 text-xs">{movie.Rated}</span>}
            </div>

            {movie.imdbRating && movie.imdbRating !== "N/A" && (
              <div className="mt-3 inline-flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-900 px-2.5 py-1.5 text-sm">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">{movie.imdbRating}</span>
                <span className="text-neutral-400">IMDb</span>
              </div>
            )}

            {movie.Plot && movie.Plot !== "N/A" && (
              <p className="mt-4 text-neutral-300 leading-relaxed">{movie.Plot}</p>
            )}

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {movie.Director && movie.Director !== "N/A" && (
                <div>
                  <div className="text-neutral-400">Director</div>
                  <div className="">{movie.Director}</div>
                </div>
              )}
              {movie.Actors && movie.Actors !== "N/A" && (
                <div>
                  <div className="text-neutral-400">Cast</div>
                  <div className="">{movie.Actors}</div>
                </div>
              )}
              {movie.Writer && movie.Writer !== "N/A" && (
                <div>
                  <div className="text-neutral-400">Writer</div>
                  <div className="">{movie.Writer}</div>
                </div>
              )}
              {movie.Language && movie.Language !== "N/A" && (
                <div>
                  <div className="text-neutral-400">Language</div>
                  <div className="">{movie.Language}</div>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => onToggleFavorite?.(movie)}
                className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium border transition-colors ${
                  isFavorite
                    ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                    : "border-neutral-800 bg-neutral-900 text-neutral-200 hover:bg-neutral-800"
                }`}
              >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </button>
              <a
                href={`https://www.imdb.com/title/${movie.imdbID}/`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm hover:bg-neutral-800"
              >
                View on IMDb
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
