import { useState } from 'react';
import { Star, X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface NoteModalProps {
    movieTitle: string;
    initialRating: number;
    initialNotes: string;
    onClose: () => void;
    onSave: (rating: number, notes: string) => void;
}

export const NoteModal = ({ movieTitle, initialRating, initialNotes, onClose, onSave }: NoteModalProps) => {
    const [rating, setRating] = useState(initialRating);
    const [notes, setNotes] = useState(initialNotes);
    const [hover, setHover] = useState(0);

    const modalContent = (
        <div
            role="dialog"
            aria-label={`Notas do filme ${movieTitle}`}
            className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/50 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white tracking-tight">
                        Editar Notas <span className="text-indigo-400 block text-sm font-medium mt-1 uppercase tracking-wider italic">para {movieTitle}</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-white/5 text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sua Avaliação</label>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center bg-white/5 p-2 rounded-xl border border-white/5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        aria-label={`avaliar ${star} estrelas`}
                                        key={star}
                                        type="button"
                                        className="p-1 transition-transform hover:scale-125 active:scale-90"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHover(star)}
                                        onMouseLeave={() => setHover(0)}
                                    >
                                        <Star
                                            size={28}
                                            fill={(hover || rating) >= star ? "#fbbf24" : "none"}
                                            className={(hover || rating) >= star ? "text-yellow-400" : "text-slate-600"}
                                        />
                                    </button>
                                ))}
                            </div>
                            <span className="ml-2 text-xl font-black text-yellow-400 font-mono italic">{rating}<span className="text-slate-600 text-sm">/5</span></span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Suas Notas</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Escreva algo sobre o filme..."
                            rows={5}
                            className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all resize-none"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => onSave(rating, notes)}
                        className="px-8 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Salvar Notas
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};