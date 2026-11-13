# BemFalado — redesign editorial da home

Data: 13 de novembro de 2026  
Status: aguardando aprovação para implementação

## Intenção

Evoluir a home Angular do BemFalado usando o layout do Site `bemfalado-explorar` como referência estrutural, sem copiar sua paleta. A nova home deve transmitir descoberta, acolhimento e confiança, reduzir a sensação de formalidade e conduzir com clareza ao fluxo principal: pesquisar um lugar, abrir seu perfil e publicar um elogio.

## Objetivos

- Aplicar uma hierarquia editorial mais marcante, com conteúdo e busca à esquerda e fotografia de experiência à direita.
- Tornar a busca a ação central da primeira dobra.
- Usar cabeçalho compacto, filtros por categoria e cards fotográficos de estabelecimentos.
- Reduzir informações repetidas e espaços vazios sem comprometer a leitura.
- Consolidar um sistema visual reutilizável nas próximas telas.
- Preservar responsividade, acessibilidade, navegação por teclado e modo claro/escuro.
- Disponibilizar a home em português, inglês e espanhol já nesta etapa.
- Manter TypeScript totalmente tipado, sem `any`.

## Não objetivos desta etapa

- Não redesenhar todas as telas de uma vez.
- Não implementar back-end, autenticação real, persistência ou login social.
- Não traduzir todas as demais telas nesta etapa; o mecanismo será reutilizável e a home será a primeira tela totalmente traduzida.
- Não alterar as regras de negócio, ranking ou moderação.
- Não copiar literalmente o Site de referência nem substituir a identidade oficial do BemFalado.
- Não remover os dados fictícios usados para demonstrar o front-end.

## Restrições e decisões existentes

- Stack: Angular 22, TypeScript 6 e SCSS.
- Repositório: `FPORTELLA5/bemfalado`.
- Base visual em andamento: branch `design/petroleo-e-nevoa`.
- A branch de design está três commits à frente da `main`, enquanto a `main` contém uma correção posterior da logo.
- A logo oficial continua sendo o balão sorrindo com três reticências, sem caixa branca.
- A paleta Petróleo e névoa continua aprovada; o layout de referência não autoriza copiar a paleta roxa.
- A versão escura deve manter as cores da marca e contraste adequado.
- O front-end será finalizado e validado antes do back-end.
- Idioma padrão: português do Brasil, com inglês e espanhol selecionáveis e preferência preservada no navegador.

## Abordagens consideradas

### 1. Reestruturar por etapas — escolhida

Primeiro consolidar a base visual e redesenhar a home. Depois da validação da usuária, aplicar os mesmos padrões às telas de busca, perfil do estabelecimento, elogio, autenticação e área da conta.

Vantagens: permite validar a direção cedo, reduz retrabalho e mantém mudanças menores e verificáveis.  
Custo: o conjunto completo leva mais rodadas.

### 2. Alterar todas as telas de uma vez

Aplicar o novo layout a todo o front-end em uma única rodada.

Vantagem: visão rápida do conjunto.  
Riscos: mais regressões, revisão difícil e maior retrabalho se a direção precisar mudar.

## Estrutura da nova home

### Cabeçalho

- Seletor de idioma acessível para Português, English e Español.
- Altura compacta e comportamento fixo já existente.
- Logo oficial à esquerda.
- Navegação principal ao centro no desktop.
- Controle de tema e CTA “Fazer um elogio” à direita.
- Menu acessível e CTA adaptado no celular.

### Primeira dobra

- Grade assimétrica no desktop e pilha no celular.
- Eyebrow curto, título editorial e descrição objetiva.
- Busca por estabelecimento/serviço integrada ao bloco.
- Fotografia grande de uma experiência realista, com legenda curta de elogio sobreposta.
- Sem ilustrações orbitais ou cartões decorativos que disputem atenção com a busca.

### Exploração

- Seção “Lugares bem falados” logo após a primeira dobra.
- Localização visível.
- Filtros compactos por categoria.
- Cards fotográficos com nome, categoria, localização, indicadores de elogios e ação de favorito.
- Dados fictícios atuais serão adaptados; nenhuma informação será apresentada como dado real.

### Conteúdo posterior

- Reaproveitar apenas blocos que acrescentem informação nova.
- “Como funciona” em formato compacto.
- CTA final para publicar elogio.
- Rodapé simplificado e consistente.

## Internacionalização

- Centralizar todo o texto visível da home em catálogos tipados, sem strings duplicadas nos templates.
- Disponibilizar os idiomas `pt-BR`, `en` e `es` por um serviço de idioma reutilizável.
- Usar `pt-BR` como fallback quando uma chave não existir.
- Persistir a escolha em `localStorage` e respeitar o idioma do navegador no primeiro acesso quando for inglês ou espanhol.
- Atualizar o atributo `lang` do documento ao trocar o idioma.
- Traduzir navegação, botões, campos, placeholders, mensagens de validação, categorias, cards demonstrativos, seções e rodapé da home.
- Garantir que o seletor funcione por teclado e tenha nome acessível.

## Sistema visual

- Criar tokens semânticos para superfície, texto, borda, ação, destaque e estados nos temas claro e escuro.
- Remover ou neutralizar duplicações conflitantes entre `styles.scss` e `app.component.scss`.
- Preservar a paleta Petróleo e névoa e as cores oficiais da logo.
- Usar tipografia editorial nos títulos e tipografia funcional no restante da interface, com fontes locais ou carregamento já compatível com o projeto.
- Padronizar raios, sombras, espaçamentos, estados de foco e transições.
- Respeitar `prefers-reduced-motion`.

## Estratégia de branch

A implementação partirá da branch `design/petroleo-e-nevoa` em uma nova branch de trabalho. A correção da logo existente na `main` será incorporada explicitamente, sem sobrescrever os três commits de design. A `main` não será alterada nesta etapa.

## Verificação

- Executar `npm run validate` para a regra de ausência de `any` e o build.
- Verificar home em desktop, tablet e celular.
- Conferir temas claro, escuro e automático.
- Conferir a home completa em `pt-BR`, `en` e `es`, incluindo persistência após recarregar e atualização do atributo `lang`.
- Percorrer busca, navegação por teclado, menu móvel, troca de tema e CTA de elogio.
- Conferir foco visível, nomes acessíveis, contraste e redução de movimento.
- Revisar console do navegador para erros.
- Entregar a branch para validação visual antes de propagar o layout às demais telas.

## Decisões deixadas para implementação

- Seleção da fotografia entre ativos já disponíveis ou um novo ativo livre/gerado coerente com a marca.
- Ajustes finos de proporção, espaçamento e tipografia necessários para responsividade.
- Nome exato da branch de trabalho.
