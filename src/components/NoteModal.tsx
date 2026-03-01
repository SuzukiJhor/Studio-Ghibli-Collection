import { useState } from 'react';
import { Star, Trash2, X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface NoteModalProps {
    movieTitle: string;
    initialRating: number;
    initialNotes: string;
    onClose: () => void;
    onSave: (rating: number, notes: string) => void;
    onDelete?: () => void;
}

export const NoteModal = ({
    movieTitle,
    initialRating,
    initialNotes,
    onClose,
    onSave,
    onDelete,
}: NoteModalProps) => {
    const [rating, setRating] = useState(initialRating);
    const [notes, setNotes] = useState(initialNotes);
    const [hover, setHover] = useState(0);

    const hasExistingData = initialRating > 0 || initialNotes.trim().length > 0;
    const isSaveDisabled = rating === 0 && notes.trim().length === 0;

    const modalContent = (
        <div
            role="dialog"
            aria-label={`Notas do filme ${movieTitle}`}
            className="fixed inset-0 z-9999 flex items-center justify-center p-4 backdrop-blur-md"
            style={{
                backgroundColor:
                    'color-mix(in oklab, var(--bg) 65%, black)',
            }}
            onClick={onClose}
        >
            <div
                className="
          w-full max-w-lg rounded-2xl p-6
          shadow-2xl animate-in zoom-in-95
          slide-in-from-bottom-4 duration-300
        "
                style={{
                    backgroundColor:
                        'color-mix(in oklab, var(--bg) 96%, black)',
                    border: '1px solid',
                    borderColor:
                        'color-mix(in oklab, var(--text) 15%, transparent)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2
                        className="text-xl font-bold tracking-tight"
                        style={{ color: 'var(--text)' }}
                    >
                        Editar Notas
                        <span
                            className="block text-sm font-medium mt-1 uppercase tracking-wider italic"
                            style={{
                                color:
                                    'color-mix(in oklab, var(--accent) 75%, var(--text))',
                            }}
                        >
                            Filme, {movieTitle}
                        </span>
                    </h2>



                    <button
                        onClick={onClose}
                        className="p-2 rounded-full transition-all"
                        style={{
                            backgroundColor:
                                'color-mix(in oklab, var(--text) 6%, transparent)',
                            color:
                                'color-mix(in oklab, var(--text) 60%, transparent)',
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="space-y-3">
                        <label
                            className="text-xs font-bold uppercase tracking-widest"
                            style={{
                                color:
                                    'color-mix(in oklab, var(--text) 55%, transparent)',
                            }}
                        >
                            Sua Avaliação
                        </label>

                        <div className="flex items-center gap-3">
                            <div
                                className="flex items-center p-2 rounded-xl"
                                style={{
                                    backgroundColor:
                                        'color-mix(in oklab, var(--text) 6%, transparent)',
                                    border: '1px solid',
                                    borderColor:
                                        'color-mix(in oklab, var(--text) 12%, transparent)',
                                }}
                            >
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        aria-label={`avaliar ${star} estrelas`}
                                        className="p-1 transition-transform hover:scale-125 active:scale-90"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHover(star)}
                                        onMouseLeave={() => setHover(0)}
                                    >
                                        <Star
                                            size={28}
                                            fill={(hover || rating) >= star ? '#fbbf24' : 'none'}
                                            className={
                                                (hover || rating) >= star
                                                    ? 'text-yellow-400'
                                                    : 'opacity-40'
                                            }
                                        />
                                    </button>
                                ))}
                            </div>

                            <span className="text-xl font-black italic font-mono text-yellow-400">
                                {rating}
                                <span
                                    className="text-sm ml-1"
                                    style={{
                                        color:
                                            'color-mix(in oklab, var(--text) 45%, transparent)',
                                    }}
                                >
                                    /5
                                </span>
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3">

                        <label
                            className="text-xs font-bold uppercase tracking-widest"
                            style={{
                                color:
                                    'color-mix(in oklab, var(--text) 55%, transparent)',
                            }}
                        >
                            Suas Notas
                        </label>

                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Escreva algo sobre o filme..."
                            rows={5}
                            className="
                w-full p-4 rounded-xl text-sm resize-none
                transition-all focus:outline-none
              "
                            style={{
                                backgroundColor:
                                    'color-mix(in oklab, var(--bg) 92%, transparent)',
                                border: '1px solid',
                                borderColor:
                                    'color-mix(in oklab, var(--text) 15%, transparent)',
                                color: 'var(--text)',
                            }}
                        />
                    </div>
                </div>
                {hasExistingData && onDelete && (
                    <button
                        onClick={() => {
                            onDelete();
                        }}
                        className="mr-auto p-2.5 rounded-xl transition-all hover:bg-red-500/10 text-red-500"
                        title="Excluir notas"
                    >
                        <Trash2 size={20} />
                    </button>
                )}

                <div className="flex justify-end gap-3 mt-8">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all"
                        style={{
                            color:
                                'color-mix(in oklab, var(--text) 65%, transparent)',
                        }}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => onSave(rating, notes)}
                        disabled={isSaveDisabled} 
                        className={`
        px-8 py-2.5 rounded-xl text-sm font-bold
        transition-all transform 
        ${isSaveDisabled
                                ? 'opacity-50 cursor-not-allowed scale-100' 
                                : 'hover:-translate-y-0.5 active:translate-y-0'
                            }
    `}
                        style={{
                            backgroundColor: isSaveDisabled
                                ? 'color-mix(in oklab, var(--text) 20%, transparent)' 
                                : 'var(--accent)',
                            color: isSaveDisabled ? 'var(--text)' : '#fff',
                            boxShadow: isSaveDisabled
                                ? 'none'
                                : '0 10px 25px color-mix(in oklab, var(--accent) 35%, transparent)',
                        }}
                    >
                        Salvar Notas
                    </button>

                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};