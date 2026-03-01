import { MovieCard } from './MovieCard';
import { EmptyState } from './EmptyState';
import type { Film } from '../types/ghibli';
import { QuickSummary } from './QuickSummary';
import { MovieSkeleton } from './MovieSkeleton';
import { useFilmContext } from '../contexts/FilmContext';

interface MovieListProps {
  currentFilms: Film[];
}

export function MovieList({ currentFilms }: MovieListProps) {
  const {
    loading,
    filteredFilms,
    favorites,
    watched,
    toggleFavorite,
    toggleWatched,
    userNotes,
    saveMovieNote,
    resetAll,
  } = useFilmContext();

  const gridClasses =
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10';

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6">
      {loading && (
        <div className={gridClasses} aria-busy="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <MovieSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      )}

      {!loading && (
        <div className="space-y-10 pb-24">
          <QuickSummary movieLenght={filteredFilms.length} />

          {filteredFilms.length > 0 ? (
            <div className={gridClasses}>
              {currentFilms.map((film) => (
                <MovieCard
                  key={film.id}
                  film={film}
                  isFavorite={favorites.includes(film.id)}
                  isWatched={watched.includes(film.id)}
                  onFavorite={() => toggleFavorite(film.id)}
                  onWatched={() => toggleWatched(film.id)}
                  userData={userNotes[film.id]}
                  onSaveNote={(rating, notes) =>
                    saveMovieNote(film.id, rating, notes)
                  }
                />
              ))}
            </div>
          ) : (
            <div className="py-24 flex justify-center">
              <EmptyState onReset={resetAll} />
            </div>
          )}
        </div>
      )}
    </section>
  );
}