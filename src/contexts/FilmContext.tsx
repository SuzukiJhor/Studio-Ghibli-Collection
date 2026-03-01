import { createContext, useContext } from 'react';
import type { FilmContextData } from './type';

export const FilmContext = createContext<FilmContextData | undefined>(
    undefined
);

export const useFilmContext = () => {
    const context = useContext(FilmContext);
    if (!context) {
        throw new Error('useFilmContext deve ser usado dentro de um FilmProvider');
    }
    return context;
};