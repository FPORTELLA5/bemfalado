# Inventário do frontend — MVP BemFalado

Última revisão: 11/11/2026

Este documento acompanha a conclusão do frontend antes do início do backend. Os status abaixo consideram os arquivos e rotas atualmente identificados no repositório. "Implementado — demonstração" não significa integração real, validação em navegador ou prontidão para produção.

## 1. Telas públicas

| Tela/funcionalidade | Status | Observações |
|---|---|---|
| Página inicial | Implementada — primeira versão | Componentes standalone; precisa de revisão visual, responsividade, acessibilidade e estados finais. |
| Busca e resultados | Implementada — demonstração | Usa quatro negócios fictícios; filtros e ordenação são locais. Faltam refinamentos de filtros, paginação/rolagem, sugestões e estados completos. |
| Perfil público do negócio | Implementado — demonstração | Usa dados e elogios fictícios. Inclui ação de sinalização privada em cada elogio, com formulário tipado e motivos estruturados. O registro é apenas demonstrativo, em memória, sem envio real, autenticação ou persistência. |
| Navegação entre telas | Implementada — base | Angular Router com rotas para início, busca, negócio, compartilhamento, cadastro, login, recuperação de senha e demonstração da central de moderação. Precisa validar navegação, histórico, links e rota inexistente. |
| Páginas institucionais | Pendente | Sobre, como funciona, diretrizes da comunidade, contato e informações institucionais. |
| Páginas legais | Pendente | Termos de uso, política de privacidade/LGPD e regras de publicação/moderação. |

## 2. Publicação e participação

| Tela/funcionalidade | Status | Observações |
|---|---|---|
| Fluxo de publicação de elogio | Implementado — demonstração | Seleção de negócio, qualidades, título, relato, fotos e revisão. Não persiste nem envia dados. |
| Busca de negócio no fluxo | Implementada — demonstração | Pesquisa local nos dados fictícios. |
| Solicitação de inclusão de negócio | Implementada — demonstração | Formulário coleta dados comerciais públicos; não envia nem armazena solicitação. |
| Validação de campos e fotos | Implementada parcialmente | Regras locais no navegador; precisam ser revistas para acessibilidade e integração futura. Validação tipada de anexos verifica MIME, assinatura do arquivo, decodificação e dimensões; não analisa conteúdo visual, pessoas, documentos, dados pessoais nem remove EXIF. Essas verificações exigem backend antes da publicação. Primeira camada tipada de validação de texto adicionada ao compositor; inclui sinalização de sequências excessivamente longas de emojis e repetição de pontuação. Emojis comuns são permitidos; regras determinísticas limitadas, sem análise contextual/IA e sem substituir backend. |
| Registro privado de experiência sem elogio | Implementado — demonstração | Alternativa após selecionar o negócio, com explicação e confirmação explícita. Não armazena nem contabiliza dados; integração real exigirá autenticação, consentimento registrado, prevenção a duplicidade e regras de elegibilidade. |
| Cadastro de usuário | Implementado — demonstração | Formulário tipado com nome, e-mail, senha, confirmação e ciência dos requisitos legais; opções visuais Google, Facebook e Apple; validações locais e estado de conclusão. Provedores ainda sem OAuth/backend: botões apenas informam que a integração será ativada posteriormente. Não cria conta nem envia dados. |
| Login | Implementado — demonstração | Formulário tipado, validação local, exibição de senha e opções visuais Google/Facebook/Apple. Não autentica nem cria sessão; OAuth depende do backend e da configuração dos provedores. |
| Recuperação de senha | Implementada — demonstração | Formulário de e-mail e resposta neutra para evitar enumeração de contas. Não envia e-mail; serviço real depende do backend. |
| Confirmação de e-mail | Pendente | Fluxo real depende de token de confirmação, backend e serviço de envio. |
| Perfil do usuário | Implementado — demonstração | Rota /minha-conta com visão geral, elogios publicados, registros privados e dados básicos editáveis localmente. Dados fictícios; sem persistência, autenticação ou gestão real de conta. |
| Favoritos e estabelecimentos salvos | Implementado — demonstração | Rota /favoritos, lista privada, remoção de itens e ação para salvar/remover no perfil público do negócio. Estado temporário em memória; exige autenticação e persistência pela API na integração. Não altera elogios nem índice de reconhecimento. |
| Central de notificações | Implementada — demonstração | Rota /notificacoes, lista tipada, filtros de todas/não lidas, marcação individual e em lote. Dados locais; entrega real, preferências e persistência dependem do backend. |

