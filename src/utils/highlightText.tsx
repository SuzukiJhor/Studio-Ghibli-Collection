export const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;

    const escaped = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'i');

    return text.split(regex).map((part, i) =>
        regex.test(part) ? (
            <mark
                key={i}
                style={{
                    backgroundColor: 'color-mix(in oklab, var(--accent) 35%, transparent)',
                    color: 'var(--text)',
                    borderBottom: '1px solid color-mix(in oklab, var(--accent) 70%, transparent)',
                }}
                className="rounded-sm px-1 font-semibold"
            >
                {part}
            </mark>
        ) : (
            part
        )
    );
};