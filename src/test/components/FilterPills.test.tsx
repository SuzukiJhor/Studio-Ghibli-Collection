import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FilterPills } from '../../components/FilterPills';
import { FilterMode } from '../../types/ghibli';

describe('Componente FilterPills', () => {
    const mockOnToggle = vi.fn();
    const mockOnClear = vi.fn();

    const defaultProps = {
        activeFilters: [] as FilterMode[],
        onToggle: mockOnToggle,
        onClear: mockOnClear,
        showClear: false,
    };

    it('deve renderizar todas as opções de filtro (pills)', () => {
        render(<FilterPills {...defaultProps} />);

        expect(screen.getByText(/Assistidos/i)).toBeInTheDocument();
        expect(screen.getByText(/Favoritos/i)).toBeInTheDocument();
        expect(screen.getByText(/Anotações/i)).toBeInTheDocument();
        expect(screen.getByText(/Avaliações/i)).toBeInTheDocument();
    });

    it('deve aplicar classes de destaque quando um filtro está ativo', () => {
        render(<FilterPills {...defaultProps} activeFilters={['watched']} />);

        const watchedButton = screen.getByRole('button', { name: /assistidos/i });

        expect(watchedButton).toHaveClass('justify-center gap-2 px-3 py-2 rounded-lg');
    });

    it('deve chamar onToggle com o ID correto ao clicar em um pill', () => {
        render(<FilterPills {...defaultProps} />);

        const favoritesButton = screen.getByRole('button', { name: /favoritos/i });
        fireEvent.click(favoritesButton);

        expect(mockOnToggle).toHaveBeenCalledWith('favorites');
    });

    describe('Botão Limpar Filtros', () => {
        it('não deve mostrar o botão de limpar quando showClear for false', () => {
            render(<FilterPills {...defaultProps} showClear={false} />);

            expect(screen.queryByText(/Limpar Filtros/i)).not.toBeInTheDocument();
        });

        it('deve mostrar o botão de limpar quando showClear for true', () => {
            render(<FilterPills {...defaultProps} showClear={true} />);

            const clearButtons = screen.getAllByText(/Limpar/i);
            expect(clearButtons.length).toBeGreaterThan(0);
        });

        it('deve chamar onClear ao clicar no botão de limpar', () => {
            render(<FilterPills {...defaultProps} showClear={true} />);

            const clearButton = screen.getByRole('button', { name: /limpar filtros/i });
            fireEvent.click(clearButton);

            expect(mockOnClear).toHaveBeenCalledTimes(1);
        });
    });
});