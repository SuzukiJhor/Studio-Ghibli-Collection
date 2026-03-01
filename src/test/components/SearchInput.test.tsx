import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchInput } from '../../components/SearchInput';

describe('SearchInput component', () => {
    it('deve renderizar o input com placeholder correto', () => {
        render(
            <SearchInput value="" onChange={() => { }} />
        );

        expect(
            screen.getByPlaceholderText(/search movies/i)
        ).toBeInTheDocument();
    });

    it('deve exibir o valor passado via props', () => {
        render(
            <SearchInput value="Ghibli" onChange={() => { }} />
        );

        const input = screen.getByRole('textbox') as HTMLInputElement;

        expect(input.value).toBe('Ghibli');
    });

    it('deve chamar onChange com o valor digitado', () => {
        const handleChange = vi.fn();

        render(
            <SearchInput value="" onChange={handleChange} />
        );

        const input = screen.getByRole('textbox');

        fireEvent.change(input, {
            target: { value: 'Totoro' },
        });

        expect(handleChange).toHaveBeenCalledWith('Totoro');
    });

    it('deve funcionar corretamente como input controlado', () => {
        const handleChange = vi.fn();

        const { rerender } = render(
            <SearchInput value="" onChange={handleChange} />
        );

        rerender(
            <SearchInput value="Spirited Away" onChange={handleChange} />
        );

        expect(
            (screen.getByRole('textbox') as HTMLInputElement).value
        ).toBe('Spirited Away');
    });
});