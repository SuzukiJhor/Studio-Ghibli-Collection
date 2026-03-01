import { Clapperboard } from 'lucide-react';

interface QuickSummaryProps {
    movieLenght: number;
}

export function QuickSummary({ movieLenght }: QuickSummaryProps) {
    return (
        <div className="flex justify-center my-4">
            <div
                className="
          group flex items-center gap-3 px-5 py-2 rounded-full
          backdrop-blur-md transition-all duration-300
          hover:-translate-y-0.5
        "
                style={{
                    backgroundColor:
                        'color-mix(in oklab, var(--accent) 6%, transparent)',
                    border: '1px solid',
                    borderColor:
                        'color-mix(in oklab, var(--accent) 25%, transparent)',
                    boxShadow:
                        '0 10px 25px color-mix(in oklab, var(--accent) 10%, transparent)',
                }}
            >
                <div
                    className="flex items-center transition-transform group-hover:scale-110"
                    style={{ color: 'var(--accent)' }}
                >
                    <Clapperboard size={18} strokeWidth={2.5} />
                </div>

                <p
                    className="text-[0.95rem] font-medium tracking-wide m-0"
                    style={{
                        color: 'color-mix(in oklab, var(--text) 65%, transparent)',
                    }}
                >
                    Exibindo{' '}
                    <span
                        className="font-extrabold text-[1.1rem] px-0.5"
                        style={{
                            color: 'var(--text)',
                            backgroundImage:
                                'linear-gradient(90deg, var(--text), color-mix(in oklab, var(--accent) 60%, var(--text)))',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                        }}
                    >
                        {movieLenght}
                    </span>{' '}
                    filmes
                </p>

                <div className="relative flex h-2 w-2">
                    <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        style={{ backgroundColor: 'var(--accent)' }}
                    />
                    <span
                        className="relative inline-flex rounded-full h-2 w-2"
                        style={{
                            backgroundColor: 'var(--accent)',
                            boxShadow: '0 0 8px var(--accent)',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}