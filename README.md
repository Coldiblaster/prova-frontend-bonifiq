# 🧪 Prova Prática – Desenvolvedor Front-End

## 📋 Sobre o desafio

Este projeto implementa um **widget em iFrame** carregado via script externo, que exibe informações de um usuário e seus posts consumidos da API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/).  
O objetivo foi avaliar integração de front-end moderno (React + Vite + TypeScript), consumo de API, UX e testes.

---

## 💡 Decisões Técnicas

- Estrutura com **React + Vite + TypeScript** → inicialização rápida, tipagem forte e fácil integração via iFrame.
- **PostMessage** entre `parent` e `iframe` → leitura segura do `window.loggedUserId` em qualquer domínio.
- Consumo de API separado em **services** (`user.service.ts`, `post.service.ts`) com tipagem explícita.
- Hooks (`useUserData`, `usePostMessage`) para centralizar lógica de dados e comunicação.
- UI com **TailwindCSS + shadcn/ui** → design consistente, responsivo (máx. 320x600) e pronto para dark mode.
- **Skeleton loaders** e mensagens amigáveis de erro → UX mais profissional.
- **Testes unitários e de integração** com Vitest + Testing Library → cobertura alta em hooks e componentes críticos.

> ⚠️ **Nota de segurança**: para o desafio foi usado `postMessage` com `"*"`.  
> Em produção, recomenda-se validar `event.origin` para aceitar mensagens apenas do domínio esperado.

---

## 🛠️ Funcionalidades

- **Script externo (`widget.js`)** cria botão flutuante no canto inferior direito e carrega iFrame da aplicação.
- Exibição de **dados do usuário** (nome e e-mail) consumidos da API.
- Exibição de **posts do usuário** (título e conteúdo).
- **Loading state** com skeletons durante chamadas à API.
- **Tratamento de erro inteligente**:
  - “Usuário não encontrado” (404) → mensagem customizada + botão retry.
- **Botão de fechar no widget**, além do botão flutuante externo.
- Responsividade garantida: uso confortável em desktop e mobile.
- **Exemplo de integração** disponível em `/sites-exemplo`.

---

## ✅ Checklist do desafio

- [x] Script externo para carregar widget
- [x] Botão flutuante (abre/fecha iFrame)
- [x] Leitura de `window.loggedUserId` via postMessage
- [x] Consumo da API JSONPlaceholder (usuário + posts)
- [x] Skeleton loaders
- [x] Tratamento de erro com mensagens amigáveis
- [x] Testes unitários e de integração
- [x] Responsividade (desktop + mobile)

---

## ⚠️ Pré-requisitos

- [Git](https://git-scm.com)
- [Node.js + pnpm](https://nodejs.org/en/download) (ou npm/yarn)

### ▶️ Como rodar

```bash
# Clone o repositório
$ git@github.com:Coldiblaster/prova-frontend-bonifiq.git
# Entre na pasta do projeto
cd prova-frontend-bonifiq

# Instale as dependências
pnpm install

# Entre na aplicação React
cd react-app

# Inicie o servidor de desenvolvimento
pnpm dev

# A aplicação React estará disponível em:
👉 http://localhost:5173

# Em outro terminal, vá até a pasta de exemplos
cd sites-exemplo

# Abra o arquivo index.html no navegador
# (pode ser só clicar duas vezes ou usar um live server)
# O botão flutuante do widget aparecerá no canto inferior direito da página de exemplo.
# Ao clicar, o iFrame carregará a aplicação React rodando em http://localhost:5173.
```

---

## 🌐 Exemplo de Uso em qualquer site

Para incluir o widget em uma página HTML, basta adicionar o **ID do usuário logado** e o script externo `widget.js`:

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <title>Exemplo Widget</title>
  </head>
  <body>
    <h1>Minha Página</h1>

    <script>
      // ID do usuário logado definido na página principal
      window.loggedUserId = 2;
    </script>

    <!-- Inclusão do widget -->
    <script src="./widget.js"></script>
  </body>
</html>
```

⚠️ Observação: o widget.js precisa apontar para a versão compilada do projeto React (por exemplo, servida via http://localhost:5173 durante desenvolvimento ou via build em produção).

---

## 🧪 Testes

O projeto possui **testes unitários e de integração** (Vitest + React Testing Library).

```bash

# Rodar testes
pnpm test

# Rodar em modo watch
pnpm test:watch

# Gerar relatório de cobertura
pnpm test:coverage

# O relatório de cobertura estará disponível em
/coverage/index.html

```

---

## :open_file_folder: Languages and dependencies

![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3178c6?style=for-the-badge&labelColor=white&logo=Zod&logoColor=black)
![shadcn/ui](https://img.shields.io/badge/shadcn--ui-black?style=for-the-badge)
![Lucide](https://img.shields.io/badge/Lucide-18181b?style=for-the-badge&logo=lucide&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

- **React 19**
- **TypeScript** (tipagem estática)
- **TailwindCSS 4**
- **shadcn/ui** (componentes baseados em Radix)
- **Lucide-react** (ícones SVG)
- **pnpm** (gerenciador de pacotes)
