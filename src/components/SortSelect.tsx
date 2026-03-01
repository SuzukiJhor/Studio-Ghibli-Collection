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
            className="w-full appearance-none rounded-xl py-3 pl-12 pr-10 text-sm cursor-pointer transition-colors focus:outline-none "
            style={{
                backgroundColor: 'color-mix(in oklab, var(--bg) 85%, transparent)',
                color: 'var(--text)',
                border: '1px solid',
                borderColor: 'color-mix(in oklab, var(--text) 12%, transparent)',
                colorScheme: 'dark light',
            }}

        >
            <optgroup label="Título" className="bg-(--bg) text-(--text)">
                <option value="title-asc">Título (A-Z)</option>
                <option value="title-desc">Título (Z-A)</option>
            </optgroup>
            <optgroup label="Duração" className="bg-(--bg) text-(--text)">
                <option value="duration-asc">Duração (Curto-Longo)</option>
                <option value="duration-desc">Duração (Longo-Curto)</option>
            </optgroup>
            <optgroup label="Avaliação Ghibli" className="bg-(--bg) text-(--text)">
                <option value="score-desc">Melhor Avaliados</option>
                <option value="score-asc">Menor Nota</option>
            </optgroup>
            <optgroup label="Sua Avaliação" className="bg-(--bg) text-(--text)">
                <option value="user-rating-desc">Sua Maior Nota</option>
                <option value="user-rating-asc">Sua Menor Nota</option>
            </optgroup>
            <optgroup label="Lançamento" className="bg-(--bg) text-(--text)">
                <option value="year-desc">Mais Recentes</option>
                <option value="year-asc">Mais Antigos</option>
            </optgroup>
        </select>
    </div>
);