# 🎬 Studio Ghibli Collection

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
<br>
> ⚠️ **IMPORTANTE – Documento de Referência para Testes**  
> Este README é apenas uma visão geral do projeto.  
> **O documento oficial a ser seguido para execução e validação dos testes está em:**  
> 👉 `src/doc/README.md`
<br>
Uma aplicação dedicada à exploração do catálogo cinematográfico do Studio Ghibli. Este dashboard implementa padrões modernos de arquitetura frontend, focando em reatividade, gerenciamento eficiente de cache e uma experiência de usuário (UX) refinada.

---

## 💻 Tech Stack

A arquitetura foi desenhada para escalabilidade e manutenção simplificada:

| Camada | Tecnologia | Propósito |
| :--- | :--- | :--- |
| **Framework** | **React 19** | Core da aplicação com as últimas APIs de concorrência. |
| **Data Fetching** | **TanStack Query v5** | Sincronização de estado de servidor e cache inteligente. |
| **Styling** | **Tailwind CSS** | Design system utilitário e interface responsiva. |
| **State Mgmt** | **Context API** | Gerenciamento de estado global para preferências do usuário. |
| **Tooling** | **Vite** | Build system ultra-rápido para desenvolvimento moderno. |
| **Feedback** | **Sonner** | Notificações toast leves e acessíveis. |

---

## 🎯 Requisitos & Funcionalidades

### Core Features
* **Data Integration:** Consumo resiliente da Ghibli API com tratamento de estados de erro/loading.
* **Advanced Filtering:** Motor de busca multi-critério (Título, Sinopse, Favoritos, Anotações e Avaliações).
* **Smart Highlight:** Algoritmo para destaque dinâmico de termos em sinopses selecionadas.
* **Persistence Layer:** Gerenciamento de filmes favoritos e assistidos com persistência automática em `localStorage`.
* **Theme Switching:** Alternância dinâmica entre temas **Dark** e **Light**.
* **Internationalization:** Tradução automática das descrições dos filmes para **Português**.

### UX/UI Standard
* **Empty State Handling:** Feedback visual customizado para buscas sem resultados.
* **Real-time Feedback:** Sistema de notificações para ações de interação com o catálogo.
* **Fluid Design:** Interface adaptativa para múltiplos viewports (Mobile-first).
* **High Test Coverage:** Cobertura de testes unitários superior a **95%**.

---

## ⚙️ Instalação e Execução

Certifique-se de ter o **Node.js** instalado em sua máquina antes de começar.

```bash
# 1. Clonar o repositório
git clone https://github.com/SuzukiJhor/Studio-Ghibli-Collection.git

# 2. Acessar o diretório
cd Studio-Ghibli-Collection

# 3. Instalar dependências
npm install

# 4. Iniciar ambiente de desenvolvimento
npm run dev

# 5. Rodar cobertura de testes unitários
npm run test:coverage
```


## 🚀 Demo em Produção

> Clique na imagem abaixo para acessar o projeto em produção.

[<img
  src="https://github.com/user-attachments/assets/efe41136-1a90-48a3-9e78-0ce47b99e163"
  alt="Preview do Studio Ghibli Collection"
  width="100%"
/>](https://studio-ghibli-jhordan-suzuki.vercel.app)
