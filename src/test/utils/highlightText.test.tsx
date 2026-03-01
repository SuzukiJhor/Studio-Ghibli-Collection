import { describe, it, expect } from 'vitest'
import { highlightText } from '../../utils/highlightText'

describe('highlightText utility', () => {
    it('deve envolver o termo buscado em um elemento <mark> com as classes de destaque', () => {
        const text = "O Castelo no Céu";
        const query = "Castelo";

        const result = highlightText(text, query) as any[];

        expect(result).toHaveLength(3);

        expect(result[1].type).toBe('mark');

        expect(result[1].props.className).toContain('bg-indigo-500/40');

        expect(result[1].props.children).toBe('Castelo');
    });

    it('deve retornar o texto original se não houver match', () => {
        const text = "Meu Vizinho Totoro"
        const result = highlightText(text, "Ponyo")

        expect(result).toEqual([text])
    })
})