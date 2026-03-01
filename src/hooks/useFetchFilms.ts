import { useQuery } from '@tanstack/react-query';
import { fetchAndTranslateFilms } from '../services/fetchAndTranslateFilms';

export function useFetchFilms() {
    return useQuery({
        queryKey: ['ghibli-films'],
        queryFn: fetchAndTranslateFilms,
        staleTime: 1000 * 60 * 10,
        retry: 2,
    });
}