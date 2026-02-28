import { useState } from 'react';
import { Star, Eye, ChevronDown, FileText, Heart } from 'lucide-react';
import type { Film, UserData } from "../types/ghibli";
import { NoteModal } from './NoteModal';
import { useFilmContext } from '../contexts/FilmContext';
import { highlightText } from '../utils/highlightText';

interface MovieCardProps {
    film: Film;
    isFavorite: boolean;
    isWatched: boolean;
    onFavorite: () => void;
    onWatched: () => void;
    userData?: UserData;
    onSaveNote: (rating: number, notes: string) => void;
}

export const MovieCard = ({
    film,
    isFavorite,
    isWatched,
    onFavorite,
    onWatched,
    userData,
    onSaveNote
}: MovieCardProps) => {
    
    const { search, includeDescription } = useFilmContext();
    const [isExpanded, setIsExpanded] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const hasNote = userData?.notes && userData.notes.trim() !== "";
    const hasRating = (userData?.userRating ?? 0) > 0;

    const fullText = film.description;
    const truncatedText = `${fullText.substring(0, 120)}...`;
    const textToDisplay = isExpanded ? fullText : truncatedText;

    const highlightedDescription = (includeDescription && search)
        ? highlightText(textToDisplay, search)
        : textToDisplay;

    return (
        <div className={`group relative flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 ${isWatched ? 'ring-2 ring-indigo-500/30' : ''}`}>
            <div className="relative aspect-2/3 overflow-hidden">
                <img
                    src={film.image}
                    alt={film.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />

                <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                    {isFavorite && (
                        <div className="w-8 h-8 rounded-full bg-red-500/80 backdrop-blur-md flex items-center justify-center text-white shadow-lg animate-in zoom-in duration-300" title="Favorito">
                            <Heart size={14} fill="currentColor" />
                        </div>
                    )}
                    {isWatched && (
                        <div className="w-8 h-8 rounded-full bg-indigo-500/80 backdrop-blur-md flex items-center justify-center text-white shadow-lg animate-in zoom-in duration-300" title="Assistido">
                            <Eye size={14} />
                        </div>
                    )}
                    {(hasNote || hasRating) && (
                        <div className="min-w-8 h-8 px-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 flex items-center justify-center gap-1.5 text-white shadow-lg animate-in zoom-in duration-300">
                            {hasRating && (
                                <div className="flex items-center gap-1 text-[10px] font-bold">
                                    <Star size={10} fill="currentColor" className="text-yellow-400" />
                                    <span>{userData?.userRating}</span>
                                </div>
                            )}
                            {hasRating && hasNote && <div className="w-px h-3 bg-white/20" />}
                            {hasNote && <FileText size={12} className="text-indigo-300" />}
                        </div>
                    )}
                </div>

                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            </div>

            <div className="p-5 flex flex-col grow bg-linear-to-b from-transparent to-white/2">
                <h3 className="text-xl font-bold text-white mb-1 line-clamp-1 group-hover:text-indigo-400 transition-colors">
                    {film.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 font-medium">
                    <span>{film.release_date}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                    <span>{film.running_time}m</span>
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-5">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                        <Star size={14} fill="#fbbf24" className="text-amber-400" />
                        <span className="text-amber-400 text-sm font-bold">{film.rt_score}%</span>
                    </div>

                    {hasRating ? (
                        <div className="flex items-center gap-1.5 text-xs text-indigo-300 font-semibold">
                            <Star size={12} fill="currentColor" />
                            <span>Sua nota: {userData?.userRating}/5</span>
                        </div>
                    ) : (
                        <span className="text-xs text-slate-500 italic">Sem nota</span>
                    )}
                </div>

                <div className="text-sm text-slate-400 leading-relaxed mb-6 grow">
                    <p className="inline">{highlightedDescription}</p>

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="ml-2 text-indigo-400 hover:text-indigo-300 font-bold inline-flex items-center gap-1 transition-colors"
                    >
                        {isExpanded ? 'Menos' : 'Ler mais'}
                        <ChevronDown size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                <div className="space-y-1 mb-6 py-3 border-y border-white/5 text-[13px]">
                    <p className="text-slate-400"><strong className="text-slate-300 font-semibold">Dir:</strong> {film.director}</p>
                    <p className="text-slate-400"><strong className="text-slate-300 font-semibold">Prod:</strong> {film.producer}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-auto">
                    <button
                        onClick={onWatched}
                        className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all border ${isWatched ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/20' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white'}`}
                        title="Assistido"
                    >
                        <Eye size={18} className={isWatched ? 'animate-pulse' : ''} />
                        <span className="text-[10px] mt-1 font-bold uppercase tracking-tighter">Visto</span>
                    </button>

                    <button
                        onClick={onFavorite}
                        className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all border ${isFavorite ? 'bg-red-500 border-red-400 text-white shadow-lg shadow-red-500/20' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white'}`}
                        title="Favorito"
                    >
                        <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
                        <span className="text-[10px] mt-1 font-bold uppercase tracking-tighter">Amei</span>
                    </button>

                    <button
                        onClick={() => setShowModal(true)}
                        className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all border ${hasNote || hasRating ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white'}`}
                        title="Anotações"
                    >
                        <FileText size={18} />
                        <span className="text-[10px] mt-1 font-bold uppercase tracking-tighter">Notas</span>
                    </button>
                </div>
            </div>

            {showModal && (
                <NoteModal
                    movieTitle={film.title}
                    initialRating={userData?.userRating || 0}
                    initialNotes={userData?.notes || ""}
                    onClose={() => setShowModal(false)}
                    onSave={(rating, notes) => {
                        onSaveNote(rating, notes);
                        setShowModal(false);
                    }}
                />
            )}
        </div>
    );
};