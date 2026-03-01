import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { useFilmContext } from '../../contexts/FilmContext';
import { useFilms } from '../../hooks/useFilms';
import { FilmProvider } from '../../provider/FilmProvider';
import { filmToasts } from '../../toasts/filmToasts';

vi.mock('../../hooks/useFilms', () => ({
    useFilms: vi.fn(),
}));

vi.mock('../../toasts/filmToasts', () => ({
    filmToasts: {
        loading: vi.fn(),
        success: vi.fn(),
        error: vi.fn(),

        filterApplied: vi.fn(),
        filterRemoved: vi.fn(),

        watchedAdded: vi.fn(),
        watchedRemoved: vi.fn(),

        favoriteAdded: vi.fn(),
        favoriteRemoved: vi.fn(),

        noteSaved: vi.fn(),
        noteRemoved: vi.fn(),

        resetFilters: vi.fn(),
    },
}));

const mockUseFilmsReturn = {
    filteredFilms: [],
    favorites: [],
    watched: [],
    userNotes: {},
    filterMode: [],
    search: '',
    sortBy: 'title-asc',
    includeDescription: false,
    loading: false,
    error: null,

    setSearch: vi.fn(),
    setSortBy: vi.fn(),
    setIncludeDescription: vi.fn(),
    setFilterMode: vi.fn(),

    toggleFavorite: vi.fn(),
    toggleWatched: vi.fn(),
    saveNote: vi.fn(),
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <FilmProvider>{children}</FilmProvider>
);

describe('FilmProvider', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (useFilms as Mock).mockReturnValue(mockUseFilmsReturn);
    });

    it('deve fornecer o contexto corretamente', () => {
        const { result } = renderHook(() => useFilmContext(), { wrapper });

        expect(result.current).toBeDefined();
        expect(result.current.films).toEqual([]);
        expect(result.current.loading).toBe(false);
    });

    it('deve disparar toast de loading quando loading = true', () => {
        (useFilms as Mock).mockReturnValue({
            ...mockUseFilmsReturn,
            loading: true,
        });

        renderHook(() => useFilmContext(), { wrapper });

        expect(filmToasts.loading).toHaveBeenCalled();
    });

    it('deve disparar toast de erro quando error existir', () => {
        (useFilms as Mock).mockReturnValue({
            ...mockUseFilmsReturn,
            error: new Error('Erro na API'),
        });

        renderHook(() => useFilmContext(), { wrapper });

        expect(filmToasts.error).toHaveBeenCalledWith('Erro na API');
    });

    it('handleFilterChange deve aplicar filtro', () => {
        const { result } = renderHook(() => useFilmContext(), { wrapper });

        act(() => {
            result.current.handleFilterChange('favorites');
        });

        expect(filmToasts.filterApplied).toHaveBeenCalled();
        expect(mockUseFilmsReturn.setFilterMode).toHaveBeenCalled();
    });

    it('handleFilterChange deve remover filtro', () => {
        (useFilms as Mock).mockReturnValue({
            ...mockUseFilmsReturn,
            filterMode: ['favorites'],
        });

        const { result } = renderHook(() => useFilmContext(), { wrapper });

        act(() => {
            result.current.handleFilterChange('favorites');
        });

        expect(filmToasts.filterRemoved).toHaveBeenCalled();
    });

    it('toggleFavorite deve adicionar favorito', () => {
        const { result } = renderHook(() => useFilmContext(), { wrapper });

        act(() => {
            result.current.toggleFavorite('1');
        });

        expect(mockUseFilmsReturn.toggleFavorite).toHaveBeenCalledWith('1');
        expect(filmToasts.favoriteAdded).toHaveBeenCalled();
    });

    it('toggleFavorite deve remover favorito', () => {
        (useFilms as Mock).mockReturnValue({
            ...mockUseFilmsReturn,
            favorites: ['1'],
        });

        const { result } = renderHook(() => useFilmContext(), { wrapper });

        act(() => {
            result.current.toggleFavorite('1');
        });

        expect(filmToasts.favoriteRemoved).toHaveBeenCalled();
    });

    it('toggleWatched deve adicionar assistido', () => {
        const { result } = renderHook(() => useFilmContext(), { wrapper });

        act(() => {
            result.current.toggleWatched('1');
        });

        expect(filmToasts.watchedAdded).toHaveBeenCalled();
    });

    it('toggleWatched deve remover assistido', () => {
        (useFilms as Mock).mockReturnValue({
            ...mockUseFilmsReturn,
            watched: ['1'],
        });

        const { result } = renderHook(() => useFilmContext(), { wrapper });

        act(() => {
            result.current.toggleWatched('1');
        });

        expect(filmToasts.watchedRemoved).toHaveBeenCalled();
    });

    it('saveMovieNote deve salvar nota', () => {
        const { result } = renderHook(() => useFilmContext(), { wrapper });

        act(() => {
            result.current.saveMovieNote('1', 5, 'Excelente');
        });

        expect(mockUseFilmsReturn.saveNote).toHaveBeenCalledWith('1', 5, 'Excelente');
        expect(filmToasts.noteSaved).toHaveBeenCalled();
    });

    it('saveMovieNote deve remover nota quando zerada', () => {
        const { result } = renderHook(() => useFilmContext(), { wrapper });

        act(() => {
            result.current.saveMovieNote('1', 0, '');
        });

        expect(filmToasts.noteRemoved).toHaveBeenCalled();
    });

    it('resetAll deve limpar filtros e disparar toast', () => {
        const { result } = renderHook(() => useFilmContext(), { wrapper });

        act(() => {
            result.current.resetAll();
        });

        expect(mockUseFilmsReturn.setSearch).toHaveBeenCalledWith('');
        expect(mockUseFilmsReturn.setSortBy).toHaveBeenCalledWith('title-asc');
        expect(mockUseFilmsReturn.setIncludeDescription).toHaveBeenCalledWith(false);
        expect(mockUseFilmsReturn.setFilterMode).toHaveBeenCalledWith([]);
        expect(filmToasts.resetFilters).toHaveBeenCalled();
    });
});