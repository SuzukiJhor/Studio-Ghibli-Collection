import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchAndTranslateFilms } from '../../services/fetchAndTranslateFilms';
import { useFetchFilms } from '../../hooks/useFetchFilms';

vi.mock('../../services/fetchAndTranslateFilms', () => ({
    fetchAndTranslateFilms: vi.fn(),
}));

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
        },
    });
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

describe('useFetchFilms Hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('deve retornar o estado inicial de carregamento', async () => {
        (fetchAndTranslateFilms as any).mockReturnValue(new Promise(() => { }));

        const { result } = renderHook(() => useFetchFilms(), {
            wrapper: createWrapper(),
        });

        expect(result.current.isLoading).toBe(true);
    });

    it('deve retornar os dados traduzidos com sucesso', async () => {
        const mockFilms = [
            { id: '1', title: 'Castelo Animado', description: 'Tradução PT-BR' },
        ];
        (fetchAndTranslateFilms as any).mockResolvedValue(mockFilms);

        const { result } = renderHook(() => useFetchFilms(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual(mockFilms);
        expect(fetchAndTranslateFilms).toHaveBeenCalledTimes(1);
    });
});