# BemFalado — Frontend

Aplicação web do BemFalado, construída com Angular standalone, TypeScript e SCSS.

## Requisitos

- Node.js 22.22.3+ ou 24.15.0+
- npm

## Desenvolvimento

```bash
npm install
npm start
```

Abra http://localhost:4200.

## Build

```bash
npm run build
```

## Organização planejada

- `src/app/core/`: serviços globais, configuração, tema e guards.
- `src/app/shared/`: componentes reutilizáveis, diretivas e pipes.
- `src/app/features/home/`: página inicial.
- `src/app/features/search/`: busca e resultados.
- `src/app/features/business/`: perfil público de empresas.
- `src/app/features/experience/`: publicação e leitura de experiências.
- `src/app/features/account/`: autenticação e área do usuário.

A estrutura será introduzida conforme as funcionalidades forem implementadas, evitando criar pastas e abstrações sem necessidade.
