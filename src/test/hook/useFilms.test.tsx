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

    it('deve adicionar o filtro quando ele não está presente', () => {
        const { result } = renderHook(() => useFilms());

        expect(result.current.filterMode).toEqual([]);

        act(() => {
            result.current.handleFilterChange('favorites');
        });

        expect(result.current.filterMode).toEqual(['favorites']);
    });

    it('deve adicionar o filtro quando ele não está presente', () => {
        const { result } = renderHook(() => useFilms());

        expect(result.current.filterMode).toEqual([]);

        act(() => {
            result.current.handleFilterChange('favorites');
        });

        expect(result.current.filterMode).toEqual(['favorites']);
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

    it('deve filtrar apenas filmes marcados como assistidos (watched)', () => {
        (useFilmStorage as Mock).mockReturnValue({
            favorites: [],
            watched: ['2'],
            userNotes: {},
            toggleFavorite: vi.fn(),
            toggleWatched: vi.fn(),
            saveMovieNote: vi.fn(),
            resetAll: vi.fn(),
        });

        const { result } = renderHook(() => useFilms());

        act(() => {
            result.current.handleFilterChange('watched');
        });

        expect(result.current.filteredFilms).toHaveLength(1);
        expect(result.current.filteredFilms[0].id).toBe('2');
    });

    it('deve filtrar filmes com nota >= 90 (rating)', () => {
        const { result } = renderHook(() => useFilms());

        act(() => {
            result.current.handleFilterChange('rating');
        });

        expect(result.current.filteredFilms).toHaveLength(2);
    });

    it('deve filtrar apenas filmes com notas ou avaliação do usuário (withNotes)', () => {
        (useFilmStorage as Mock).mockReturnValue({
            favorites: [],
            watched: [],
            userNotes: {
                '1': { notes: 'Muito bom', userRating: 0 },
                '2': { notes: '', userRating: 0 },
            },
            toggleFavorite: vi.fn(),
            toggleWatched: vi.fn(),
            saveMovieNote: vi.fn(),
            resetAll: vi.fn(),
        });

        const { result } = renderHook(() => useFilms());

        act(() => {
            result.current.handleFilterChange('withNotes');
        });

        expect(result.current.filteredFilms).toHaveLength(1);
        expect(result.current.filteredFilms[0].id).toBe('1');
    });

    it('deve manter o filme quando o filtro não é reconhecido (return true)', () => {
        const { result } = renderHook(() => useFilms());

        act(() => {
            result.current.setFilterMode(['unknown-filter' as any]);
        });

        expect(result.current.filteredFilms).toHaveLength(2);
        expect(result.current.filteredFilms.map(f => f.id)).toEqual(['1', '2']);
    });
});