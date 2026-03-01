import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) => {
    if (totalPages <= 1) return null;

    const arrowClasses = `
    flex items-center gap-2 px-4 py-2 rounded-xl
    surface surface-hover
    text-sm font-medium
    transition-all duration-200
    disabled:opacity-30 disabled:cursor-not-allowed
    group
  `;

    return (
        <nav
            className="flex justify-center items-center gap-4 md:gap-8 my-12 p-3"
            aria-label="Navegação de páginas"
        >
            <button
                className={arrowClasses}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                title="Página anterior"
            >
                <ChevronLeft
                    size={20}
                    className="transition-transform group-hover:-translate-x-1"
                />
                <span className="hidden sm:inline">Anterior</span>
            </button>

            <div className="flex gap-1.5 p-1.5 rounded-2xl surface">
                {Array.from({ length: totalPages }, (_, i) => {
                    const page = i + 1;
                    const isActive = currentPage === page;

                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`
                w-10 h-10 rounded-lg
                flex items-center justify-center
                text-sm font-bold
                transition-all duration-200
                ${isActive
                                    ? 'accent-active'
                                    : 'text-muted hover:bg-[color-mix(in_oklab,var(--accent)_12%,transparent)]'}
              `}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            <button
                className={arrowClasses}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                title="Próxima página"
            >
                <span className="hidden sm:inline">Próximo</span>
                <ChevronRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                />
            </button>
        </nav>
    );
};