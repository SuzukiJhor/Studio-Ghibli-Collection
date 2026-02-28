import { SortAsc } from 'lucide-react';

interface SortSelectProps {
    value: string;
    onChange: (val: string) => void;
}

export const SortSelect = ({ value, onChange }: SortSelectProps) => (
    <div className="relative w-full xl:w-64 group">
        <SortAsc size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500 pointer-events-none" />
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full appearance-none bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-10 text-slate-300 text-sm focus:outline-none focus:border-indigo-400 cursor-pointer"
        >
            <optgroup label="Título" className="bg-[#1a1a1a]">
                <option value="title-asc">Título (A-Z)</option>
                <option value="title-desc">Título (Z-A)</option>
            </optgroup>
            <optgroup label="Duração" className="bg-[#1a1a1a]">
                <option value="duration-asc">Duração (Curto-Longo)</option>
                <option value="duration-desc">Duração (Longo-Curto)</option>
            </optgroup>
            <optgroup label="Avaliação Ghibli" className="bg-[#1a1a1a]">
                <option value="score-desc">Melhor Avaliados</option>
                <option value="score-asc">Menor Nota</option>
            </optgroup>
            <optgroup label="Sua Avaliação" className="bg-[#1a1a1a]">
                <option value="user-rating-desc">Sua Maior Nota</option>
                <option value="user-rating-asc">Sua Menor Nota</option>
            </optgroup>
            <optgroup label="Lançamento" className="bg-[#1a1a1a]">
                <option value="year-desc">Mais Recentes</option>
                <option value="year-asc">Mais Antigos</option>
            </optgroup>
        </select>
    </div>
);