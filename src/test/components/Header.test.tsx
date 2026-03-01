import { render, screen } from '@testing-library/react';
import { Header } from '../../components/Header';

describe('Header component', () => {
    it('deve renderizar o título principal', () => {
        render(<Header />);

        const title = screen.getByRole('heading', { level: 1 });
        expect(title).toHaveTextContent('Collection');
        expect(title).toHaveTextContent('Studio Ghibli');
    });

    it('deve exibir o selo "Ghibli Universe"', () => {
        render(<Header />);

        expect(
            screen.getByText('Ghibli Universe')
        ).toBeInTheDocument();
    });

    it('deve renderizar o texto descritivo principal', () => {
        render(<Header />);

        expect(
            screen.getByText(/Explore o catálogo lendário do estúdio/i)
        ).toBeInTheDocument();
    });

    it('deve exibir o destaque "Organize sua jornada"', () => {
        render(<Header />);

        const paragraph = screen.getByText(/Explore o catálogo lendário/i);
        expect(paragraph).toHaveTextContent('Organize sua jornada');
    });

    it('deve renderizar corretamente a estrutura semântica', () => {
        render(<Header />);

        expect(screen.getByRole('banner')).toBeInTheDocument();

        expect(
            screen.getByRole('heading', { level: 1 })
        ).toBeInTheDocument();
    });
});