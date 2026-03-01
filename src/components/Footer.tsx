export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="mt-auto w-full px-6 py-12 backdrop-blur-xl rounded-[20px] border-t transition-colors"
            style={{
                backgroundColor:
                    'color-mix(in oklab, var(--bg) 92%, black)',
                borderColor:
                    'color-mix(in oklab, var(--text) 8%, transparent)',
            }}
        >
            <div className="max-w-7xl mx-auto">
                <div
                    className="flex flex-col md:flex-row justify-between items-start gap-12 pb-12 border-b"
                    style={{
                        borderColor:
                            'color-mix(in oklab, var(--text) 8%, transparent)',
                    }}
                >
                    <div className="max-w-xs w-full text-center md:text-left mx-auto md:mx-0">
                        <div
                            className="text-2xl font-black tracking-tighter mb-4"
                            style={{ color: 'var(--text)' }}
                        >
                            SG
                            <span style={{ color: 'var(--accent)' }}>.</span>
                        </div>

                        <p
                            className="text-sm leading-relaxed"
                            style={{
                                color:
                                    'color-mix(in oklab, var(--text) 75%, transparent)',
                            }}
                        >
                            Explorando a magia visual e narrativa do Studio Ghibli
                            através de dados reais.
                        </p>
                    </div>

                    <div className="flex flex-row justify-center md:justify-end gap-12 w-full md:w-auto text-center md:text-left">
                        <div className="space-y-4">
                            <h4
                                className="text-xs font-bold uppercase tracking-widest"
                                style={{ color: 'var(--text)' }}
                            >
                                Recursos
                            </h4>

                            <ul className="space-y-3">
                                <li>
                                    <a
                                        href="https://ghibliapi.vercel.app/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-sm transition-colors"
                                        style={{
                                            color:
                                                'color-mix(in oklab, var(--text) 70%, transparent)',
                                        }}
                                    >
                                        Ghibli API
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="https://studioghibli.com.br/studioghibli/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-sm transition-colors"
                                        style={{
                                            color:
                                                'color-mix(in oklab, var(--text) 70%, transparent)',
                                        }}
                                    >
                                        Official Website
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h4
                                className="text-xs font-bold uppercase tracking-widest"
                                style={{ color: 'var(--text)' }}
                            >
                                Desenvolvedor
                            </h4>

                            <ul className="space-y-3">
                                <li>
                                    <a
                                        href="https://github.com/SuzukiJhor"
                                        target="_blank"
                                        className="text-sm transition-colors"
                                        style={{
                                            color:
                                                'color-mix(in oklab, var(--text) 70%, transparent)',
                                        }}
                                    >
                                        Portfólio
                                    </a>
                                </li>

                                <li>
                                    <span
                                        className="text-sm italic cursor-not-allowed"
                                        style={{
                                            color:
                                                'color-mix(in oklab, var(--text) 45%, transparent)',
                                        }}
                                    >
                                        GitHub
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div
                    className="pt-8 flex flex-col lg:flex-row justify-between items-center gap-4 text-[13px]"
                    style={{
                        color:
                            'color-mix(in oklab, var(--text) 65%, transparent)',
                    }}
                >
                    <p>© {currentYear} Studio Ghibli Collection.</p>

                    <p className="font-medium text-center lg:text-right opacity-90">
                        Teste Técnico Front-end • Desenvolvido com{' '}
                        <span style={{ color: 'var(--accent)' }}>React 19</span>{' '}
                        por Jhordan Suzuki
                    </p>
                </div>
            </div>
        </footer>
    );
}