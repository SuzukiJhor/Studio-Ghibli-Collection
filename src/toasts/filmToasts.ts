import toast from 'react-hot-toast';

export const filmToasts = {
    loading() {
        toast.loading('Buscando catálogo Ghibli...', {
            id: 'fetch-films',
        });
    },

    success() {
        toast.success('Filmes carregados com sucesso!', {
            id: 'fetch-films',
        });
    },

    error(message: string) {
        toast.error(`Erro: ${message}`, {
            id: 'fetch-films',
        });
    },

    filterApplied() {
        toast.success('Filtro aplicado', { icon: '🔍' });
    },

    filterRemoved() {
        toast.error('Filtro removido', { icon: '🗑️' });
    },

    watchedAdded() {
        toast.success('Marcado como assistido!', { icon: '👁️' });
    },

    watchedRemoved() {
        toast('Removido dos assistidos', { icon: '📁' });
    },

    favoriteAdded() {
        toast.success('Adicionado aos favoritos!', {
            icon: '❤️',
            duration: 2000,
        });
    },

    favoriteRemoved() {
        toast('Removido dos favoritos', {
            icon: '💔',
            duration: 2000,
        });
    },

    noteRemoved() {
        toast('Nota removida', {
            icon: '🗑️',
            style: {
                border: '1px solid #ef4444',
                padding: '16px',
                backgroundColor: 'var(--bg)',
                color: 'var(--text)',
            },
        });
    },

    noteSaved() {
        toast.success('Avaliação salva com sucesso!', {
            iconTheme: {
                primary: '#6366f1',
                secondary: '#fff',
            },
            style: {
                border: '1px solid #6366f1',
                padding: '16px',
            },
        });
    },

    resetFilters() {
        toast('Filtros limpos!', { icon: '🧹' });
    },
};