import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="absolute top-6 right-6">
            <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="
                inline-flex items-center justify-center
                h-10 w-10 rounded-full
                backdrop-blur-md
                border
                transition-all duration-300
                hover:scale-105
                active:scale-95
            "
                style={{
                    backgroundColor:
                        'color-mix(in oklab, var(--bg) 85%, transparent)',
                    borderColor:
                        'color-mix(in oklab, var(--text) 12%, transparent)',
                }}
            >
                {theme === 'dark' ? (
                    <Sun
                        className="h-5 w-5 transition-transform duration-300"
                        style={{
                            color:
                                'color-mix(in oklab, var(--accent) 85%, gold)',
                        }}
                    />
                ) : (
                    <Moon
                        className="h-5 w-5 transition-transform duration-300"
                        style={{ color: 'var(--accent)' }}
                    />
                )}
            </button>
        </div>
    );
}