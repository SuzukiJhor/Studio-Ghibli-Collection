import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MovieCard } from '../../components/MovieCard';

const mockFilmContext = {
    search: '',
    includeDescription: false,
};

vi.mock('../../contexts/FilmContext', () => ({
    useFilmContext: () => mockFilmContext,
}));

vi.mock('../../components/NoteModal', () => ({
    NoteModal: ({ movieTitle, onClose, onSave, onDelete }: any) => (
        <div data-testid="note-modal">
            <span>{movieTitle}</span>
            <button onClick={() => onSave(5, 'Ótimo filme')}>Salvar</button>
            <button onClick={onClose}>Fechar</button>
            <button onClick={onDelete}>Excluir</button>
        </div>
    ),
}));

const mockFilm = {
    id: '1',
    title: 'Spirited Away',
    description: 'Uma garota entra em um mundo mágico cheio de espíritos.',
    descriptionTranslated:
        'Uma garota entra em um mundo mágico cheio de espíritos.',
    image: 'https://image.test/spirited.jpg',
    release_date: '2001',
    running_time: '125',
    rt_score: '97',
    director: 'Hayao Miyazaki',
    producer: 'Toshio Suzuki',
    original_title: '',
    original_title_romanised: '',
    movie_banner: '',
};

describe('MovieCard component', () => {
    beforeEach(() => {
        mockFilmContext.search = '';
        mockFilmContext.includeDescription = false;
    });

    it('renderiza informações principais do filme', () => {
        render(
            <MovieCard
                film={mockFilm as any}
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

    it('chama onWatched ao clicar em "Visto"', () => {
        const onWatched = vi.fn();

        render(
            <MovieCard
                film={mockFilm as any}
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

    it('chama onFavorite ao clicar em "Amei"', () => {
        const onFavorite = vi.fn();

        render(
            <MovieCard
                film={mockFilm as any}
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

    it('expande e recolhe a descrição', () => {
        render(
            <MovieCard
                film={mockFilm as any}
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

    it('abre o modal de notas', () => {
        render(
            <MovieCard
                film={mockFilm as any}
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

    it('salva nota e chama onSaveNote', () => {
        const onSaveNote = vi.fn();

        render(
            <MovieCard
                film={mockFilm as any}
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

    it('exibe nota do usuário quando existir', () => {
        render(
            <MovieCard
                film={mockFilm as any}
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

    it('fecha o modal ao clicar em "Fechar"', () => {
        render(
            <MovieCard
                film={mockFilm as any}
                isFavorite={false}
                isWatched={false}
                onFavorite={vi.fn()}
                onWatched={vi.fn()}
                onSaveNote={vi.fn()}
            />
        );

        fireEvent.click(screen.getByTitle('Anotações'));
        fireEvent.click(screen.getByText('Fechar'));

        expect(screen.queryByTestId('note-modal')).not.toBeInTheDocument();
    });

    it('destaca texto da descrição quando includeDescription e search existem', () => {
        mockFilmContext.search = 'mágico';
        mockFilmContext.includeDescription = true;

        render(
            <MovieCard
                film={mockFilm as any}
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

    it('reseta nota e fecha modal ao excluir', () => {
        const onSaveNoteSpy = vi.fn();

        render(
            <MovieCard
                film={mockFilm as any}
                isFavorite={false}
                isWatched={false}
                onFavorite={vi.fn()}
                onWatched={vi.fn()}
                onSaveNote={onSaveNoteSpy}
                userData={{
                    userRating: 4,
                    notes: 'Nota existente',
                    isFavorite: false,
                    isWatched: false,
                }}
            />
        );

        fireEvent.click(screen.getByTitle('Anotações'));
        fireEvent.click(screen.getByText('Excluir'));

        expect(onSaveNoteSpy).toHaveBeenCalledWith(0, '');
        expect(screen.queryByTestId('note-modal')).not.toBeInTheDocument();
    });

    it('deve alternar entre descrição original e traduzida ao clicar no botão', () => {
        render(
            <MovieCard
                film={mockFilm as any}
                isFavorite={false}
                isWatched={false}
                onFavorite={vi.fn()}
                onWatched={vi.fn()}
                onSaveNote={vi.fn()}
            />
        );

        const toggleButton = screen.getByText('Ver original');
        expect(toggleButton).toBeInTheDocument();

        fireEvent.click(toggleButton);

        expect(screen.getByText('Ver tradução')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Ver tradução'));

        expect(screen.getByText('Ver original')).toBeInTheDocument();
    });
});