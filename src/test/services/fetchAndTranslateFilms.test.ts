import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchAndTranslateFilms } from '../../services/fetchAndTranslateFilms';
import type { Film } from '../../types/ghibli';

vi.mock('../../data/translations', () => ({
    movieTranslations: {
        '1': {
            description: 'Descrição traduzida',
        },
    },
}));

const mockFilms: Film[] = [
    {
        id: '1',
        title: 'Spirited Away',
        description: 'Original description',
        director: 'Hayao Miyazaki',
        producer: 'Studio Ghibli',
        release_date: '2001',
        running_time: '125',
        rt_score: '97',
        image: 'image.jpg',
        original_title: '',
        original_title_romanised: '',
        movie_banner: ''
    },
];

describe('fetchAndTranslateFilms', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('deve retornar os filmes com descrição traduzida quando existir tradução', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockFilms,
        } as Response);

        const result = await fetchAndTranslateFilms();

        expect(result[0].description).toBe('Descrição traduzida');
    });

    it('deve manter a descrição original quando não houver tradução', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => [
                {
                    ...mockFilms[0],
                    id: 'id-inexistente',
                },
            ],
        } as Response);

        const result = await fetchAndTranslateFilms();

        expect(result[0].description).toBe('Original description');
    });

    it('deve lançar erro quando a API responder com erro', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
        } as Response);

        await expect(fetchAndTranslateFilms()).rejects.toThrow(
            'Falha ao conectar com a API do Studio Ghibli'
        );
    });
});