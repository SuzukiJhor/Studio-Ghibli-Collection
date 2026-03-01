import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MovieCard } from '../../components/MovieCard';

const mockFilmContext = {
    search: '',
    includeDescription: false,
};

vi.mock('../../contexts/FilmContext', () => ({
    useFilmContext: () => mockFilmContext,
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

        expect(screen.getByTestId('note-modal')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Salvar'));

        expect(onSaveNote).toHaveBeenCalledTimes(1);
        expect(onSaveNote).toHaveBeenCalledWith(5, 'Ótimo filme');
    });

    it('deve exibir nota do usuário quando existir', () => {
        render(
            <MovieCard
                film={mockFilm}
                isFavorite={false}
                isWatched={false}
                userData={{
                    userRating: 4,
                    notes: 'Muito bom',
                    isFavorite: false,
                    isWatched: false,
                }}
                onFavorite={vi.fn()}
                onWatched={vi.fn()}
                onSaveNote={vi.fn()}
            />
        );

        expect(screen.getByText('Sua nota: 4/5')).toBeInTheDocument();
    });

    it('deve fechar o modal ao clicar em "Fechar"', () => {
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

        fireEvent.click(screen.getByText('Fechar'));

        expect(screen.queryByTestId('note-modal')).not.toBeInTheDocument();
    });

    it('deve exibir o selo de favorito quando isFavorite for true', () => {
        render(
            <MovieCard
                film={mockFilm}
                isFavorite={true}
                isWatched={false}
                onFavorite={vi.fn()}
                onWatched={vi.fn()}
                onSaveNote={vi.fn()}
            />
        );

        const favoritos = screen.getAllByTitle('Favorito');

        const badge = favoritos.find(el => el.tagName === 'DIV');

        expect(badge).toBeInTheDocument();
    });

    it('deve marcar o botão "Visto" como ativo quando isWatched for true', () => {
        render(
            <MovieCard
                film={mockFilm}
                isWatched={true}
                isFavorite={false}
                onWatched={vi.fn()}
                onFavorite={vi.fn()}
                onSaveNote={vi.fn()}
            />
        );

        const watchedButton = screen.getByRole('button', {
            name: /assistido/i,
        });

        expect(watchedButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('deve destacar o texto da descrição quando includeDescription for true e search existir', () => {
        mockFilmContext.search = 'mágico';
        mockFilmContext.includeDescription = true;

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

        const highlighted = screen.getByText('mágico');

        expect(highlighted.tagName).toBe('MARK');
    });
});