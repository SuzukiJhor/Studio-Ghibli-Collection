import { Clapperboard } from 'lucide-react';

interface QuickSummaryProps {
    movieLenght: number;
}

export function QuickSummary({ movieLenght }: QuickSummaryProps) {
    return (
        <div className="flex justify-center my-4">
            <div className="group flex items-center gap-3 px-5 py-2 bg-indigo-500/5 backdrop-blur-md border border-indigo-500/20 rounded-full transition-all duration-300 hover:bg-indigo-500/10 hover:border-indigo-500 hover:-translate-y-0.5 shadow-lg shadow-indigo-500/5">
                <div className="text-indigo-500 flex items-center transition-transform group-hover:scale-110">
                    <Clapperboard size={18} strokeWidth={2.5} />
                </div>

                <p className="text-slate-400 text-[0.95rem] font-medium tracking-wide m-0">
                    Exibindo{' '}
                    <span className="text-white font-extrabold text-[1.1rem] bg-linear-to-r from-white to-indigo-200 bg-clip-text px-0.5">
                        {movieLenght}
                    </span>{' '}
                    filmes
                </p>

                <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500 shadow-[0_0_8px_#6366f1]"></span>
                </div>

            </div>
        </div>
    );
}