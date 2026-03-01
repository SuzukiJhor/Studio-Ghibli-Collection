import { render, screen } from '@testing-library/react';
import { describe, it, beforeEach, expect } from 'vitest';
import { Header } from '../../components/Header';

describe('Header component', () => {
    beforeEach(() => {
        render(<Header />);
    });

    it('renders semantic header structure', () => {
        expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('renders the main heading (h1)', () => {
        const heading = screen.getByRole('heading', { level: 1 });

        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(/studio ghibli/i);
        expect(heading).toHaveTextContent(/film collection/i);
    });

    it('displays the Ghibli Universe badge', () => {
        expect(
            screen.getByText(/ghibli universe/i)
        ).toBeInTheDocument();
    });

    it('renders the main descriptive paragraph', () => {
        expect(
            screen.getByText(/explore o universo encantado/i)
        ).toBeInTheDocument();
    });

    it('highlights key concepts in the description', () => {
        expect(screen.getByText(/redefiniu a animação mundial/i)).toBeInTheDocument();
        expect(screen.getByText(/jornada/i)).toBeInTheDocument();
        expect(screen.getByText(/favoritos/i)).toBeInTheDocument();
        expect(screen.getByText(/história/i)).toBeInTheDocument();
    });
});