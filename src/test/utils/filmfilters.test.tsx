import { describe, it, expect } from 'vitest';
import { Film, UserNotesMap } from '../../types/ghibli';
import { filmSorter } from '../../utils/filmFilters';

describe('filmSorter utility', () => {
    const filmA = {
        id: '1',
        title: 'Castle in the Sky',
        running_time: '124',
        rt_score: '95',
        release_date: '1986'
    } as Film;

    const filmB = {
        id: '2',
        title: 'My Neighbor Totoro',
        running_time: '86',
        rt_score: '93',
        release_date: '1988'
    } as Film;

    const userNotes: UserNotesMap = {
        '1': { userRating: 5, notes: '', isFavorite: true, isWatched: true },
        '2': { userRating: 3, notes: '', isFavorite: false, isWatched: false },
    };

    describe('Ordenação por Título', () => {
        it('deve ordenar títulos em ordem ascendente', () => {
            const sorter = filmSorter('title-asc', {});
            const result = sorter(filmA, filmB);
            expect(result).toBeLessThan(0);
        });

        it('deve ordenar títulos em ordem descendente', () => {
            const sorter = filmSorter('title-desc', {});
            const result = sorter(filmA, filmB);
            expect(result).toBeGreaterThan(0);
        });
    });

    describe('Ordenação por Números (Ano e Duração)', () => {
        it('deve ordenar por ano corretamente (asc)', () => {
            const sorter = filmSorter('year-asc', {});
            expect(sorter(filmA, filmB)).toBeLessThan(0);
        });

        it('deve ordenar por pontuação (rt_score) corretamente (desc)', () => {
            const sorter = filmSorter('score-desc', {});
            expect(sorter(filmA, filmB)).toBeLessThan(0);
        });
    });

    describe('Ordenação por Notas do Usuário (UserRating)', () => {
        it('deve usar o rating do usuário para ordenar', () => {
            const sorter = filmSorter('user-asc', userNotes);
            expect(sorter(filmA, filmB)).toBeGreaterThan(0);
        });

        it('deve considerar 0 se o usuário não tiver nota para o filme', () => {
            const sorter = filmSorter('user-asc', {});
            expect(sorter(filmA, filmB)).toBe(0);
        });
    });

    it('deve retornar 0 para um campo desconhecido', () => {
        const sorter = filmSorter('invalid-asc', {});
        expect(sorter(filmA, filmB)).toBe(0);
    });
});