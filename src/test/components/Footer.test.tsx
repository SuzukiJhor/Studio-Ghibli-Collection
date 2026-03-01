import { render, screen } from '@testing-library/react';
import { Footer } from '../../components/Footer';

describe('Footer component', () => {
    it('deve renderizar o logo SG.', () => {
        render(<Footer />);
        const logo = screen.getByText('SG');
        expect(logo).toHaveTextContent('SG.');
    });

    it('deve exibir o texto descritivo', () => {
        render(<Footer />);
        expect(
            screen.getByText(/Explorando a magia visual e narrativa/i)
        ).toBeInTheDocument();
    });

    it('deve conter link para a Ghibli API', () => {
        render(<Footer />);
        const link = screen.getByRole('link', { name: /Ghibli API/i });
        expect(link).toHaveAttribute('href', 'https://ghibliapi.vercel.app/');
    });

    it('deve conter link para o site oficial', () => {
        render(<Footer />);
        const link = screen.getByRole('link', { name: /Official Website/i });
        expect(link).toHaveAttribute(
            'href',
            'https://studioghibli.com.br/studioghibli/'
        );
    });

    it('deve exibir o ano atual', () => {
        const currentYear = new Date().getFullYear();
        render(<Footer />);
        expect(
            screen.getByText(`© ${currentYear} Studio Ghibli Collection.`)
        ).toBeInTheDocument();
    });

    it('deve exibir o nome do desenvolvedor', () => {
        render(<Footer />);
        const text = screen.getByText(/Desenvolvido com/i);
        expect(text).toHaveTextContent(
            'Desenvolvido com React 19 por Jhordan Suzuki'
        );
    });
});