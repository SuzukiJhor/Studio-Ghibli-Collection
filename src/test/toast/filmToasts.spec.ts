import { describe, it, expect, vi, beforeEach } from 'vitest';
import toast from 'react-hot-toast';
import { filmToasts } from '../../toasts/filmToasts';

vi.mock('react-hot-toast', () => {
    const toastFn = Object.assign(vi.fn(), {
        loading: vi.fn(),
        success: vi.fn(),
        error: vi.fn(),
    });

    return {
        default: toastFn,
    };
});

describe('filmToasts', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('loading → deve chamar toast.loading com mensagem e id', () => {
        filmToasts.loading();

        expect(toast.loading).toHaveBeenCalledWith(
            'Buscando catálogo Ghibli...',
            { id: 'fetch-films' }
        );
    });

    it('success → deve chamar toast.success com mensagem e id', () => {
        filmToasts.success();

        expect(toast.success).toHaveBeenCalledWith(
            'Filmes carregados com sucesso!',
            { id: 'fetch-films' }
        );
    });

    it('error → deve chamar toast.error com mensagem formatada e id', () => {
        filmToasts.error('Falha na API');

        expect(toast.error).toHaveBeenCalledWith(
            'Erro: Falha na API',
            { id: 'fetch-films' }
        );
    });

    it('filterApplied → deve chamar toast.success com ícone 🔍', () => {
        filmToasts.filterApplied();

        expect(toast.success).toHaveBeenCalledWith(
            'Filtro aplicado',
            { icon: '🔍' }
        );
    });

    it('filterRemoved → deve chamar toast.error com ícone 🗑️', () => {
        filmToasts.filterRemoved();

        expect(toast.error).toHaveBeenCalledWith(
            'Filtro removido',
            { icon: '🗑️' }
        );
    });

    it('watchedAdded → deve chamar toast.success com ícone 👁️', () => {
        filmToasts.watchedAdded();

        expect(toast.success).toHaveBeenCalledWith(
            'Marcado como assistido!',
            { icon: '👁️' }
        );
    });

    it('watchedRemoved → deve chamar toast simples com ícone 📁', () => {
        filmToasts.watchedRemoved();

        expect(toast).toHaveBeenCalledWith(
            'Removido dos assistidos',
            { icon: '📁' }
        );
    });

    it('favoriteAdded → deve chamar toast.success com ícone ❤️ e duração', () => {
        filmToasts.favoriteAdded();

        expect(toast.success).toHaveBeenCalledWith(
            'Adicionado aos favoritos!',
            {
                icon: '❤️',
                duration: 2000,
            }
        );
    });

    it('favoriteRemoved → deve chamar toast simples com ícone 💔 e duração', () => {
        filmToasts.favoriteRemoved();

        expect(toast).toHaveBeenCalledWith(
            'Removido dos favoritos',
            {
                icon: '💔',
                duration: 2000,
            }
        );
    });

    it('noteRemoved → deve chamar toast simples com estilos de erro', () => {
        filmToasts.noteRemoved();

        expect(toast).toHaveBeenCalledWith(
            'Nota removida',
            expect.objectContaining({
                icon: '🗑️',
                style: {
                    border: '1px solid #ef4444',
                    padding: '16px',
                    backgroundColor: 'var(--bg)',
                    color: 'var(--text)',
                },
            })
        );
    });

    it('noteSaved → deve chamar toast.success com iconTheme e style', () => {
        filmToasts.noteSaved();

        expect(toast.success).toHaveBeenCalledWith(
            'Avaliação salva com sucesso!',
            {
                iconTheme: {
                    primary: '#6366f1',
                    secondary: '#fff',
                },
                style: {
                    border: '1px solid #6366f1',
                    padding: '16px',
                },
            }
        );
    });

    it('resetFilters → deve chamar toast simples com ícone 🧹', () => {
        filmToasts.resetFilters();

        expect(toast).toHaveBeenCalledWith(
            'Filtros limpos!',
            { icon: '🧹' }
        );
    });
});