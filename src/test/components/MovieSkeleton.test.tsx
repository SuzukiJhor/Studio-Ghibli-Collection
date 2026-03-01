import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MovieSkeleton } from '../../components/MovieSkeleton';

describe('MovieSkeleton component', () => {
    it('deve renderizar o skeleton', () => {
        render(<MovieSkeleton />);
        expect(
            screen.getByRole('status', { name: /carregando filme/i })
        ).toBeInTheDocument();
    });
});