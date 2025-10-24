import MovieCard from "./MovieCard";

export default function MovieGrid({ movies, loading, error, emptyMessage, favoritesSet, onToggleFavorite, onSelect }) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-lg border border-neutral-800 bg-neutral-900/50 h-64" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-sm text-red-400 py-16">{error}</div>;
  }

  if (!movies || movies.length === 0) {
    return <div className="text-center text-neutral-400 py-16">{emptyMessage}</div>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {movies.map((m) => (
        <MovieCard
          key={m.imdbID}
          movie={m}
          isFavorite={favoritesSet?.has(m.imdbID)}
          onToggleFavorite={() => onToggleFavorite?.(m)}
          onClick={() => onSelect?.(m)}
        />
      ))}
    </div>
  );
}
