import { useMemo, useState } from "react";
import { useFetchFilms } from "./useFetchFilms";
import { filmSorter } from "../utils/filmFilters";
import type { FilterMode } from "../types/ghibli";
import { useFilmStorage } from "./useFilmStorage";

export function useFilms() {
    const { data: films = [], isLoading: loading, error } = useFetchFilms();
    const storage = useFilmStorage();

    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('title-asc');
    const [filterMode, setFilterMode] = useState<FilterMode[]>([]);
    const [includeDescription, setIncludeDescription] = useState(false);

    const filteredFilms = useMemo(() => {
        const term = search.toLowerCase();

        return films
            .filter(film => {
                const matchesModes = filterMode.every(mode => {
                    if (mode === 'favorites') return storage.favorites.includes(film.id);
                    if (mode === 'watched') return storage.watched.includes(film.id);
                    if (mode === 'rating') return Number(film.rt_score) >= 90;
                    if (mode === 'withNotes') {
                        const data = storage.userNotes[film.id];
                        return data && (data.notes.trim() !== '' || data.userRating > 0);
                    }
                    return true;
                });

                const matchesSearch = film.title.toLowerCase().includes(term) ||
                    (includeDescription && film.description.toLowerCase().includes(term));

                return matchesModes && matchesSearch;
            })
            .sort(filmSorter(sortBy, storage.userNotes));

    }, [films, storage, filterMode, search, includeDescription, sortBy]);

    const handleFilterChange = (mode: FilterMode) => {
        setFilterMode(prev =>
            prev.includes(mode) ? prev.filter(m => m !== mode) : [...prev, mode]
        );
    };

    const resetFilters = () => {
        setSearch('');
        setFilterMode([]);
        setSortBy('title-asc');
        setIncludeDescription(false);
    };

    return {
        loading,
        error,
        filteredFilms,
        search,
        setSearch,
        sortBy,
        setSortBy,
        filterMode,
        setFilterMode,
        handleFilterChange,
        includeDescription,
        setIncludeDescription,
        resetFilters,
        ...storage
    };
}