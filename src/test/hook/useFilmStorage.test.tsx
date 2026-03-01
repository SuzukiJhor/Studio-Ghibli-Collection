import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFilmStorage } from '../../hooks/useFilmStorage';
import { useLocalStorage } from '../../hooks/useLocalStorage';

vi.mock('../../hooks/useLocalStorage', () => ({
    useLocalStorage: vi.fn(),
}));

describe('useFilmStorage', () => {
    let setUserNotes: any;
    let setFavorites: any;
    let setWatched: any;

    beforeEach(() => {
        vi.clearAllMocks();

        setUserNotes = vi.fn();
        setFavorites = vi.fn();
        setWatched = vi.fn();

        (useLocalStorage as vi.Mock)
            .mockImplementationOnce(() => [{}, setUserNotes])
            .mockImplementationOnce(() => [[], setFavorites])
            .mockImplementationOnce(() => [[], setWatched]);
    });

    it('deve retornar os estados iniciais', () => {
        const { result } = renderHook(() => useFilmStorage());

        expect(result.current.userNotes).toEqual({});
        expect(result.current.favorites).toEqual([]);
        expect(result.current.watched).toEqual([]);
    });

    it('deve adicionar e remover favorito', () => {
        const { result } = renderHook(() => useFilmStorage());

        act(() => {
            result.current.toggleFavorite('1');
        });

        expect(setFavorites).toHaveBeenCalledWith(expect.any(Function));

        const updater = setFavorites.mock.calls[0][0];
        expect(updater([])).toEqual(['1']);
        expect(updater(['1'])).toEqual([]);
    });

    it('deve adicionar e remover filme assistido', () => {
        const { result } = renderHook(() => useFilmStorage());

        act(() => {
            result.current.toggleWatched('2');
        });

        expect(setWatched).toHaveBeenCalledWith(expect.any(Function));

        const updater = setWatched.mock.calls[0][0];
        expect(updater([])).toEqual(['2']);
        expect(updater(['2'])).toEqual([]);
    });

    it('deve salvar nota do filme corretamente', () => {
        const { result } = renderHook(() => useFilmStorage());

        act(() => {
            result.current.saveNote('1', 4, 'Filme excelente');
        });

        expect(setUserNotes).toHaveBeenCalledWith(expect.any(Function));

        const updater = setUserNotes.mock.calls[0][0];

        expect(updater({})).toEqual({
            '1': {
                userRating: 4,
                notes: 'Filme excelente',
                isFavorite: false,
                isWatched: false,
            },
        });
    });
});