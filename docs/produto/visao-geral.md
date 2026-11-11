# Visão geral do produto — Elogie Aqui

## Propósito

O Elogie Aqui é uma plataforma para descobrir e valorizar experiências positivas com estabelecimentos, empresas e serviços. A proposta é transformar elogios e recomendações em informação útil para outras pessoas.

## Tipos de usuário

### Visitante
- Pesquisa estabelecimentos, empresas e serviços.
- Consulta páginas públicas e prévias limitadas de avaliações.
- Conhece a plataforma antes de criar uma conta.

### Usuário cadastrado
- Consulta avaliações completas.
- Publica elogios e recomendações.
- Edita ou exclui as próprias publicações.
- Salva favoritos e interage com avaliações.

### Representante de negócio (fase posterior)
- Solicita a reivindicação/verificação de um perfil comercial.
- Responde a elogios conforme as regras da plataforma.
- Solicita correções de dados cadastrais.
- Não pode editar ou excluir elogios de consumidores.

### Administrador/moderador
- Analisa denúncias.
- Modera conteúdo conforme políticas públicas.
- Gerencia usuários, negócios e registros de moderação.

## Escopo por fases

### Fase 1 — MVP

O lançamento inicial atenderá:
- Estabelecimentos físicos;
- Empresas;
- Lojas físicas e virtuais;
- Serviços oferecidos por empresas.

Não haverá, no MVP, páginas independentes para profissionais autônomos ou prestadores de serviços individuais.

### Fase 2 — Expansão

Após validar o uso da plataforma, poderá ser incluído:
- Cadastro e páginas próprias para profissionais autônomos;
- Prestadores de serviços individuais;
- Categorias e critérios específicos para profissionais.

A arquitetura deverá evitar decisões que impeçam essa expansão, mas o MVP não deve implementar antecipadamente toda a complexidade da fase 2.

## Descoberta

A pesquisa deverá permitir localizar negócios por nome, categoria, cidade, bairro e localização (quando autorizada). A listagem poderá oferecer filtros e ordenação por quantidade de recomendações e critérios específicos da categoria.

## Avaliações e elogios

Diretriz definida: o Elogie Aqui aceitará exclusivamente elogios e relatos de experiências positivas. Não será uma plataforma de reclamações nem um espaço para avaliações negativas.

Proposta inicial de publicação:
- Selecionar um estabelecimento, empresa ou serviço oferecido por uma empresa;
- Marcar os aspectos positivos da experiência;
- Informar um título;
- Escrever um relato positivo;
- Adicionar fotos opcionais, sujeitas a regras de segurança e moderação;
- Editar ou excluir a própria publicação.

Não será utilizada uma escala de estrelas de 1 a 5 no modelo inicial. A plataforma destacará:
- Quantidade de elogios recebidos;
- Qualidades mais elogiadas;
- Elogios recentes;
- Elogios considerados úteis pela comunidade;
- Evolução do reconhecimento ao longo do tempo.

Não deverá ser exibido um percentual de recomendação calculado apenas entre elogios, pois esse número pode sugerir uma amostra de avaliações positivas e negativas que a plataforma não coleta.

### Regras decorrentes
- A publicação deve descrever uma experiência genuinamente positiva.
- O conteúdo não pode ser usado para reclamações, ataques, ofensas ou exposição indevida.
- Denúncias continuam disponíveis para sinalizar fraude, conteúdo impróprio, conflito de interesse ou violação das regras.
- A moderação deverá distinguir um elogio legítimo de uma crítica disfarçada.
- A plataforma não deve prometer que todos os negócios terão elogios: ausência de publicações significa apenas ausência de relatos registrados.
- A política editorial positiva não elimina a necessidade de moderação, transparência ou mecanismos para corrigir informações factuais incorretas.
- Devem ser definidas regras para prevenção de fraude, volume mínimo de publicações antes de destacar indicadores e apresentação transparente dos dados.

## Acesso e monetização

- Cadastro e publicação de elogios por consumidores gratuitos.
- Visitantes podem pesquisar e consultar informações públicas, com limitações progressivas.
- Recursos pagos direcionados principalmente a representantes de negócios.
- Recursos comerciais futuros: perfil verificado, respostas, análises e gestão de múltiplas unidades.
- Conteúdo patrocinado identificado claramente.
- Pagamento não compra elogios, remoção de publicações legítimas ou alteração do destaque orgânico.

As limitações de acesso deverão ser validadas pelo backend, não apenas pela interface.

## Idiomas e acessibilidade

Idiomas planejados: Português (Brasil), Inglês e Espanhol.

Meta de acessibilidade: WCAG 2.2 nível AA. A interface deverá ser responsiva para celular, tablet e desktop.

## Requisitos transversais

- Segurança e proteção contra spam e elogios falsos;
- Privacidade e conformidade com a LGPD;
- Moderação e trilha de auditoria;
- Desempenho adequado nas pesquisas;
- Páginas públicas preparadas para indexação;
- Testes automatizados e documentação da API;
- Armazenamento seguro de imagens fora do disco efêmero da aplicação.

## Fluxos principais

### Descobrir
Página inicial → pesquisa → filtros → resultados → perfil do negócio → elogios.

### Publicar um elogio
Login → localizar negócio → selecionar aspectos positivos → escrever título e relato → adicionar fotos opcionais → revisar → publicar.

### Encontrar negócios bem recomendados
Selecionar categoria e região → consultar negócios com mais elogios e qualidades mais destacadas → abrir o perfil e ler os relatos.

## Escopo inicial sugerido (MVP)

1. Estrutura do projeto e documentação;
2. Cadastro, login e perfil de usuário;
3. Categorias e cadastro de estabelecimentos/empresas;
4. Pesquisa e página pública do negócio;
5. Publicação e consulta de elogios;
6. Indicadores de elogios e qualidades destacadas;
7. Denúncia e moderação básica;
8. Testes, segurança e preparação para publicação.

O escopo será refinado antes de iniciar cada módulo.
