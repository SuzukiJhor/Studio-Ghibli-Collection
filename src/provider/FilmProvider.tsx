import { useEffect, type ReactNode } from 'react';
import { useFilms } from '../hooks/useFilms';
import type { FilterMode } from '../types/ghibli';
import { filmToasts } from '../toasts/filmToasts';
import { FilmContext } from '../contexts/FilmContext';
import type { FilmContextData } from '../contexts/type';

export function FilmProvider({ children }: { children: ReactNode }) {
    const filmsData = useFilms();

    useEffect(() => {
        if (filmsData.loading) {
            filmToasts.loading();
            return;
        }

        if (filmsData.error) {
            filmToasts.error((filmsData.error as Error).message);
            return;
        }

        filmToasts.success();
    }, [filmsData.loading, filmsData.error]);

    const handleFilterChange = (mode: FilterMode) => {
        const isRemoving = filmsData.filterMode.includes(mode);

        if (isRemoving) {
            filmToasts.filterRemoved();
        } else {
            filmToasts.filterApplied();
        }

        filmsData.setFilterMode(prev =>
            isRemoving ? prev.filter(m => m !== mode) : [...prev, mode]
        );
    };

    const handleToggleWatched = (id: string) => {
        const isWatched = filmsData.watched.includes(id);
        filmsData.toggleWatched(id);

        if (isWatched) {
            filmToasts.watchedRemoved();
        } else {
            filmToasts.watchedAdded();
        }
    };

    const handleToggleFavorite = (id: string) => {
        const isFav = filmsData.favorites.includes(id);
        filmsData.toggleFavorite(id);

        if (isFav) {
            filmToasts.favoriteRemoved();
        } else {
            filmToasts.favoriteAdded();
        }
    };

    const handleSaveNote = (id: string, rating: number, notes: string) => {
        filmsData.saveNote(id, rating, notes);

        const isDelete = rating === 0 && notes.trim() === '';

        if (isDelete) {
            filmToasts.noteRemoved();
        } else {
            filmToasts.noteSaved();
        }
    };

    const resetAll = () => {
        filmsData.setSearch('');
        filmsData.setSortBy('title-asc');
        filmsData.setIncludeDescription(false);
        filmsData.setFilterMode([]);

        filmToasts.resetFilters();
    };

    const value: FilmContextData = {
        ...filmsData,
        films: filmsData.filteredFilms,
        error: filmsData.error ? (filmsData.error as Error).message : null,
        handleFilterChange,
        resetAll,
        toggleFavorite: handleToggleFavorite,
        toggleWatched: handleToggleWatched,
        saveMovieNote: handleSaveNote,
    };

    return (
        <FilmContext.Provider value={value}>
            {children}
        </FilmContext.Provider>
    );
}