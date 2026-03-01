export const Header = () => {
    return (
        <header className="relative overflow-hidden text-center py-24 px-4">
            <div
                className="absolute -top-32 -left-32 w-md h-112 blur-[110px] -z-10 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(circle, color-mix(in oklab, var(--accent) 30%, transparent) 0%, transparent 70%)',
                }}
            />
            <div
                className="absolute -bottom-32 -right-32 w-120 h-120 blur-[120px] -z-10 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(circle, color-mix(in oklab, var(--accent) 40%, transparent) 0%, transparent 70%)',
                }}
            />
            <div className="max-w-5xl mx-auto">
                <h1 className="text-[clamp(2.8rem,9vw,5.2rem)] font-extrabold leading-[0.95] tracking-tight mb-6">
                    <span
                        className="block bg-clip-text text-transparent drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
                        style={{
                            backgroundImage:
                                'linear-gradient(to bottom right, var(--accent), color-mix(in oklab, var(--accent) 55%, rebeccapurple))',
                        }}
                    >
                        Studio Ghibli
                    </span>

                    <span
                        className="block mt-1"
                        style={{
                            color: 'var(--text)',
                            opacity: 0.9,
                        }}
                    >
                        Film Collection
                    </span>
                </h1>

                <div
                    className="inline-flex items-center justify-center gap-3 px-6 py-2 mb-10 rounded-full backdrop-blur-lg border shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
                    style={{
                        backgroundColor:
                            'color-mix(in oklab, var(--accent) 14%, transparent)',
                        borderColor:
                            'color-mix(in oklab, var(--accent) 45%, transparent)',
                    }}
                >
                    <span
                        className="text-xs font-semibold uppercase tracking-[0.25em]"
                        style={{ color: 'var(--accent)' }}
                    >
                        Ghibli Universe
                    </span>

                    <span className="relative flex h-2 w-2">
                        <span
                            className="absolute inline-flex h-full w-full rounded-full animate-ping"
                            style={{
                                backgroundColor: 'var(--accent)',
                                opacity: 0.55,
                            }}
                        />
                        <span
                            className="relative inline-flex h-2 w-2 rounded-full"
                            style={{ backgroundColor: 'var(--accent)' }}
                        />
                    </span>
                </div>

                <p
                    className="max-w-170 mx-auto text-lg md:text-xl leading-relaxed"
                    style={{ color: 'var(--text)', opacity: 0.85 }}
                >
                    Explore o universo encantado do estúdio que{' '}
                    <span
                        className="font-medium bg-clip-text text-transparent"
                        style={{
                            backgroundImage:
                                'linear-gradient(to bottom right, var(--accent), color-mix(in oklab, var(--accent) 60%, rebeccapurple))',
                        }}
                    >
                        redefiniu a animação mundial
                    </span>
                    .
                    <span
                        className="block mt-4 font-medium"
                        style={{ color: 'var(--text)', opacity: 0.95 }}
                    >
                        Organize sua{' '}
                        <span className="bg-clip-text text-transparent"
                            style={{
                                backgroundImage:
                                    'linear-gradient(to bottom right, var(--accent), color-mix(in oklab, var(--accent) 60%, rebeccapurple))',
                            }}
                        >
                            jornada
                        </span>
                        , marque seus{' '}
                        <span className="bg-clip-text text-transparent"
                            style={{
                                backgroundImage:
                                    'linear-gradient(to bottom right, var(--accent), color-mix(in oklab, var(--accent) 60%, rebeccapurple))',
                            }}
                        >
                            favoritos
                        </span>{' '}
                        e acompanhe cada{' '}
                        <span className="bg-clip-text text-transparent"
                            style={{
                                backgroundImage:
                                    'linear-gradient(to bottom right, var(--accent), color-mix(in oklab, var(--accent) 60%, rebeccapurple))',
                            }}
                        >
                            história
                        </span>{' '}
                        que já tocou seu coração.
                    </span>
                </p>
            </div>
        </header>
    );
};