import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MovieCard } from '../../components/MovieCard';

vi.mock('../../contexts/FilmContext', () => ({
    useFilmContext: () => ({
        search: '',
        includeDescription: false,
    }),
}));

vi.mock('../../components/NoteModal', () => ({
    NoteModal: ({ movieTitle, onClose, onSave }: any) => (
        <div data-testid="note-modal">
            <span>{movieTitle}</span>
            <button onClick={() => onSave(5, 'Ótimo filme')}>Salvar</button>
            <button onClick={onClose}>Fechar</button>
        </div>
    ),
}));

const mockFilm = {
    id: '1',
    title: 'Spirited Away',
    description: 'Uma garota entra em um mundo mágico cheio de espíritos.',
    image: 'https://image.test/spirited.jpg',
    release_date: '2001',
    running_time: '125',
    rt_score: '97',
    director: 'Hayao Miyazaki',
    producer: 'Toshio Suzuki',
} as any;

describe('MovieCard component', () => {
    it('deve renderizar informações principais do filme', () => {
        render(
            <MovieCard
                film={mockFilm}
                isFavorite={false}
                isWatched={false}
                onFavorite={vi.fn()}
                onWatched={vi.fn()}
                onSaveNote={vi.fn()}
            />
        );

        expect(screen.getByText('Spirited Away')).toBeInTheDocument();
        expect(screen.getByText('2001')).toBeInTheDocument();
        expect(screen.getByText('125m')).toBeInTheDocument();
        expect(screen.getByText('97%')).toBeInTheDocument();
    });

    it('deve chamar onWatched ao clicar em "Visto"', () => {
        const onWatched = vi.fn();

        render(
            <MovieCard
                film={mockFilm}
                isFavorite={false}
                isWatched={false}
                onFavorite={vi.fn()}
                onWatched={onWatched}
                onSaveNote={vi.fn()}
            />
        );

        fireEvent.click(screen.getByTitle('Assistido'));
        expect(onWatched).toHaveBeenCalledTimes(1);
    });

    it('deve chamar onFavorite ao clicar em "Amei"', () => {
        const onFavorite = vi.fn();

        render(
            <MovieCard
                film={mockFilm}
                isFavorite={false}
                isWatched={false}
                onFavorite={onFavorite}
                onWatched={vi.fn()}
                onSaveNote={vi.fn()}
            />
        );

        fireEvent.click(screen.getByTitle('Favorito'));
        expect(onFavorite).toHaveBeenCalledTimes(1);
    });

    it('deve expandir e recolher a descrição', () => {
        render(
            <MovieCard
                film={mockFilm}
                isFavorite={false}
                isWatched={false}
                onFavorite={vi.fn()}
                onWatched={vi.fn()}
                onSaveNote={vi.fn()}
            />
        );

        fireEvent.click(screen.getByText('Ler mais'));
        expect(screen.getByText('Menos')).toBeInTheDocument();
    });

    it('deve abrir o modal de notas', () => {
        render(
            <MovieCard
                film={mockFilm}
                isFavorite={false}
                isWatched={false}
                onFavorite={vi.fn()}
                onWatched={vi.fn()}
                onSaveNote={vi.fn()}
            />
        );

        fireEvent.click(screen.getByTitle('Anotações'));
        expect(screen.getByTestId('note-modal')).toBeInTheDocument();
    });

    it('deve salvar nota e chamar onSaveNote', () => {
        const onSaveNote = vi.fn();

        render(
            <MovieCard
                film={mockFilm}
                isFavorite={false}
                isWatched={false}
                onFavorite={vi.fn()}
                onWatched={vi.fn()}
                onSaveNote={onSaveNote}
            />
        );

        fireEvent.click(screen.getByTitle('Anotações'));
        fireEvent.click(screen.getByText('Salvar'));

        expect(onSaveNote).toHaveBeenCalledWith(5, 'Ótimo filme');
    });

    it('deve exibir nota do usuário quando existir', () => {
        render(
            <MovieCard
                film={mockFilm}
                isFavorite={false}
                isWatched={false}
                userData={{ userRating: 4, notes: 'Muito bom' }}
                onFavorite={vi.fn()}
                onWatched={vi.fn()}
                onSaveNote={vi.fn()}
            />
        );

        expect(screen.getByText('Sua nota: 4/5')).toBeInTheDocument();
    });
});