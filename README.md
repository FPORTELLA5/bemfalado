# BemFalado

Plataforma de descoberta e valorização de experiências positivas.

**Boas experiências merecem ser compartilhadas.**

O BemFalado ajuda pessoas a encontrar estabelecimentos, empresas e serviços a partir de experiências positivas compartilhadas pela comunidade.

## Princípios do produto

- A experiência pública é exclusivamente positiva: a plataforma publica elogios, não reclamações.
- Pessoas podem pesquisar e conhecer os perfis sem criar uma conta.
- A publicação de experiências exige uma conta.
- O reconhecimento é apresentado com transparência, considerando quantidade de experiências e elogios.
- Pagamentos não compram elogios, não removem opiniões legítimas e não manipulam o posicionamento orgânico.
- Privacidade, segurança, acessibilidade e LGPD fazem parte do desenvolvimento desde o início.

## Estrutura do repositório

- `docs/`: visão do produto, decisões de UX, branding e especificações.
- `docs/desenvolvimento/`: padrões técnicos e convenções de código.
- `frontend/`: aplicação web Angular.
- `backend/`: futura API Java com Spring Boot.
- `database/`: futura estrutura de banco de dados e versionamento.

## Frontend

A aplicação web está sendo construída com Angular standalone, TypeScript e SCSS.

### Requisitos locais

- Node.js compatível com Angular 22 (Node 22.22.3+ ou 24.15.0+).
- npm.

### Executar localmente

```bash
cd frontend
npm install
npm start
```

A aplicação ficará disponível em `http://localhost:4200`.

### Compilar

```bash
npm run build
```

## Status

**Fase atual:** fundação do frontend e primeira versão da página inicial.

Entregue nesta etapa:
- Estrutura inicial da aplicação Angular.
- Home dividida em componentes standalone reutilizáveis.
- Tipagem explícita nos componentes e eventos, sem uso de `any` ou `$any()`.
- Tokens globais de design e temas claro/escuro.
- Página inicial responsiva.
- Navegação móvel e alternância de tema.
- Estrutura inicial de categorias e seções institucionais.

Próximas etapas:
1. Validar a home em execução e ajustar responsividade/acessibilidade.
2. Implementar busca e resultados.
3. Implementar perfil público de empresas e estabelecimentos.
4. Implementar autenticação e publicação de experiências.
5. Evoluir para área do usuário e painel empresarial.

## Idiomas planejados

- Português (Brasil)
- Inglês
- Espanhol
