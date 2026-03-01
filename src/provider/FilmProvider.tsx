import type { ReactNode } from 'react';
import toast from 'react-hot-toast';
import { useFilms } from '../hooks/useFilms';
import type { FilterMode } from '../types/ghibli';
import { FilmContext } from '../contexts/FilmContext';
import type { FilmContextData } from '../contexts/type';

export function FilmProvider({ children }: { children: ReactNode }) {
    const filmsData = useFilms();

    const handleFilterChange = (mode: FilterMode) => {
        const isRemoving = filmsData.filterMode.includes(mode);

        if (isRemoving) {
            toast.error(`Filtro removido`, { icon: '🗑️', id: mode });
        } else {
            toast.success(`Filtro aplicado`, { icon: '🔍', id: mode });
        }

        filmsData.setFilterMode((prev) =>
            isRemoving ? prev.filter(m => m !== mode) : [...prev, mode]
        );
    };
    const handleToggleWatched = (id: string) => {
        filmsData.toggleWatched(id);
        const isWatched = filmsData.watched.includes(id);
        if (!isWatched) {
            toast.success('Marcado como assistido!', { icon: '👁️' });
        } else {
            toast('Removido dos assistidos', { icon: '📁' });
        }
    };

    const handleToggleFavorite = (id: string) => {
        filmsData.toggleFavorite(id);
        const isFav = filmsData.favorites.includes(id);
        if (!isFav) {
            toast.success('Adicionado aos favoritos!', { icon: '❤️', duration: 2000 });
        } else {
            toast('Removido dos favoritos', { icon: '💔', duration: 2000 });
        }
    };

    const handleSaveNote = (id: string, rating: number, notes: string) => {
        filmsData.saveNote(id, rating, notes);
        const isDelete = rating === 0 && notes.trim() === "";

        if (isDelete) {
            return toast('Nota removida', {
                icon: '🗑️',
                style: {
                    border: '1px solid #ef4444',
                    padding: '16px',
                    color: 'var(--text)',
                    backgroundColor: 'var(--bg)'
                },
            });
        }

        toast.success('Avaliação salva com sucesso!', {
            style: { border: '1px solid #6366f1', padding: '16px', color: '#fff' },
            iconTheme: { primary: '#6366f1', secondary: '#fff' },
        });
    };

    const resetAll = () => {
        filmsData.setSearch("");
        filmsData.setSortBy("title-asc");
        filmsData.setIncludeDescription(false);
        filmsData.setFilterMode([]);
        toast('Filtros limpos!', { icon: '🧹' });
    };

    const value: FilmContextData = {
        ...filmsData,
        error: filmsData.error ? (filmsData.error as Error).message : null,
        handleFilterChange,
        resetAll,
        films: filmsData.filteredFilms,
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