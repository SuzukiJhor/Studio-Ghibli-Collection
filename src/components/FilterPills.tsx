import { Eye, Heart, Star, FileText, RotateCcw, type LucideIcon } from 'lucide-react';
import type { FilterMode } from '../types/ghibli';


interface FilterPillsProps {
    onClear: () => void;
    showClear: boolean;
    activeFilters: FilterMode[];
    onToggle: (id: FilterMode) => void;
}

const PILLS: { id: FilterMode; label: string; icon: LucideIcon }[] = [
    { id: 'watched', label: 'Assistidos', icon: Eye },
    { id: 'favorites', label: 'Favoritos', icon: Heart },
    { id: 'withNotes', label: 'Anotações', icon: FileText },
    { id: 'rating', label: 'Avaliações', icon: Star },
];

export const FilterPills = ({ activeFilters, onToggle, onClear, showClear }: FilterPillsProps) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full">
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
            <span className="text-[0.7rem] font-black text-indigo-400 uppercase tracking-[0.2em] shrink-0">Filtros</span>
            {showClear && (
                <button onClick={onClear} className="sm:hidden flex items-center gap-1 text-[10px] font-bold text-red-400 uppercase tracking-widest">
                    <RotateCcw size={12} /> Limpar
                </button>
            )}
        </div>

        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 w-full">
            {PILLS.map(({ id, label, icon: Icon }) => {
                const isActive = activeFilters.includes(id);
                return (
                    <button
                        key={id}
                        onClick={() => onToggle(id)}
                        className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold transition-all ${isActive ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                            }`}
                    >
                        <Icon size={14} /> {label}
                    </button>
                );
            })}

            {showClear && (
                <button onClick={onClear} className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-bold hover:bg-red-500/10 transition-all">
                    <RotateCcw size={14} /> Limpar Filtros
                </button>
            )}
        </div>
    </div>
);