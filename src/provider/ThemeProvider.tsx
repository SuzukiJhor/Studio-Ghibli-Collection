import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { THEME_STORAGE_KEY, type Theme } from '../constants/theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
        if (stored) return stored;

        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    });

    useEffect(() => {
        const html = document.documentElement;

        html.classList.toggle('dark', theme === 'dark');
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    useEffect(() => {
        const html = document.documentElement;

        requestAnimationFrame(() => {
            html.classList.add('theme-ready');
        });
    }, []);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}