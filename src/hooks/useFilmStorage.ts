import type { UserNotesMap } from "../types/ghibli";
import { useLocalStorage } from "./useLocalStorage";

export function useFilmStorage() {
    const [userNotes, setUserNotes] = useLocalStorage<UserNotesMap>('@Ghibli:userNotes', {});
    const [favorites, setFavorites] = useLocalStorage<string[]>('@Ghibli:favorites', []);
    const [watched, setWatched] = useLocalStorage<string[]>('@Ghibli:watched', []);

    const toggleFavorite = (id: string) =>
        setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

    const toggleWatched = (id: string) =>
        setWatched(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]);

    const saveNote = (id: string, rating: number, notes: string) =>
        setUserNotes(prev => ({
            ...prev,
            [id]: {
                userRating: rating,
                notes,
                isFavorite: prev[id]?.isFavorite ?? false,
                isWatched: prev[id]?.isWatched ?? false,
            },
        }));

    return { userNotes, favorites, watched, toggleFavorite, toggleWatched, saveNote };
}