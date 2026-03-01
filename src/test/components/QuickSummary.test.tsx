import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QuickSummary } from '../../components/QuickSummary';

describe('QuickSummary component', () => {
    it('deve renderizar o texto base corretamente', () => {
        render(<QuickSummary movieLenght={10} />);

        expect(
            screen.getByText(/exibindo/i)
        ).toBeInTheDocument();

        expect(
            screen.getByText(/filmes/i)
        ).toBeInTheDocument();
    });

    it('deve exibir corretamente a quantidade de filmes', () => {
        render(<QuickSummary movieLenght={7} />);

        expect(
            screen.getByText('7')
        ).toBeInTheDocument();
    });

    it('deve atualizar corretamente quando movieLenght mudar', () => {
        const { rerender } = render(
            <QuickSummary movieLenght={3} />
        );

        expect(screen.getByText('3')).toBeInTheDocument();

        rerender(<QuickSummary movieLenght={12} />);

        expect(screen.getByText('12')).toBeInTheDocument();
    });
});