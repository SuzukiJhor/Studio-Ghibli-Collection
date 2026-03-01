import { Search } from 'lucide-react';

interface SearchInputProps {
    value: string;
    onChange: (val: string) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
    return (
        <div className="relative w-full flex items-center group">
            <Search
                size={22}
                className="absolute left-5 transition-colors"
                style={{
                    color: 'var(--accent)',
                }}
            />

            <input
                type="text"
                placeholder="Buscar filmes..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full py-4 pl-14 pr-5 rounded-xl text-lg transition-all focus:outline-none focus:ring-4"
                style={{
                    backgroundColor:
                        'color-mix(in oklab, var(--bg) 85%, transparent)',
                    border: '1px solid',
                    borderColor:
                        'color-mix(in oklab, var(--text) 15%, transparent)',
                    color: 'var(--text)',
                }}
            />

            <style>{`
                input:focus {
                    border-color: var(--accent);
                    background-color: color-mix(in oklab, var(--bg) 75%, transparent);
                    box-shadow: 0 0 0 4px color-mix(in oklab, var(--accent) 18%, transparent);
                }

                input::placeholder {
                    color: color-mix(in oklab, var(--text) 45%, transparent);
                }
            `}</style>
        </div>
    );
};