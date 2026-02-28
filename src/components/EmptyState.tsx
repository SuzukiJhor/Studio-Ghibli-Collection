interface EmptyStateProps {
    onReset: () => void;
}

export const EmptyState = ({ onReset }: EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center p-12 md:p-20 text-center bg-white/2 border-2 border-dashed border-white/10 rounded-3xl my-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            <div className="w-20 h-20 mb-6 p-5 bg-indigo-500/10 rounded-full text-indigo-500 flex items-center justify-center">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="w-full h-full"
                >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" />
                    <path d="M10 7v3m0 0v3m0-3h3m-3 0H7" strokeLinecap="round" />
                </svg>
            </div>

            <h2 className="text-3xl font-bold text-slate-50 mb-2">
                Nenhum filme encontrado
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-100 mb-8">
                Não conseguimos encontrar o que você está procurando. <br className="hidden sm:block" />
                Tente ajustar seus filtros ou termos de busca para explorar o catálogo.
            </p>

            <button
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 active:scale-95"
                onClick={onReset}
            >
                Limpar todos os filtros
            </button>
        </div>
    );
};