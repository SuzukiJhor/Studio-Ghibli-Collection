import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { useFilms } from '../../hooks/useFilms';
import { useFetchFilms } from '../../hooks/useFetchFilms';
import { useFilmStorage } from '../../hooks/useFilmStorage';

vi.mock('../../hooks/useFetchFilms', () => ({
    useFetchFilms: vi.fn(),
}));
vi.mock('../../hooks/useFilmStorage', () => ({
    useFilmStorage: vi.fn(),
}));
vi.mock('../../utils/filmFilters', () => ({
    filmSorter: vi.fn(() => () => 0),
}));

const mockFilms = [
    {
        id: '1',
        title: 'Totoro',
        description: 'Floresta mágica',
        rt_score: '95',
    },
    {
        id: '2',
        title: 'Mononoke',
        description: 'Espíritos da floresta',
        rt_score: '90',
    },
];


beforeEach(() => {
    vi.clearAllMocks();

    (useFetchFilms as Mock).mockReturnValue({
        data: mockFilms,
        isLoading: false,
        error: null,
    });

    (useFilmStorage as Mock).mockReturnValue({
        favorites: ['1'],
        watched: [],
        userNotes: {},
        toggleFavorite: vi.fn(),
        toggleWatched: vi.fn(),
        saveMovieNote: vi.fn(),
        resetAll: vi.fn(),
    });
});


describe('useFilms', () => {
    it('deve retornar os filmes inicialmente', () => {
        const { result } = renderHook(() => useFilms());

        expect(result.current.filteredFilms).toHaveLength(2);
    });

    it('deve filtrar filmes pelo texto de busca', () => {
        const { result } = renderHook(() => useFilms());

        act(() => {
            result.current.setSearch('totoro');
        });

        expect(result.current.filteredFilms).toHaveLength(1);
        expect(result.current.filteredFilms[0].title).toBe('Totoro');
    });

    it('deve filtrar apenas filmes favoritos', () => {
        const { result } = renderHook(() => useFilms());

        act(() => {
            result.current.handleFilterChange('favorites');
        });

        expect(result.current.filteredFilms).toHaveLength(1);
        expect(result.current.filteredFilms[0].id).toBe('1');
    });

    it('deve resetar todos os filtros', () => {
        const { result } = renderHook(() => useFilms());

        act(() => {
            result.current.setSearch('teste');
            result.current.handleFilterChange('favorites');
            result.current.setIncludeDescription(true);
            result.current.resetFilters();
        });

        expect(result.current.search).toBe('');
        expect(result.current.filterMode).toEqual([]);
        expect(result.current.sortBy).toBe('title-asc');
        expect(result.current.includeDescription).toBe(false);
    });

    it('deve expor estados de loading e error', () => {
        (useFetchFilms as Mock).mockReturnValueOnce({
            data: [],
            isLoading: true,
            error: null,
        });

        const { result } = renderHook(() => useFilms());

        expect(result.current.loading).toBe(true);
        expect(result.current.error).toBeNull();
    });
});