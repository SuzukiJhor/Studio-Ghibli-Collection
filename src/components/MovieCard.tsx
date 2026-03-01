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

    const hasNote = !!userData?.notes?.trim();
    const hasRating = (userData?.userRating ?? 0) > 0;

    const fullText = film.description;
    const truncatedText = `${fullText.substring(0, 120)}...`;
    const textToDisplay = isExpanded ? fullText : truncatedText;

    const highlightedDescription =
        includeDescription && search
            ? highlightText(textToDisplay, search)
            : textToDisplay;

    const handleDeleteNote = () => {
        onSaveNote(0, "");
        setShowModal(false);
    };

    return (
        <div
            className="group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
            style={{
                backgroundColor:
                    'color-mix(in oklab, var(--bg) 92%, transparent)',
                border: '1px solid',
                borderColor:
                    'color-mix(in oklab, var(--text) 12%, transparent)',
                boxShadow:
                    isWatched
                        ? '0 0 0 2px color-mix(in oklab, var(--accent) 40%, transparent)'
                        : 'none',
            }}
        >
            <div className="relative aspect-2/3 overflow-hidden">
                <img
                    src={film.image}
                    alt={film.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                    {isFavorite && (
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg"
                            style={{ backgroundColor: 'var(--danger)' }}
                            title="Favorito"
                        >
                            <Heart size={14} fill="currentColor" />
                        </div>
                    )}

                    {isWatched && (
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg"
                            style={{ backgroundColor: 'var(--accent)' }}
                            title="Assistido"
                        >
                            <Eye size={14} />
                        </div>
                    )}

                    {(hasNote || hasRating) && (
                        <div
                            className="min-w-8 h-8 px-2 rounded-full flex items-center gap-1.5 text-white shadow-lg"
                            style={{
                                backgroundColor:
                                    'color-mix(in oklab, var(--bg) 85%, black)',
                                border: '1px solid',
                                borderColor:
                                    'color-mix(in oklab, var(--text) 20%, transparent)',
                            }}
                        >
                            {hasRating && (
                                <div className="flex items-center gap-1 text-[10px] font-bold">
                                    <Star size={10} fill="currentColor" style={{ color: 'var(--warning)' }} />
                                    <span>{userData?.userRating}</span>
                                </div>
                            )}
                            {hasRating && hasNote && <div className="w-px h-3 bg-white/20" />}
                            {hasNote && <FileText size={12} style={{ color: 'var(--accent)' }} />}
                        </div>
                    )}
                </div>

                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="p-5 flex flex-col grow">
                <h3
                    className="text-xl font-bold mb-1 line-clamp-1 transition-colors"
                    style={{ color: 'var(--text)' }}
                >
                    {film.title}
                </h3>

                <div
                    className="flex items-center gap-2 text-xs mb-4 font-medium"
                    style={{ color: 'color-mix(in oklab, var(--text) 60%, transparent)' }}
                >
                    <span>{film.release_date}</span>
                    <span className="w-1 h-1 rounded-full bg-current opacity-40" />
                    <span>{film.running_time}m</span>
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-5">
                    <div
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                        style={{
                            backgroundColor:
                                'color-mix(in oklab, var(--warning) 12%, transparent)',
                            border: '1px solid',
                            borderColor:
                                'color-mix(in oklab, var(--warning) 30%, transparent)',
                            color: 'var(--warning)',
                        }}
                    >
                        <Star size={14} fill="currentColor" />
                        <span className="text-sm font-bold">{film.rt_score}%</span>
                    </div>

                    {hasRating ? (
                        <span
                            className="text-xs font-semibold flex items-center gap-1"
                            style={{ color: 'var(--accent)' }}
                        >
                            <Star size={12} fill="currentColor" />
                            Sua nota: {userData?.userRating}/5
                        </span>
                    ) : (
                        <span
                            className="text-xs italic"
                            style={{ color: 'color-mix(in oklab, var(--text) 45%, transparent)' }}
                        >
                            Sem nota
                        </span>
                    )}
                </div>

                <div
                    className="text-sm leading-relaxed mb-6 grow"
                    style={{ color: 'color-mix(in oklab, var(--text) 65%, transparent)' }}
                >
                    <p className="inline">{highlightedDescription}</p>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="ml-2 font-bold inline-flex items-center gap-1"
                        style={{ color: 'var(--accent)' }}
                    >
                        {isExpanded ? 'Menos' : 'Ler mais'}
                        <ChevronDown
                            size={14}
                            className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        />
                    </button>
                </div>

                <div
                    className="space-y-1 mb-6 py-3 text-[13px]"
                    style={{
                        borderTop: '1px solid',
                        borderBottom: '1px solid',
                        borderColor:
                            'color-mix(in oklab, var(--text) 10%, transparent)',
                    }}
                >
                    <p><strong>Dir:</strong> {film.director}</p>
                    <p><strong>Prod:</strong> {film.producer}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-auto">
                    <button
                        onClick={onWatched}
                        title="Assistido"
                        aria-label="Assistido"
                        aria-pressed={isWatched}
                        className="flex flex-col items-center justify-center py-2 rounded-xl transition-all"
                        style={{
                            backgroundColor: isWatched
                                ? 'var(--accent)'
                                : 'color-mix(in oklab, var(--bg) 90%, transparent)',
                            color: isWatched ? '#fff' : 'var(--text)',
                            border: '1px solid',
                            borderColor:
                                isWatched
                                    ? 'var(--accent)'
                                    : 'color-mix(in oklab, var(--text) 10%, transparent)',
                        }}
                    >
                        <Eye size={18} />
                        <span className="text-[10px] mt-1 font-bold uppercase">Visto</span>
                    </button>

                    <button
                        onClick={onFavorite}
                        title="Favorito"
                        aria-label="Favorito"
                        className="flex flex-col items-center justify-center py-2 rounded-xl transition-all"
                        style={{
                            backgroundColor: isFavorite ? 'var(--danger)' : 'transparent',
                            color: isFavorite ? '#fff' : 'var(--text)',
                            border: '1px solid',
                            borderColor: isFavorite
                                ? 'var(--danger)'
                                : 'color-mix(in oklab, var(--text) 10%, transparent)',
                        }}
                    >
                        <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
                        <span className="text-[10px] mt-1 font-bold uppercase">Amei</span>
                    </button>

                    <button
                        onClick={() => setShowModal(true)}
                        title="Anotações"
                        className="flex flex-col items-center justify-center py-2 rounded-xl transition-all"
                        style={{
                            backgroundColor:
                                hasNote || hasRating
                                    ? 'color-mix(in oklab, var(--text) 15%, transparent)'
                                    : 'transparent',
                            color: 'var(--text)',
                            border: '1px solid',
                            borderColor:
                                'color-mix(in oklab, var(--text) 10%, transparent)',
                        }}
                    >
                        <FileText size={18} />
                        <span className="text-[10px] mt-1 font-bold uppercase">Notas</span>
                    </button>
                </div>
            </div>

            {showModal && (
                <NoteModal
                    movieTitle={film.title}
                    initialRating={userData?.userRating || 0}
                    initialNotes={userData?.notes || ''}
                    onClose={() => setShowModal(false)}
                    onSave={(rating, notes) => {
                        onSaveNote(rating, notes);
                        setShowModal(false);
                    }}
                    onDelete={handleDeleteNote}
                />
            )}
        </div>
    );
};