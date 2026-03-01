import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { FilmContext, useFilmContext } from '../../contexts/FilmContext';

describe('useFilmContext', () => {
    it('deve retornar o contexto quando usado dentro do FilmProvider', () => {
        const mockContextValue = {
            films: [],
            loading: false,
            error: null,
            setFilms: vi.fn(),
            refetch: vi.fn(),
        };

        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <FilmContext.Provider value={mockContextValue as any}>
                {children}
            </FilmContext.Provider>
        );

        const { result } = renderHook(() => useFilmContext(), { wrapper });

        expect(result.current).toBe(mockContextValue);
    });
});