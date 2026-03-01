import type { Film, UserNotesMap } from "../types/ghibli";

export const filmSorter = (sortBy: string, userNotes: UserNotesMap) => (a: Film, b: Film) => {
    
    const [field, direction] = sortBy.split('-');
    const isAsc = direction === 'asc';
    const modifier = isAsc ? 1 : -1;

    switch (field) {
        case 'title': return a.title.localeCompare(b.title) * modifier;
        case 'duration': return (parseInt(a.running_time) - parseInt(b.running_time)) * modifier;
        case 'score': return (parseInt(a.rt_score) - parseInt(b.rt_score)) * modifier;
        case 'year': return (parseInt(a.release_date) - parseInt(b.release_date)) * modifier;
        case 'user':
            {
                const rA = userNotes[a.id]?.userRating || 0;
                const rB = userNotes[b.id]?.userRating || 0;
                return (rA - rB) * modifier;
            }
        default: return 0;
    }
};