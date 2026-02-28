import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    if (totalPages <= 1) return null;
    const arrowClasses = "flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-slate-200 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed not:disabled:hover:bg-white/5 not:disabled:hover:border-indigo-500/50 not:disabled:hover:text-white group";

    return (
        <nav className="flex justify-center items-center gap-4 md:gap-8 my-12 p-3" aria-label="Navegação de páginas">

            <button
                className={arrowClasses}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                title="Página Anterior"
            >
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline font-medium text-sm">Anterior</span>
            </button>

            <div className="flex gap-1.5 p-1.5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                {Array.from({ length: totalPages }, (_, i) => {
                    const pageNumber = i + 1;
                    const isActive = currentPage === pageNumber;

                    return (
                        <button
                            key={pageNumber}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-200
                                ${isActive
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                                    : 'text-slate-400 hover:bg-white/10 hover:text-white'
                                }`}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
            </div>

            <button
                className={arrowClasses}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                title="Próxima Página"
            >
                <span className="hidden sm:inline font-medium text-sm">Próximo</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </nav>
    );
};