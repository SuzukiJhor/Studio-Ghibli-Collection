import type { Film } from "../types/ghibli";
import { movieTranslations } from "../data/translations";

export const fetchAndTranslateFilms = async (): Promise<Film[]> => {
    const res = await fetch('https://ghibliapi.vercel.app/films');

    if (!res.ok) throw new Error('Falha ao conectar com a API do Studio Ghibli');

    const data: Film[] = await res.json();

    return data.map(film => ({
        ...film,
        description: movieTranslations[film.id]?.description || film.description
    }));
};