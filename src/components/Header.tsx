export const Header = () => {
    return (
        <header className="relative overflow-hidden text-center py-20 px-4">
            <div className="absolute -top-25 -left-25 w-100 height-[400px] bg-[radial-gradient(circle,rgba(99,102,241,0.15)_0%,transparent_70%)] blur-[80px] -z-10 pointer-events-none" />
            <div className="absolute -bottom-25 -right-25 w-100 height-[400px] bg-[radial-gradient(circle,rgba(168,85,247,0.15)_0%,transparent_70%)] blur-[80px] -z-10 pointer-events-none" />

            <div className="max-w-4xl mx-auto">
                <h1 className="text-[clamp(2.5rem,10vw,5rem)] font-black leading-[0.95] text-white mb-6 tracking-tighter">
                    <span className="bg-linear-to-br from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                        Collection
                    </span>
                    <br />
                    Studio Ghibli
                </h1>
                <div className="inline-flex items-center justify-center gap-3 px-5 py-1.5 bg-indigo-500/5 border border-indigo-500/20 rounded-full backdrop-blur-md mb-6">
                    <span className="text-[0.75rem] font-bold text-indigo-300 uppercase tracking-[2px] leading-none">
                        Ghibli Universe
                    </span>
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                </div>
                <p className="max-w-162.5 mx-auto text-slate-400 text-lg md:text-xl leading-relaxed">
                    Explore o catálogo lendário do estúdio que redefiniu a animação mundial.
                    <span className="text-slate-200 font-medium ml-1">Organize sua jornada</span>, marque seus favoritos e mantenha o registro do que você já assistiu em uma interface mágica.
                </p>
            </div>
        </header>
    );
};