## 3. Negócios e moderação

| Tela/funcionalidade | Status | Observações |
|---|---|---|
| Área do representante do negócio | Fora do primeiro recorte / a decidir | A visão do produto posiciona recursos de representantes como fase posterior. Não antecipar painel pago completo no MVP. |
| Reivindicação/verificação de perfil | Fase posterior | Não confundir perfil reivindicado com garantia de qualidade. |
| Resposta a elogios pelo negócio | Fase posterior | Exige autenticação, autorização e regras de moderação. |
| Validação inicial de texto | Implementada — demonstração | Serviço tipado valida links, padrão de CPF, algumas frases negativas explícitas, ameaças, termos ofensivos selecionados e repetição excessiva; bloqueia avanço no formulário quando há sinal. Não é classificador contextual completo nem validação de segurança no servidor. |
| Denúncia de conteúdo | Implementada — demonstração | Formulário privado em cada elogio, sete motivos estruturados e detalhes opcionais limitados a 500 caracteres. O envio alimenta a fila demonstrativa em memória; não há autenticação, persistência, notificação real, nem auditoria. A identidade do denunciante não é coletada/exibida. Denunciar não remove conteúdo nem altera o índice. |
| Central de moderação | Implementada — demonstração | Rota /demonstracao/moderacao, fila fictícia, filtros pendentes/analisadas/todas, prioridade demonstrativa, visualização do elogio, contexto da denúncia e decisões de manter, ocultar temporariamente ou remover com justificativa obrigatória. Registros e decisões ficam em memória. A rota não possui autenticação/autorização e não pode ser usada com denúncias reais. |
| Moderação básica | Parcial — interface demonstrativa | Interface de fila e decisões prototipada. Permanecem pendentes backend, controle de acesso por função, persistência, trilha de auditoria, fila operacional, notificações ao autor, contestação e revisão por pessoa autorizada. |
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
| Segurança no frontend | Pendente de revisão | Revisar validação, upload, exposição de dados, navegação protegida e tratamento de erros. A rota demonstrativa de moderação não é protegida. Política de publicação/moderação documentada; regras definitivas dependem do backend. |
| Testes automatizados | Pendente de execução e cobertura | Não há confirmação de build ou testes locais aprovados. |
| Contratos tipados para API | Parcial | Há modelos de domínio e dados mockados; separar modelos de tela, DTOs e serviços antes da integração. |
| Regra de TypeScript sem any | Implementada como padrão | Manter strict e strictTemplates; não usar any nem $any(). |

## 5. Ordem recomendada para concluir

1. **Fechar a experiência pública de busca:** filtros essenciais, estados vazios, ordenação explicável e navegação consistente.
2. **Fechar o perfil público do negócio:** apresentação dos indicadores, elogios, ausência de dados e ações disponíveis.
3. **Concluir o fluxo de participação:** integrar o registro privado sem elogio, definir elegibilidade/limites contra duplicidade e concluir os estados reais de publicação.
4. **Completar autenticação e conta:** confirmação de e-mail, preferências, segurança e ações de conta; revisar os fluxos visuais de cadastro, login, recuperação e perfil antes da integração.
5. **Concluir a experiência visual de moderação:** revisão da fila, estados, justificativas e fluxo de contestação. A integração real depende do backend, autenticação, autorização e auditoria.
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


### Contestação de decisões de moderação
- Perfil do usuário: demonstração de publicação removida/ocultada com justificativa e formulário de contestação (20 a 1.000 caracteres).
- Serviço tipado de contestações em memória, impedindo mais de uma solicitação por publicação nesta demonstração.
- Central de moderação: lista e análise das contestações, com decisão justificada (mínimo de 10 caracteres).
- Notificações internas demonstrativas no envio e na conclusão da revisão.
- A aceitação da contestação não republica automaticamente o elogio; a decisão sobre o status do conteúdo deve ser registrada separadamente.
- Limitações: dados em memória, sem autenticação/autorização, sem persistência, sem atribuição de revisor independente e sem auditoria. Não utilizar com denúncias ou contestações reais.
