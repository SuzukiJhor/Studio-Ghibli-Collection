import { SearchInput } from './SearchInput';
import { FilterPills } from './FilterPills';
import { useFilmContext } from '../contexts/FilmContext';
import { SortSelect } from './SortSelect';

export const FilterBar = ({ onPageReset }: { onPageReset?: () => void }) => {
    const {
        search,
        setSearch,
        sortBy,
        setSortBy,
        filterMode,
        handleFilterChange,
        setFilterMode,
        includeDescription,
        setIncludeDescription,
    } = useFilmContext();

    const hasActiveFilters =
        search.length > 0 || filterMode.length > 0 || includeDescription;

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
        <section
            className="rounded-[20px] p-4 md:p-6 my-5 mx-auto max-w-7xl flex flex-col gap-6 shadow-2xl backdrop-blur-md border"
            style={{
                backgroundColor:
                    'color-mix(in oklab, var(--bg) 85%, transparent)',
                borderColor:
                    'color-mix(in oklab, var(--accent) 20%, transparent)',
                color: 'var(--text)',
            }}
        >
            <SearchInput
                value={search}
                onChange={(val) => wrapAction(() => setSearch(val))}
            />

            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 w-full">
                    <label
                        className="flex items-center gap-2.5 cursor-pointer text-sm transition-colors shrink-0"
                        style={{ color: 'var(--text)' }}
                    >
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={includeDescription}
                            onChange={(e) =>
                                setIncludeDescription(e.target.checked)
                            }
                        />

                        <div
                            className="w-4.5 h-4.5 rounded-[5px] border-2 transition-all"
                            style={{
                                borderColor:
                                    'color-mix(in oklab, var(--text) 30%, transparent)',
                                backgroundColor: includeDescription
                                    ? 'var(--accent)'
                                    : 'transparent',
                            }}
                        />

                        <span className="font-medium">
                            Incluir Sinopses
                        </span>
                    </label>

                    <div
                        className="hidden md:block w-px h-6"
                        style={{
                            backgroundColor:
                                'color-mix(in oklab, var(--text) 15%, transparent)',
                        }}
                    />

                    <FilterPills
                        activeFilters={filterMode}
                        onToggle={(id) =>
                            wrapAction(() => handleFilterChange(id))
                        }
                        onClear={handleResetAll}
                        showClear={hasActiveFilters}
                    />
                </div>

                <SortSelect
                    value={sortBy}
                    onChange={(val) => wrapAction(() => setSortBy(val))}
                />
            </div>
        </section>
    );
};