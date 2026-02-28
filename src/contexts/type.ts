import type { Dispatch, SetStateAction } from "react";
import type { Film, FilterMode, UserNotesMap } from "../types/ghibli";

export interface FilmContextData {
    films: Film[];
    filteredFilms: Film[];
    loading: boolean;
    error: Error | string | null;
    search: string;
    setSearch: (v: string) => void;
    sortBy: string;
    setSortBy: (v: string) => void;
    includeDescription: boolean;
    setIncludeDescription: (v: boolean) => void;
    filterMode: FilterMode[];
    setFilterMode: Dispatch<SetStateAction<FilterMode[]>>;
    handleFilterChange: (mode: FilterMode) => void;
    favorites: string[];
    toggleFavorite: (id: string) => void;
    watched: string[];
    toggleWatched: (id: string) => void;
    userNotes: UserNotesMap;
    saveMovieNote: (id: string, rating: number, notes: string) => void;
    resetAll: () => void;
}