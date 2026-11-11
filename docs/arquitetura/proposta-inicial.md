# Proposta inicial de arquitetura — Elogie Aqui

> Proposta para discussão. A arquitetura será confirmada após validar requisitos, custos de hospedagem, segurança e capacidade operacional.

## 1. Direção arquitetural

Começar com uma aplicação organizada como **monólito modular**, separando frontend e backend. Evitar microserviços no início: eles adicionariam complexidade operacional sem necessidade comprovada.

## 2. Tecnologias propostas

| Camada | Proposta inicial |
|---|---|
| Frontend | Angular + TypeScript |
| Componentes e estilos | PrimeNG + SCSS |
| Internacionalização | @ngx-translate |
| Backend | Java + Spring Boot |
| Segurança da API | Spring Security |
| API | REST + OpenAPI/Swagger |
| Banco de dados | Oracle Database |
| Testes backend | JUnit + Mockito |
| Versionamento | Git + GitHub |
| CI | GitHub Actions |

A escolha do Oracle considera a familiaridade existente com SQL e PL/SQL. A decisão final também deverá considerar custo, disponibilidade e limites do plano gratuito.

## 3. Organização proposta do repositório

```text
elogie-aqui/
├── docs/
│   ├── produto/
│   └── arquitetura/
├── frontend/
├── backend/
├── database/
│   ├── scripts/
│   └── migrations/
├── .gitignore
└── README.md
```

As pastas de aplicação serão criadas quando iniciarmos a configuração de cada tecnologia.

## 4. Organização do backend

Módulos de domínio propostos:
- user;
- place;
- category;
- review;
- rating;
- interaction;
- moderation;
- admin.

Componentes compartilhados: configuração, segurança, validação e tratamento padronizado de erros.

## 5. Organização do frontend

Áreas propostas:
- core: autenticação, guards, interceptors e serviços centrais;
- shared: componentes, diretivas e pipes reutilizáveis;
- features: home, discovery, places, reviews, profile e admin;
- assets/i18n: arquivos pt-BR, en e es;
- styles: variáveis, mixins e estilos globais.

Para páginas públicas de negócios, avaliar Angular SSR ou pré-renderização para favorecer indexação e compartilhamento.

## 6. Modelo de dados conceitual

Entidades iniciais a validar:
- USER;
- PLACE;
- CATEGORY;
- RATING_CRITERIA;
- REVIEW;
- REVIEW_RATING;
- REVIEW_IMAGE;
- FAVORITE;
- REVIEW_INTERACTION;
- REPORT.

Entidades comerciais futuras:
- PLAN;
- SUBSCRIPTION;
- SUBSCRIPTION_FEATURE;
- BUSINESS_CLAIM;
- BUSINESS_RESPONSE;
- ADVERTISEMENT;
- PAYMENT.

Não criar tabelas antes de validar cardinalidades, chaves, restrições, histórico e regras de integridade.

## 7. Infraestrutura e publicação

Proposta de primeira etapa, sujeita a testes:
- Frontend estático em Cloudflare Pages;
- Backend Java em serviço gratuito de demonstração, como Render Free;
- Banco Oracle Autonomous AI Database Always Free.

Limitações:
- Serviços gratuitos podem dormir, ter limites de uso e não oferecer SLA;
- armazenamento local do backend pode ser efêmero;
- imagens deverão usar armazenamento de objetos apropriado;
- rede e TLS entre backend e banco deverão ser testados;
- uma plataforma comercial deverá migrar para infraestrutura com capacidade, disponibilidade, backups e suporte adequados.

## 8. Segurança, privacidade e qualidade

Planejar desde o início:
- autenticação e autorização no backend;
- validação de entrada e proteção contra abuso;
- rate limiting e controles antifraude;
- gestão segura de segredos;
- logs sem exposição de dados sensíveis;
- política de retenção e exclusão de dados;
- backups e plano de recuperação;
- testes automatizados;
- acessibilidade WCAG 2.2 AA;
- requisitos da LGPD.

## 9. Decisões pendentes antes da implementação

1. Política de avaliações: definida — somente elogios e relatos de experiências positivas. Não aceitar avaliações negativas.
2. Regras de critérios não aplicáveis e cálculo das médias.
3. Cadastro de negócios: criação pela comunidade, por administradores ou ambos?
4. Identidade e verificação de representantes comerciais.
5. Política de fotos, denúncias e moderação.
6. Estratégia de autenticação e recuperação de conta.
7. Requisitos mínimos de SEO e páginas públicas.
8. Infraestrutura final após validar os limites dos planos gratuitos.
