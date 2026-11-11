# Inventário do frontend — MVP BemFalado

Última revisão: 11/11/2026

Este documento acompanha a conclusão do frontend antes do início do backend. Os status abaixo consideram os arquivos e rotas atualmente identificados no repositório. "Implementado — demonstração" não significa integração real, validação em navegador ou prontidão para produção.

## 1. Telas públicas

| Tela/funcionalidade | Status | Observações |
|---|---|---|
| Página inicial | Implementada — primeira versão | Componentes standalone; precisa de revisão visual, responsividade, acessibilidade e estados finais. |
| Busca e resultados | Implementada — demonstração | Usa quatro negócios fictícios; filtros e ordenação são locais. Faltam refinamentos de filtros, paginação/rolagem, sugestões e estados completos. |
| Perfil público do negócio | Implementado — demonstração | Usa dados e elogios fictícios. Faltam estados reais de conteúdo, ações de interação e validação de informações. |
| Navegação entre telas | Implementada — base | Angular Router com rotas para início, busca, negócio e compartilhamento. Precisa validar navegação, histórico, links e rota inexistente. |
| Páginas institucionais | Pendente | Sobre, como funciona, diretrizes da comunidade, contato e informações institucionais. |
| Páginas legais | Pendente | Termos de uso, política de privacidade/LGPD e regras de publicação/moderação. |

## 2. Publicação e participação

| Tela/funcionalidade | Status | Observações |
|---|---|---|
| Fluxo de publicação de elogio | Implementado — demonstração | Seleção de negócio, qualidades, título, relato, fotos e revisão. Não persiste nem envia dados. |
| Busca de negócio no fluxo | Implementada — demonstração | Pesquisa local nos dados fictícios. |
| Solicitação de inclusão de negócio | Implementada — demonstração | Formulário coleta dados comerciais públicos; não envia nem armazena solicitação. |
| Validação de campos e fotos | Implementada parcialmente | Regras locais no navegador; precisam ser revistas para acessibilidade e integração futura. |
| Registro privado de experiência sem elogio | Implementado — demonstração | Alternativa após selecionar o negócio, com explicação e confirmação explícita. Não armazena nem contabiliza dados; integração real exigirá autenticação, consentimento registrado, prevenção a duplicidade e regras de elegibilidade. |
| Autenticação e cadastro | Pendente | Cadastro, login, recuperação de senha, confirmação de e-mail e encerramento de sessão. |
| Perfil do usuário | Pendente | Dados pessoais, preferências, publicações próprias e ações sobre a conta. |
| Favoritos e interações | Pendente | Definir o conjunto mínimo do MVP e implementar estados de visitante/autenticado. |

## 3. Negócios e moderação

| Tela/funcionalidade | Status | Observações |
|---|---|---|
| Área do representante do negócio | Fora do primeiro recorte / a decidir | A visão do produto posiciona recursos de representantes como fase posterior. Não antecipar painel pago completo no MVP. |
| Reivindicação/verificação de perfil | Fase posterior | Não confundir perfil reivindicado com garantia de qualidade. |
| Resposta a elogios pelo negócio | Fase posterior | Exige autenticação, autorização e regras de moderação. |
| Denúncia de conteúdo | Pendente | A visão do produto prevê denúncia no MVP. |
| Moderação básica | Pendente | Fila de análise, decisão, motivo e trilha de auditoria. |
| Gestão administrativa de negócios | Pendente | Inclui análise das solicitações de inclusão e atualização de status. |
| Gestão administrativa de usuários | Pendente | Escopo mínimo e permissões ainda precisam ser definidos. |

## 4. Design e requisitos transversais

| Requisito | Status | Observações |
|---|---|---|
| Tema claro/escuro/sistema | Implementado — base | Preferência persistida; validar todas as telas e componentes nos três modos. |
| Responsividade | Implementada parcialmente | Estilos responsivos existem nas telas atuais; falta revisão sistemática em larguras e dispositivos. |
| Acessibilidade WCAG 2.2 AA | Pendente de auditoria | Verificar teclado, foco, contraste, rótulos, leitores de tela, mensagens e alvos de toque. |
| Idiomas pt-BR/en/es | Pendente | Estrutura de tradução e cobertura de todas as telas precisam ser concluídas. |
| SEO e metadados | Pendente | Rever títulos, descrições, URLs, indexação e estratégia de renderização das páginas públicas. |
| Estados de carregamento/erro/vazio | Parcial | Alguns estados vazios existem; padronizar para todas as telas e futuras chamadas à API. |
| Segurança no frontend | Pendente de revisão | Revisar validação, upload, exposição de dados, navegação protegida e tratamento de erros. |
| Testes automatizados | Pendente de execução e cobertura | Não há confirmação de build ou testes locais aprovados. |
| Contratos tipados para API | Parcial | Há modelos de domínio e dados mockados; separar modelos de tela, DTOs e serviços antes da integração. |
| Regra de TypeScript sem any | Implementada como padrão | Manter strict e strictTemplates; não usar any nem $any(). |

## 5. Ordem recomendada para concluir

1. **Fechar a experiência pública de busca:** filtros essenciais, estados vazios, ordenação explicável e navegação consistente.
2. **Fechar o perfil público do negócio:** apresentação dos indicadores, elogios, ausência de dados e ações disponíveis.
3. **Concluir o fluxo de participação:** integrar o registro privado sem elogio, definir elegibilidade/limites contra duplicidade e concluir os estados reais de publicação.
4. **Implementar autenticação e conta:** cadastro, login, recuperação de senha e perfil do usuário.
5. **Implementar denúncia e moderação básica:** incluindo gestão das solicitações de inclusão de negócios.
6. **Completar páginas institucionais e legais.**
7. **Fazer a revisão transversal:** responsividade, temas, acessibilidade, idiomas, SEO, segurança e testes.
8. **Executar build e testes localmente e corrigir os problemas encontrados.**

## 6. Critério para considerar o frontend pronto

O frontend será considerado concluído para iniciar a integração com o backend quando:
- Todas as telas e fluxos definidos para o MVP estiverem implementados;
- Os fluxos principais puderem ser percorridos sem depender de dados fictícios embutidos nas telas;
- Os componentes consumirem serviços tipados, ainda que inicialmente com implementações mockadas;
- Estados de carregamento, sucesso, erro e ausência de dados estiverem previstos;
- Temas, responsividade, acessibilidade e idiomas tiverem sido revisados;
- Build e testes tiverem sido executados localmente com resultado aprovado;
- Não houver uso de any ou $any().

## 7. Limites deste inventário

Esta revisão é documental e baseada no estado do repositório consultado. Não substitui execução local, testes manuais em navegador, auditoria de acessibilidade nem validação com usuários. Nenhum build ou teste é declarado aprovado nesta revisão.
