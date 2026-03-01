import { createContext } from 'react';
import type { Theme } from '../constants/theme';

export interface ThemeContextData {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextData);