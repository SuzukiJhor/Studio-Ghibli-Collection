interface EmptyStateProps {
    onReset: () => void;
}

export const EmptyState = ({ onReset }: EmptyStateProps) => {
    return (
        <div
            className="
        flex flex-col items-center justify-center
        p-12 md:p-20 text-center
        rounded-3xl my-8
        animate-in fade-in slide-in-from-bottom-4 duration-700
      "
            style={{
                backgroundColor:
                    'color-mix(in oklab, var(--bg) 96%, transparent)',
                border: '2px dashed',
                borderColor:
                    'color-mix(in oklab, var(--text) 15%, transparent)',
            }}
        >
            <div
                className="w-20 h-20 mb-6 p-5 rounded-full flex items-center justify-center"
                style={{
                    backgroundColor:
                        'color-mix(in oklab, var(--accent) 12%, transparent)',
                    color: 'var(--accent)',
                }}
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="w-full h-full"
                >
                    <path
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        strokeLinecap="round"
                    />
                    <path
                        d="M10 7v3m0 0v3m0-3h3m-3 0H7"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            <h2
                className="text-3xl font-bold mb-2"
                style={{ color: 'var(--text)' }}
            >
                Nenhum filme encontrado
            </h2>

            <p
                className="text-lg leading-relaxed max-w-100 mb-8"
                style={{
                    color:
                        'color-mix(in oklab, var(--text) 65%, transparent)',
                }}
            >
                Não conseguimos encontrar o que você está procurando.
                <br className="hidden sm:block" />
                Tente ajustar seus filtros ou termos de busca para explorar o catálogo.
            </p>

            <button
                onClick={onReset}
                className="
          px-8 py-3 rounded-xl font-semibold
          transition-all duration-300
          transform hover:-translate-y-1 active:scale-95
        "
                style={{
                    backgroundColor: 'var(--accent)',
                    color: '#fff',
                    boxShadow:
                        '0 10px 25px color-mix(in oklab, var(--accent) 35%, transparent)',
                }}
            >
                Limpar todos os filtros
            </button>
        </div>
    );
};