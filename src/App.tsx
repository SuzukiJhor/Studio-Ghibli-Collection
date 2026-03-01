import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Footer } from './components/Footer';
import { toastStyles } from './toasts/style';
import { Header } from './components/Header';
import { MovieList } from './components/MovieList';
import { FilterBar } from './components/FilterBar';
import { Pagination } from './components/Pagination';
import { ThemeToggle } from './components/ThemeToggle';
import { FilmProvider } from './provider/FilmProvider';
import { useFilmContext } from './contexts/FilmContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';

const queryClient = new QueryClient();
const ITEMS_PER_PAGE = 8;

function AppContent() {
    const { filteredFilms } = useFilmContext();
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const totalPages = Math.ceil(filteredFilms.length / ITEMS_PER_PAGE);
    const currentFilms = filteredFilms.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Header />
            <ThemeToggle />
            <FilterBar onPageReset={() => setCurrentPage(1)} />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            <MovieList currentFilms={currentFilms} />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            <Footer />
        </>
    );
}

export default function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <FilmProvider>
                    <Toaster
                        position="bottom-right"
                        toastOptions={toastStyles}
                    />
                    <AppContent />
                </FilmProvider>
            </QueryClientProvider>
        </>
    );
};