import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import toast from 'react-hot-toast';
import { useFilmContext } from '../../contexts/FilmContext';
import { useFilms } from '../../hooks/useFilms';
import { FilmProvider } from '../../provider/FilmProvider';

vi.mock('../../hooks/useFilms', () => ({
    useFilms: vi.fn(),
}));
vi.mock('react-hot-toast', () => {
    const toast = Object.assign(vi.fn(), {
        success: vi.fn(),
        error: vi.fn(),
        promise: vi.fn(),
    });

    return {
        default: toast,
    };
});

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

    it('handleFilterChange deve aplicar filtro e mostrar toast', () => {
        const { result } = renderHook(() => useFilmContext(), { wrapper });

        act(() => {
            result.current.handleFilterChange('favorites');
        });

        expect(toast.success).toHaveBeenCalled();
        expect(mockUseFilmsReturn.setFilterMode).toHaveBeenCalled();
    });

    it('toggleFavorite deve chamar toast correto', () => {
        const { result } = renderHook(() => useFilmContext(), { wrapper });

        act(() => {
            result.current.toggleFavorite('1');
        });

        expect(mockUseFilmsReturn.toggleFavorite).toHaveBeenCalledWith('1');
        expect(toast.success).toHaveBeenCalled();
    });

    it('toggleWatched deve chamar toast correto', () => {
        const { result } = renderHook(() => useFilmContext(), { wrapper });

        act(() => {
            result.current.toggleWatched('1');
        });

        expect(mockUseFilmsReturn.toggleWatched).toHaveBeenCalledWith('1');
        expect(toast.success).toHaveBeenCalled();
    });

    it('saveMovieNote deve salvar nota e mostrar toast', () => {
        const { result } = renderHook(() => useFilmContext(), { wrapper });

        act(() => {
            result.current.saveMovieNote('1', 5, 'Excelente filme');
        });

        expect(mockUseFilmsReturn.saveNote).toHaveBeenCalledWith(
            '1',
            5,
            'Excelente filme'
        );

        expect(toast.success).toHaveBeenCalled();
    });

    it('resetAll deve limpar filtros e mostrar toast', () => {
        const { result } = renderHook(() => useFilmContext(), { wrapper });

        act(() => {
            result.current.resetAll();
        });

        expect(mockUseFilmsReturn.setSearch).toHaveBeenCalledWith('');
        expect(mockUseFilmsReturn.setSortBy).toHaveBeenCalledWith('title-asc');
        expect(mockUseFilmsReturn.setIncludeDescription).toHaveBeenCalledWith(false);
        expect(mockUseFilmsReturn.setFilterMode).toHaveBeenCalledWith([]);
    });

    it('handleFilterChange deve remover filtro e chamar toast.error', () => {
        (useFilms as Mock).mockReturnValue({
            ...mockUseFilmsReturn,
            filterMode: ['favorites'],
        });

        const { result } = renderHook(() => useFilmContext(), { wrapper });

        act(() => {
            result.current.handleFilterChange('favorites');
        });

        expect(toast.error).toHaveBeenCalledWith(
            'Filtro removido',
            { icon: '🗑️', id: 'favorites' }
        );

        expect(mockUseFilmsReturn.setFilterMode).toHaveBeenCalled();
    });

    it('toggleWatched deve remover dos assistidos e mostrar toast neutro', () => {
        (useFilms as Mock).mockReturnValue({
            ...mockUseFilmsReturn,
            watched: ['1'],
        });

        const { result } = renderHook(() => useFilmContext(), { wrapper });

        act(() => {
            result.current.toggleWatched('1');
        });

        expect(mockUseFilmsReturn.toggleWatched).toHaveBeenCalledWith('1');

        expect(toast).toHaveBeenCalledWith(
            'Removido dos assistidos',
            { icon: '📁' }
        );
    });

    it('toggleFavorite deve remover dos favoritos e mostrar toast de remoção', () => {
        (useFilms as Mock).mockReturnValue({
            ...mockUseFilmsReturn,
            favorites: ['1'],
        });

        const { result } = renderHook(() => useFilmContext(), { wrapper });

        act(() => {
            result.current.toggleFavorite('1');
        });

        expect(mockUseFilmsReturn.toggleFavorite).toHaveBeenCalledWith('1');

        expect(toast).toHaveBeenCalledWith(
            'Removido dos favoritos',
            { icon: '💔', duration: 2000 }
        );
    });

    it('toggleWatched deve remover dos assistidos e mostrar toast neutro', () => {
        (useFilms as Mock).mockReturnValue({
            ...mockUseFilmsReturn,
            watched: ['1'],
        });

        const { result } = renderHook(() => useFilmContext(), { wrapper });

        act(() => {
            result.current.toggleWatched('1');
        });

        expect(mockUseFilmsReturn.toggleWatched).toHaveBeenCalledWith('1');

        expect(toast).toHaveBeenCalledWith(
            'Removido dos assistidos',
            { icon: '📁' }
        );
    });
});