import { Search } from 'lucide-react';

interface SearchInputProps {
    value: string;
    onChange: (val: string) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => (
    <div className="relative w-full flex items-center group">
        <Search size={22} className="absolute left-5 text-indigo-500 transition-colors group-focus-within:text-indigo-400" />
        <input
            type="text"
            placeholder="Search movies..."
            value={value}
            className="w-full py-4 pl-14 pr-5 bg-black/20 border border-white/10 rounded-xl text-white text-lg transition-all focus:outline-none focus:border-indigo-500 focus:bg-black/40 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-500"
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);