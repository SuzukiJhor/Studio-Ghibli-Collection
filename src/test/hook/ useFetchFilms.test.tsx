import { describe, it, expect, vi, Mock } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useFetchFilms } from '../../hooks/useFetchFilms';
import { fetchAndTranslateFilms } from '../../services/fetchAndTranslateFilms';

vi.mock('../../services/fetchAndTranslateFilms', () => ({
    fetchAndTranslateFilms: vi.fn(),
}));

vi.mock('react-hot-toast', () => ({
    default: {
        promise: vi.fn(),
    },
}));

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
        },
    });

    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

describe('useFetchFilms', () => {
    it('deve buscar os filmes e chamar toast.promise', async () => {
        const mockFilms = [{ id: '1', title: 'Totoro' }];

        (fetchAndTranslateFilms as Mock).mockResolvedValueOnce(mockFilms);

        const { result } = renderHook(() => useFetchFilms(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(fetchAndTranslateFilms).toHaveBeenCalledTimes(1);
        expect(toast.promise).toHaveBeenCalledTimes(1);
        expect(result.current.data).toEqual(mockFilms);
    });

    it('deve formatar corretamente a mensagem de erro no toast', async () => {
        const mockError = new Error('Falha na API');

        (fetchAndTranslateFilms as Mock).mockRejectedValueOnce(mockError);

        renderHook(() => useFetchFilms(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(toast.promise).toHaveBeenCalled();
        });

        const [, messages] = (toast.promise as Mock).mock.calls[0];

        expect(messages.error).toBeTypeOf('function');

        const errorMessage = messages.error(mockError);

        expect(errorMessage).toBe('Erro: Falha na API');
    });
});