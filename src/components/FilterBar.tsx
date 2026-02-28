import { SearchInput } from './SearchInput';
import { FilterPills } from './FilterPills';
import { useFilmContext } from '../contexts/FilmContext';
import { SortSelect } from './SortSelect';

export const FilterBar = ({ onPageReset }: { onPageReset?: () => void }) => {
    const {
        search, setSearch, sortBy, setSortBy, filterMode,
        handleFilterChange, setFilterMode, includeDescription, setIncludeDescription
    } = useFilmContext();

    const hasActiveFilters = search.length > 0 || filterMode.length > 0 || includeDescription;

    const wrapAction = (action: () => void) => {
        action();
        onPageReset?.();
    };

    const handleResetAll = () => {
        setSearch('');
        setFilterMode([]);
        setIncludeDescription(false);
        setSortBy('title-asc');
        onPageReset?.();
    };

    return (
        <section className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[20px] p-4 md:p-6 my-5 mx-auto max-w-7xl flex flex-col gap-6 shadow-2xl">
            <SearchInput value={search} onChange={(val) => wrapAction(() => setSearch(val))} />

            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 w-full">
                    <label className="flex items-center gap-2.5 cursor-pointer text-sm text-slate-400 hover:text-white transition-colors shrink-0">
                        <input type="checkbox" className="sr-only peer" checked={includeDescription} onChange={(e) => setIncludeDescription(e.target.checked)} />
                        <div className="w-4.5 h-4.5 border-2 border-white/20 rounded-[5px] peer-checked:bg-indigo-500 transition-all" />
                        <span className="font-medium">Incluir Sinopses</span>
                    </label>

                    <div className="hidden md:block w-px h-6 bg-white/10" />

                    <FilterPills
                        activeFilters={filterMode}
                        onToggle={(id) => wrapAction(() => handleFilterChange(id))}
                        onClear={handleResetAll}
                        showClear={hasActiveFilters}
                    />
                </div>

                <SortSelect value={sortBy} onChange={(val) => wrapAction(() => setSortBy(val))} />
            </div>
        </section>
    );
};