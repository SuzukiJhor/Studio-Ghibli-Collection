import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NoteModal } from '../../components/NoteModal';

describe('NoteModal component', () => {
    const defaultProps = {
        movieTitle: 'Spirited Away',
        initialRating: 3,
        initialNotes: 'Muito bom',
        onClose: vi.fn(),
        onSave: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('deve renderizar o modal com o título do filme', () => {
        render(<NoteModal {...defaultProps} />);

        expect(
            screen.getByText(/editar notas/i)
        ).toBeInTheDocument();

        expect(
            screen.getByText(/para spirited away/i)
        ).toBeInTheDocument();
    });

    it('deve fechar o modal ao clicar em cancelar', () => {
        render(<NoteModal {...defaultProps} />);

        fireEvent.click(screen.getByText(/cancelar/i));

        expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it('deve permitir alterar a avaliação ao clicar nas estrelas', () => {
        render(<NoteModal {...defaultProps} />);

        const star5 = screen.getByLabelText('avaliar 5 estrelas');

        fireEvent.click(star5);

        expect(
            screen.getByText((content) => content.startsWith('5'))
        ).toBeInTheDocument();
    });

    it('deve permitir editar as notas', () => {
        render(<NoteModal {...defaultProps} />);

        const textarea = screen.getByPlaceholderText(
            /escreva algo sobre o filme/i
        );

        fireEvent.change(textarea, {
            target: { value: 'Obra-prima absoluta' },
        });

        expect(textarea).toHaveValue('Obra-prima absoluta');
    });

    it('deve chamar onSave com rating e notas corretos', () => {
        render(<NoteModal {...defaultProps} />);

        fireEvent.click(screen.getByLabelText('avaliar 4 estrelas'));

        fireEvent.change(
            screen.getByPlaceholderText(/escreva algo sobre o filme/i),
            { target: { value: 'Filme incrível' } }
        );

        fireEvent.click(screen.getByText(/salvar notas/i));

        expect(defaultProps.onSave).toHaveBeenCalledWith(
            4,
            'Filme incrível'
        );
    });

    it('deve destacar estrelas ao passar o mouse e remover ao sair', () => {
        render(<NoteModal {...defaultProps} />);

        const star3Button = screen.getByLabelText('avaliar 3 estrelas');
        const star3Icon = star3Button.querySelector('svg');

        expect(star3Icon).toHaveClass('text-yellow-400');

        const star5Button = screen.getByLabelText('avaliar 5 estrelas');
        const star5Icon = star5Button.querySelector('svg');

        fireEvent.mouseEnter(star5Button);

        expect(star5Icon).toHaveClass('text-yellow-400');

        fireEvent.mouseLeave(star5Button);

        expect(star5Icon).not.toHaveClass('text-yellow-400');
    });
});