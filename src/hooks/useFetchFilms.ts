import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { fetchAndTranslateFilms } from '../services/fetchAndTranslateFilms';

export function useFetchFilms() {

    return useQuery({
        queryKey: ['ghibli-films'],
        queryFn: async () => {
            
            const promise = fetchAndTranslateFilms();

            toast.promise(promise, {
                loading: 'Buscando catálogo Ghibli...',
                success: 'Filmes carregados com sucesso!',
                error: (err) => `Erro: ${err.message}`,
            }, {
                id: 'fetch-films',
            });

            return promise;
        },
        staleTime: 1000 * 60 * 10, 
        retry: 2,
    });
}