import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFilmContext } from '../../contexts/FilmContext';
import { FilterBar } from '../../components/FilterBar';

vi.mock('../../contexts/FilmContext', () => ({
    useFilmContext: vi.fn()
}));
vi.mock('../../components/FilterPills', () => ({
    FilterPills: ({
        onClear,
        onToggle,
        showClear,
    }: {
        onClear: () => void;
        onToggle: (id: string) => void;
        showClear: boolean;
    }) => (
        <div>
            <button onClick={() => onToggle('Ghibli')}>
                Toggle Ghibli
            </button>

            {showClear && (
                <button onClick={onClear}>Resetar filtros</button>
            )}
        </div>
    ),
}));
vi.mock('../../components/SearchInput', () => ({
    SearchInput: ({ value, onChange }: { value: string, onChange: (val: string) => void }) => (
        <input
            data-testid="mock-search-input"
            placeholder="Pesquisar..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    )
}));
vi.mock('../../components/SortSelect', () => ({
    SortSelect: ({
        value,
        onChange,
    }: {
        value: string;
        onChange: (val: string) => void;
    }) => (
        <select
            data-testid="mock-sort-select"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="title-asc">Título (A-Z)</option>
            <option value="year-desc">Ano (Desc)</option>
        </select>
    ),
}));

describe('Componente FilterBar', () => {
    const mockSetSearch = vi.fn();
    const mockSetFilterMode = vi.fn();
    const mockSetIncludeDescription = vi.fn();
    const mockSetSortBy = vi.fn();
    const mockHandleFilterChange = vi.fn();
    const mockOnPageReset = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        vi.mocked(useFilmContext).mockReturnValue({
            search: '',
            setSearch: mockSetSearch,
            sortBy: 'title-asc',
            setSortBy: mockSetSortBy,
            filterMode: [],
            setFilterMode: mockSetFilterMode,
            handleFilterChange: mockHandleFilterChange,
            includeDescription: false,
            setIncludeDescription: mockSetIncludeDescription,
            films: [],
            filteredFilms: [],
            loading: false,
            error: '',
            favorites: [],
            toggleFavorite: function (id: string): void {
                throw new Error('Function not implemented.');
            },
            watched: [],
            toggleWatched: function (id: string): void {
                throw new Error('Function not implemented.');
            },
            userNotes: undefined,
            saveMovieNote: function (id: string, rating: number, notes: string): void {
                throw new Error('Function not implemented.');
            },
            resetAll: function (): void {
                throw new Error('Function not implemented.');
            }
        });
    });

    it('deve renderizar os elementos principais da barra de filtros', () => {
        render(<FilterBar />);
        expect(screen.getByText(/Incluir Sinopses/i)).toBeInTheDocument();
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('deve chamar setSearch e onPageReset ao digitar na busca', () => {
        render(<FilterBar onPageReset={mockOnPageReset} />);

        const input = screen.getByPlaceholderText(/pesquisar/i);

        fireEvent.change(input, { target: { value: 'Totoro' } });

        expect(mockSetSearch).toHaveBeenCalledWith('Totoro');
        expect(mockOnPageReset).toHaveBeenCalled();
    });

    it('deve alternar a checkbox de incluir descrição', () => {
        render(<FilterBar />);

        const checkbox = screen.getByLabelText(/Incluir Sinopses/i);
        fireEvent.click(checkbox);

        expect(mockSetIncludeDescription).toHaveBeenCalledWith(true);
    });

    it('deve resetar todos os filtros ao clicar no botão de limpar', () => {

        vi.mocked(useFilmContext).mockReturnValue({
            search: 'Filtro Ativo',
            setSearch: mockSetSearch,
            sortBy: 'year-desc',
            setSortBy: mockSetSortBy,
            filterMode: ['Ghibli'],
            setFilterMode: mockSetFilterMode,
            handleFilterChange: mockHandleFilterChange,
            includeDescription: true,
            setIncludeDescription: mockSetIncludeDescription,
            films: [],
            filteredFilms: [],
            loading: false,
            error: '',
            favorites: [],
            watched: [],
            toggleFavorite: vi.fn(),
            toggleWatched: vi.fn(),
            saveMovieNote: vi.fn(),
            resetAll: vi.fn(),
        } as any);

        render(<FilterBar onPageReset={mockOnPageReset} />);

        const resetBtn = screen.getByText(/Resetar filtros/i);
        fireEvent.click(resetBtn);

        expect(mockSetSearch).toHaveBeenCalledWith('');
        expect(mockSetFilterMode).toHaveBeenCalledWith([]);
        expect(mockSetIncludeDescription).toHaveBeenCalledWith(false);
        expect(mockSetSortBy).toHaveBeenCalledWith('title-asc');
        expect(mockOnPageReset).toHaveBeenCalled();
    });

    it('deve chamar handleFilterChange ao alternar um filtro', () => {
        render(<FilterBar />);

        const toggleBtn = screen.getByText('Toggle Ghibli');
        fireEvent.click(toggleBtn);

        expect(mockHandleFilterChange).toHaveBeenCalledWith('Ghibli');
    });

    it('deve alterar ordenação ao mudar o SortSelect', () => {
        render(<FilterBar />);

        const select = screen.getByTestId('mock-sort-select');

        fireEvent.change(select, {
            target: { value: 'year-desc' },
        });

        expect(mockSetSortBy).toHaveBeenCalledWith('year-desc');
    });
});