import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MovieList } from '../../components/MovieList';
import { useFilmContext } from '../../contexts/FilmContext';

vi.mock('../../components/MovieCard', () => ({
    MovieCard: ({ film, onFavorite, onWatched }: any) => (
        <div data-testid="movie-card">
            <span>{film.title}</span>
            <button onClick={onFavorite}>fav</button>
            <button onClick={onWatched}>watched</button>
        </div>
    ),
}));

vi.mock('../../components/MovieSkeleton', () => ({
    MovieSkeleton: () => <div data-testid="movie-skeleton" />,
}));

vi.mock('../../components/QuickSummary', () => ({
    QuickSummary: ({ movieLenght }: any) => (
        <div data-testid="quick-summary">Total: {movieLenght}</div>
    ),
}));

vi.mock('../../components/EmptyState', () => ({
    EmptyState: ({ onReset }: any) => (
        <div data-testid="empty-state">
            <button onClick={onReset}>reset</button>
        </div>
    ),
}));

vi.mock('../../contexts/FilmContext');

const mockToggleFavorite = vi.fn();
const mockToggleWatched = vi.fn();
const mockSaveMovieNote = vi.fn();
const mockResetAll = vi.fn();

const mockFilms = [
    { id: '1', title: 'Spirited Away' },
    { id: '2', title: 'My Neighbor Totoro' },
];

describe('MovieList component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('deve renderizar skeletons quando loading for true', () => {
        (useFilmContext as any).mockReturnValue({
            loading: true,
            filteredFilms: [],
            favorites: [],
            watched: [],
            toggleFavorite: mockToggleFavorite,
            toggleWatched: mockToggleWatched,
            userNotes: {},
            saveMovieNote: mockSaveMovieNote,
            resetAll: mockResetAll,
        });

        render(<MovieList currentFilms={[]} />);
        expect(screen.getAllByTestId('movie-skeleton')).toHaveLength(8);
    });

    it('deve renderizar a lista de filmes e o resumo', () => {
        (useFilmContext as any).mockReturnValue({
            loading: false,
            filteredFilms: mockFilms,
            favorites: [],
            watched: [],
            toggleFavorite: mockToggleFavorite,
            toggleWatched: mockToggleWatched,
            userNotes: {},
            saveMovieNote: mockSaveMovieNote,
            resetAll: mockResetAll,
        });

        render(<MovieList currentFilms={mockFilms as any} />);

        expect(screen.getByTestId('quick-summary')).toHaveTextContent('Total: 2');
        expect(screen.getAllByTestId('movie-card')).toHaveLength(2);
    });

    it('deve chamar toggleFavorite ao clicar em favorito', () => {
        (useFilmContext as any).mockReturnValue({
            loading: false,
            filteredFilms: mockFilms,
            favorites: [],
            watched: [],
            toggleFavorite: mockToggleFavorite,
            toggleWatched: mockToggleWatched,
            userNotes: {},
            saveMovieNote: mockSaveMovieNote,
            resetAll: mockResetAll,
        });

        render(<MovieList currentFilms={mockFilms as any} />);

        fireEvent.click(screen.getAllByText('fav')[0]);
        expect(mockToggleFavorite).toHaveBeenCalledWith('1');
    });

    it('deve renderizar EmptyState quando não houver filmes filtrados', () => {
        (useFilmContext as any).mockReturnValue({
            loading: false,
            filteredFilms: [],
            favorites: [],
            watched: [],
            toggleFavorite: mockToggleFavorite,
            toggleWatched: mockToggleWatched,
            userNotes: {},
            saveMovieNote: mockSaveMovieNote,
            resetAll: mockResetAll,
        });

        render(<MovieList currentFilms={[]} />);
        expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    });

    it('deve chamar resetAll ao clicar no EmptyState', () => {
        (useFilmContext as any).mockReturnValue({
            loading: false,
            filteredFilms: [],
            favorites: [],
            watched: [],
            toggleFavorite: mockToggleFavorite,
            toggleWatched: mockToggleWatched,
            userNotes: {},
            saveMovieNote: mockSaveMovieNote,
            resetAll: mockResetAll,
        });

        render(<MovieList currentFilms={[]} />);
        fireEvent.click(screen.getByText('reset'));
        expect(mockResetAll).toHaveBeenCalled();
    });
});