import {
    Eye,
    Heart,
    Star,
    FileText,
    RotateCcw,
    type LucideIcon,
} from 'lucide-react';
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

export const FilterPills = ({
    activeFilters,
    onToggle,
    onClear,
    showClear,
}: FilterPillsProps) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full">
            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                <span
                    className="text-[0.7rem] font-black uppercase tracking-[0.2em] shrink-0"
                    style={{ color: 'var(--accent)' }}
                >
                    Filtros
                </span>

                {showClear && (
                    <button
                        onClick={onClear}
                        className="sm:hidden flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest"
                        style={{ color: 'color-mix(in oklab, red 70%, var(--text))' }}
                    >
                        <RotateCcw size={12} />
                        Limpar
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
                            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold transition-all"
                            style={{
                                backgroundColor: isActive
                                    ? 'color-mix(in oklab, var(--accent) 18%, transparent)'
                                    : 'color-mix(in oklab, var(--bg) 85%, transparent)',
                                borderColor: isActive
                                    ? 'color-mix(in oklab, var(--accent) 45%, transparent)'
                                    : 'color-mix(in oklab, var(--text) 15%, transparent)',
                                color: isActive ? 'var(--accent)' : 'var(--text)',
                                boxShadow: isActive
                                    ? '0 8px 24px color-mix(in oklab, var(--accent) 20%, transparent)'
                                    : undefined,
                            }}
                        >
                            <Icon size={14} />
                            {label}
                        </button>
                    );
                })}

                {showClear && (
                    <button
                        onClick={onClear}
                        className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-bold transition-all"
                        style={{
                            backgroundColor:
                                'color-mix(in oklab, red 8%, transparent)',
                            borderColor:
                                'color-mix(in oklab, red 35%, transparent)',
                            color:
                                'color-mix(in oklab, red 70%, var(--text))',
                        }}
                    >
                        <RotateCcw size={14} />
                        Limpar Filtros
                    </button>
                )}
            </div>
        </div>
    );
};