export const highlightText = (text: string, highlight: string) => {
    
    if (!highlight.trim()) return text;

    const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');

    const parts = text.split(regex);
    
    return parts.map((part, i) =>
        regex.test(part) ? (
            <mark key={i} className="bg-indigo-500/40 text-indigo-200 rounded-sm px-0.5 border-b border-indigo-400" >
                {part}
            </mark>
        ) : (
            part
        )
    );
};