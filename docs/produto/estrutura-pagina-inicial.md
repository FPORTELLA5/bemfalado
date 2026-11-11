# Estrutura da página inicial — BemFalado

Status: proposta inicial de UX para o MVP. Conteúdo e hierarquia sujeitos a prototipação e testes com usuários.

## Objetivo da página

Ajudar visitantes a entender a proposta do BemFalado, pesquisar estabelecimentos, empresas e serviços e descobrir elogios publicados por pessoas reais. A navegação e a pesquisa devem estar disponíveis sem exigir cadastro.

## Princípios de experiência

- Busca como ação principal e primeiro foco visual.
- Linguagem simples, próxima e confiável.
- Não usar estrelas ou notas de 1 a 5.
- Não inventar estabelecimentos, números, rankings ou depoimentos para preencher a interface.
- Diferenciar claramente dados reais, conteúdo demonstrativo e conteúdo patrocinado.
- Priorizar a experiência mobile, mantendo boa adaptação para tablet e desktop.
- Não exigir login para pesquisar e consultar conteúdo público.

## Hierarquia proposta

### 1. Cabeçalho

Elementos:
- Logotipo BemFalado.
- Navegação para categorias.
- Link ou botão "Entrar".
- Ação "Criar conta".
- No mobile, menu compacto e acesso visível à pesquisa.

### 2. Hero e busca principal

Título sugerido: **Encontre lugares e serviços bem falados.**

Texto de apoio: "Descubra boas experiências compartilhadas por pessoas reais e escolha com mais confiança."

Campo de busca com placeholder: "Busque um lugar, empresa ou serviço".

A busca deve aceitar nome do negócio, categoria e região. A localização pode ser digitada pelo usuário; solicitar localização do dispositivo é opcional e somente mediante autorização.

Ação principal: **Buscar**.

### 3. Explorar categorias

Exibir atalhos visuais para as categorias do MVP:
1. Alimentação e bebidas
2. Saúde e bem-estar
3. Beleza e estética
4. Comércio e lojas
5. Casa e construção
6. Automóveis e transporte
7. Educação
8. Turismo e hospedagem
9. Tecnologia e serviços digitais
10. Outros serviços

Em telas pequenas, usar rolagem horizontal acessível ou grade adaptável, sem esconder categorias essenciais.

### 4. Descobrir negócios

Título sugerido: **O que anda sendo bem falado**

A seção poderá apresentar negócios com dados reais da plataforma, com critérios transparentes de ordenação. Não publicar ranking vazio ou baseado em dados fictícios.

Cada cartão poderá mostrar:
- Nome e categoria do negócio.
- Região/endereço resumido, quando disponível.
- Quantidade de elogios.
- Índice de reconhecimento e base de experiências, somente quando cumprir o mínimo de dados definido.
- Uma ou duas qualidades frequentemente elogiadas, quando houver volume suficiente.

Se ainda não houver dados suficientes, substituir a seção por uma explicação do funcionamento ou por categorias populares, sem simular popularidade.

### 5. Como funciona

Três passos:
1. **Encontre** — pesquise um estabelecimento, empresa ou serviço.
2. **Conheça** — leia experiências positivas compartilhadas por usuários.
3. **Compartilhe** — teve uma boa experiência? Publique seu elogio.

### 6. Convite para participar

Título: **Uma boa experiência merece ser contada.**

Texto: "Ajude outras pessoas a fazer boas escolhas. Compartilhe uma experiência positiva que merece ser conhecida."

Ação: **Compartilhar experiência**.

Cadastro só deve ser solicitado quando a pessoa iniciar uma ação que exija conta, como publicar, salvar ou interagir.

### 7. Rodapé

Links previstos:
- Sobre o BemFalado.
- Como funciona.
- Categorias.
- Diretrizes da comunidade.
- Privacidade e LGPD.
- Termos de uso.
- Contato.
- Acesso para empresas, quando o fluxo comercial estiver disponível.

## Comportamento de busca

- Sugestões enquanto a pessoa digita, sem bloquear a digitação.
- Resultados separados ou filtráveis por negócio, categoria e região.
- Estado vazio com orientação para revisar termos ou região.
- Mensagem clara quando um negócio ainda não possui elogios: ausência de elogios não significa avaliação negativa.
- Filtros e ordenação devem ser explicáveis e não sugerir que pagamento compra posição orgânica.

## Confiança e transparência

- Exibir elogios de usuários reais conforme regras de autenticidade e moderação.
- Quando mostrar índice de reconhecimento, apresentar também o número de experiências válidas e o período considerado.
- Não tratar o índice como representação de todos os clientes do negócio.
- Identificar publicidade e conteúdo patrocinado de forma explícita.
- Não permitir que empresas paguem para remover elogios legítimos ou manipular indicadores orgânicos.

## Acessibilidade e responsividade

- Atender à meta WCAG 2.2 AA.
- Navegação completa por teclado e foco visível.
- Rótulos acessíveis para campos, botões e ícones.
- Contraste adequado; não usar apenas cor para transmitir informação.
- Textos e controles legíveis em telas pequenas.
- Respeitar ampliação de texto e preferência por movimento reduzido.

## Questões para validar no protótipo

1. Se a busca deve sugerir primeiro negócios próximos ou correspondências exatas de nome.
2. Qual o volume mínimo de experiências para exibir o índice de reconhecimento.
3. Quais critérios de ordenação serão usados em "O que anda sendo bem falado".
4. Quais informações públicas ficam visíveis para visitantes sem conta.
5. Como apresentar negócios novos ou sem elogios sem prejudicar sua descoberta.

## Fora do escopo desta tela no MVP

- Página e gestão de profissionais autônomos.
- Painel pago de empresas.
- Anúncios e posições patrocinadas.
- Rankings sem dados reais ou critérios publicados.
