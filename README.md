# 🎬 Studio Ghibli Film Dashboard

Uma interface moderna e performática para exploração do catálogo de filmes do Studio Ghibli. O projeto foca em uma experiência de usuário fluida, com filtros em tempo real e gerenciamento de estado global.

## 🛠️ Ferramentas Utilizadas

O projeto foi construído utilizando as práticas do ecossistema React atual:

* **React 19** (TypeScript)
* **Vite** (Build Tool)
* **TanStack Query v5** (Server State Management)
* **Tailwind CSS** (Styling)
* **Lucide React** (Icons)
* **Sonner** (Toast Notifications)

## ✅ Requisitos Implementados

Este dashboard cobre as seguintes funcionalidades e regras de negócio:

* [x] **Integração com API:** Consumo de dados da Ghibli API oficial.
* [x] **Filtragem Avançada:** Filtros por título, diretor e ano de lançamento simultâneos.
* [x] **Highlight de Busca:** Destaque visual dos termos pesquisados nos resultados, quando Sinopse estiver selecionado.
* [x] **Gerenciamento de Favoritos:** Persistência de estado para filmes favoritos e assistidos via Context API e persistência em storage do browser.
* [x] **Feedback de Interface:** Estados de carregamento (Loading), erro e lista vazia (Empty State).
* [x] **Notificações em Tempo Real:** Feedback visual ao favoritar ou marcar filmes como assistidos.
* [x] **Layout Responsivo:** Experiência otimizada para Mobile, Tablet e Desktop.

## 🚀 Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

1.  **Clone o repositório:**
    ```bash
    git clone (https://github.com/SuzukiJhor/Studio-Ghibli-Collection.git)
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd nome-do-repositorio
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    *O projeto estará disponível em `http://localhost:5173`*

---

## 🧪 Como rodar os Testes

Para garantir a integridade das funções de utilitários e componentes, utilizamos o Vitest.

* **Rodar todos os testes:**
    ```bash
    npm run test
    ```

* **Rodar testes com interface visual (UI):**
    ```bash
    npm run test:ui
    ```

* **Gerar relatório de cobertura (Coverage):**
    ```bash
    npm run coverage
    ```

---

## ⚖️ Licença

Este projeto está sob a licença **GNU General Public License v3.0**. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.

---
Desenvolvido com ☕ e React por **Jhordan Suzuki** - 2026