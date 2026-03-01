## 🎯 **Objetivo do Desafio**

Avaliar sua habilidade de desenvolver uma aplicação com **React**, utilizando **JavaScript** (ou **TypeScript**, se desejar), consumindo uma **API pública real** e aplicando boas práticas de estruturação de componentes, manipulação de estado e interações com o usuário.

## 📜 **Descrição**

Você deverá desenvolver uma aplicação que consome a API pública do [Studio Ghibli](https://ghibliapi.vercel.app/#tag/Films) e exibe uma lista de filmes do estúdio com suas respectivas informações e algumas opções de filtro/ações nessa lista, conforme especificado a seguir:

> ⚠️ O desafio deve ser implementado utilizando a versão mais recente do React com **javascript** ou **typescript.** Busque desenvolver uma interface agradável e legível (não precisa ser um design incrível, mas bem organizada)


## 🔎 **Requisitos Funcionais**

### ✅ Obrigatórios

- [x]  Listar filmes com as seguintes informações
    - Imagem do filme
    - Título
    - Ano de lançamento
    - Duração
    - Sinopse
    - Diretor e Produtor
    - Nota de avaliação (campo `rt_score`)
- [x]  Marcar o filme como assistido
- [x]  Marcar o filme como favorito
- [x]  Filtrar os filmes por título através de um campo de texto
- [x]  Buscar palavras do filtro de texto na sinopse do filme
    - Ao selecionar a opção “Incluir sinopse na busca**”,** além de filtrar os filmes, também deve destacar o texto buscado na sinopse com alguma cor.
- [x]  Adicionar anotações de texto a um filme
- [x]  Adicionar, junto à anotação, uma avaliação pessoal de 1 a 5 estrelas
- [x]  Filtrar os filmes por:
    - Assistido
    - Favorito
    - Com anotação.
    - Número de estrelas
- [x]  Ordenar filmes (de forma crescente e decrescente) por:
    - Título
    - Duração
    - Avaliação pessoal
    - Nota de avaliação (campo `rt_score`)

### ✨ Desejáveis

- [x]  Utilizar **TypeScript**
- [x]  Implementar responsividade básica
- [x]  Persistir os seguintes dados no LocalStorage:
    - Lista de filmes e suas características (assistido / favorito / anotação / avaliação)
    - Filtros selecionados
    - Opção de ordenação selecionada
- [x]  Adicionar mensagens toast para as operações
    - Marcar/desmarcar o filme como assistido, favorito;
    - Adicionar/editar/remover anotação;
- [x]  Escrever pelo menos 1 **teste unitário** (ex: botão de favorito ou função de marcação)
- [x]  Separação clara de responsabilidades (componentes, serviços de API, etc.)
- [x]  Utilizar biblioteca de estilo (Styled-components, Tailwind, Shadcn-ui, etc.)
- [x]  Utilizar Context API ou uma solução de estado global (Redux, zustand, etc.)
- [x]  Utilizar solução para gerenciar estado assíncrono (axios, tanstack query, etc.)

## 💻 Sugestão de interface

Segue o deploy abaixo com uma sugestão de interface para a implementação do desafio. Mas claro, sinta-se à vontade para imprimir seu estilo próprio durante a implementação:
[Versão online](https://v0-ghibli-movie-app.vercel.app/)
* * *

📦 **Entrega**
--------------

1.  Inclua um `README.md` com:
    
    *   Instruções de instalação e execução.
        
    *   Ferramentas utilizadas.
        
    *   Quais requisitos foram implementados.
        
    *   Se aplicável, como rodar os testes.
        

* * *

* * *

💡 **Nota**: O foco está na organização, clareza e qualidade do código — não necessariamente na completude ou complexidade. Explique suas decisões, use commits claros, e divirta-se com o desafio!
