import { useEffect, useMemo, useRef, useState } from "react";
import Header from "./components/Header";
import MovieGrid from "./components/MovieGrid";
import MovieModal from "./components/MovieModal";

const OMDB_KEY = "thewdb"; // Public demo key

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [view, setView] = useState("search"); // 'search' | 'favorites'
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem("favorites");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const favoritesSet = useMemo(() => new Set(favorites.map((m) => m.imdbID)), [favorites]);
  const controllerRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const handleSearch = async (term) => {
    const q = term?.trim() ?? "";
    setQuery(q);
    if (!q) {
      setMovies([]);
      setError("");
      return;
    }
    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${encodeURIComponent(q)}&type=movie` ,
        { signal: controller.signal }
      );
      const data = await res.json();
      if (data.Response === "False") {
        setMovies([]);
        setError(data.Error || "No results found");
      } else {
        setMovies(Array.isArray(data.Search) ? data.Search : []);
      }
    } catch (e) {
      if (e.name !== "AbortError") {
        setError("Failed to fetch movies. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const openDetails = async (imdbID) => {
    if (!imdbID) return;
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${encodeURIComponent(imdbID)}&plot=full`
      );
      const data = await res.json();
      if (data.Response === "True") {
        setSelectedMovie(data);
      }
    } catch {
      // swallow
    }
  };

  const closeDetails = () => setSelectedMovie(null);

  const toggleFavorite = (movie) => {
    if (!movie || !movie.imdbID) return;
    setFavorites((prev) => {
      const exists = prev.find((m) => m.imdbID === movie.imdbID);
      if (exists) return prev.filter((m) => m.imdbID !== movie.imdbID);
      // Normalize movie object (use consistent fields)
      const normalized = {
        imdbID: movie.imdbID,
        Title: movie.Title || movie.title || movie.name,
        Year: movie.Year || movie.year || "",
        Poster: movie.Poster || movie.poster || movie.image || "",
        Type: movie.Type || movie.type || "movie",
      };
      return [normalized, ...prev].slice(0, 100);
    });
  };

  const displayed = view === "favorites" ? favorites : movies;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Header
        onSearch={handleSearch}
        currentQuery={query}
        view={view}
        onToggleView={() => setView((v) => (v === "search" ? "favorites" : "search"))}
        favoritesCount={favorites.length}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <MovieGrid
          movies={displayed}
          loading={loading}
          error={error}
          emptyMessage={
            view === "favorites"
              ? "No favorites yet. Add some movies you love!"
              : query
              ? "No results. Try a different search."
              : "Search for movies to get started."
          }
          favoritesSet={favoritesSet}
          onToggleFavorite={toggleFavorite}
          onSelect={(movie) => openDetails(movie.imdbID)}
        />
      </main>

      <MovieModal movie={selectedMovie} onClose={closeDetails} onToggleFavorite={toggleFavorite} isFavorite={selectedMovie ? favoritesSet.has(selectedMovie.imdbID) : false} />

      <footer className="border-t border-neutral-800 py-6 text-center text-sm text-neutral-400">
        Built with OMDb API • Demo key usage may limit results
      </footer>
    </div>
  );
}
