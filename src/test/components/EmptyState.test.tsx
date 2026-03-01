import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EmptyState } from '../../components/EmptyState';

describe('Componente EmptyState', () => {

    it('deve renderizar o título e a descrição corretamente', () => {
        render(<EmptyState onReset={() => { }} />);

        expect(screen.getByText(/Nenhum filme encontrado/i)).toBeInTheDocument();

        expect(screen.getByText(/Tente ajustar seus filtros/i)).toBeInTheDocument();
    });

    it('deve chamar a função onReset quando o botão for clicado', () => {
        const onResetMock = vi.fn();

        render(<EmptyState onReset={onResetMock} />);

        const button = screen.getByRole('button', { name: /Limpar todos os filtros/i });

        fireEvent.click(button);

        expect(onResetMock).toHaveBeenCalledTimes(1);
    });

    it('deve exibir o ícone de busca (SVG)', () => {
        const { container } = render(<EmptyState onReset={() => { }} />);

        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });
});