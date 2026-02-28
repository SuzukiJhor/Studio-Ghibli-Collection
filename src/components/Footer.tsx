export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto w-full px-6 py-12 bg-slate-950/80 backdrop-blur-xl rounded-[20px] border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 pb-12 border-b border-white/5">
                    <div className="max-w-xs w-full text-center md:text-left mx-auto md:mx-0">
                        <div className="text-2xl font-black tracking-tighter text-white mb-4">
                            SG<span className="text-indigo-500">.</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Explorando a magia visual e narrativa do Studio Ghibli através de dados reais.
                        </p>
                    </div>
                    <div className="flex flex-row justify-center md:justify-end gap-12 w-full md:w-auto text-center md:text-left">
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-widest">Recursos</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="https://ghibliapi.vercel.app/" target="_blank" rel="noreferrer" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">Ghibli API</a>
                                </li>
                                <li>
                                    <a href="https://studioghibli.com.br/studioghibli/" target="_blank" rel="noreferrer" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">Official Website</a>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-widest">Desenvolvedor</h4>
                            <ul className="space-y-3">
                                <li>
                                    <a href="https://github.com/SuzukiJhor" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">Portfólio</a>
                                </li>
                                <li>
                                    <span className="text-sm text-slate-500 cursor-not-allowed italic">GitHub</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="pt-8 flex flex-col lg:flex-row justify-between items-center gap-4 text-slate-500 text-[13px]">
                    <p>© {currentYear} Studio Ghibli Collection.</p>
                    <p className="font-medium text-center lg:text-right opacity-80">
                        Teste Técnico Front-end • Desenvolvido com <span className="text-indigo-400">React 19</span> por Jhordan Suzuki
                    </p>
                </div>
            </div>
        </footer>
    );
}