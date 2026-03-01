import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Pagination } from '../../components/Pagination';

describe('Pagination component', () => {
    const onPageChange = vi.fn();

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('não deve renderizar quando totalPages <= 1', () => {
        const { container } = render(
            <Pagination currentPage={1} totalPages={1} onPageChange={onPageChange} />
        );

        expect(container.firstChild).toBeNull();
    });

    it('deve renderizar todas as páginas corretamente', () => {
        render(
            <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
        );

        for (let i = 1; i <= 5; i++) {
            expect(screen.getByRole('button', { name: String(i) })).toBeInTheDocument();
        }
    });

    it('deve destacar a página ativa', () => {
        render(
            <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
        );

        const activeButton = screen.getByRole('button', { name: '3' });

        expect(activeButton).toHaveClass('bg-indigo-600');
    });

    it('deve desabilitar o botão Anterior na primeira página', () => {
        render(
            <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
        );

        const prevButton = screen.getByTitle(/página anterior/i);

        expect(prevButton).toBeDisabled();
    });

    it('deve desabilitar o botão Próximo na última página', () => {
        render(
            <Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />
        );

        const nextButton = screen.getByTitle(/próxima página/i);

        expect(nextButton).toBeDisabled();
    });

    it('deve chamar onPageChange ao clicar em uma página específica', () => {
        render(
            <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
        );

        fireEvent.click(screen.getByRole('button', { name: '4' }));

        expect(onPageChange).toHaveBeenCalledWith(4);
    });

    it('deve ir para a página anterior ao clicar em Anterior', () => {
        render(
            <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
        );

        fireEvent.click(screen.getByTitle(/página anterior/i));

        expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it('deve ir para a próxima página ao clicar em Próximo', () => {
        render(
            <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
        );

        fireEvent.click(screen.getByTitle(/próxima página/i));

        expect(onPageChange).toHaveBeenCalledWith(4);
    });
});