import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SortSelect } from '../../components/SortSelect';

describe('SortSelect component', () => {
    it('deve renderizar o select corretamente', () => {
        render(
            <SortSelect value="title-asc" onChange={() => { }} />
        );

        expect(
            screen.getByRole('combobox')
        ).toBeInTheDocument();
    });

    it('deve exibir o valor selecionado via props', () => {
        render(
            <SortSelect value="duration-desc" onChange={() => { }} />
        );

        const select = screen.getByRole('combobox') as HTMLSelectElement;

        expect(select.value).toBe('duration-desc');
    });

    it('deve chamar onChange ao alterar a opção', () => {
        const handleChange = vi.fn();

        render(
            <SortSelect value="title-asc" onChange={handleChange} />
        );

        fireEvent.change(
            screen.getByRole('combobox'),
            { target: { value: 'score-desc' } }
        );

        expect(handleChange).toHaveBeenCalledWith('score-desc');
    });

    it('deve conter opções principais de ordenação', () => {
        render(
            <SortSelect value="title-asc" onChange={() => { }} />
        );

        expect(
            screen.getByText('Título (A-Z)')
        ).toBeInTheDocument();

        expect(
            screen.getByText('Melhor Avaliados')
        ).toBeInTheDocument();

        expect(
            screen.getByText('Mais Recentes')
        ).toBeInTheDocument();
    });

    it('deve funcionar corretamente como componente controlado', () => {
        const handleChange = vi.fn();

        const { rerender } = render(
            <SortSelect value="year-desc" onChange={handleChange} />
        );

        expect(
            (screen.getByRole('combobox') as HTMLSelectElement).value
        ).toBe('year-desc');

        rerender(
            <SortSelect value="year-asc" onChange={handleChange} />
        );

        expect(
            (screen.getByRole('combobox') as HTMLSelectElement).value
        ).toBe('year-asc');
    });
});