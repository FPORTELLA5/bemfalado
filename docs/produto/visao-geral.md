# Visão geral do produto — Elogie Aqui

## Propósito

O Elogie Aqui é uma plataforma para descobrir e valorizar experiências positivas com estabelecimentos, profissionais, empresas e serviços. A proposta é transformar elogios e avaliações em informação útil para outras pessoas.

## Tipos de usuário

### Visitante
- Pesquisa estabelecimentos, profissionais, empresas e serviços.
- Consulta páginas públicas e prévias limitadas de avaliações.
- Conhece a plataforma antes de criar uma conta.

### Usuário cadastrado
- Consulta avaliações completas.
- Publica avaliações e comentários.
- Edita ou exclui as próprias publicações.
- Salva favoritos e interage com avaliações.

### Representante de negócio (fase posterior)
- Solicita a reivindicação/verificação de um perfil comercial.
- Responde a avaliações conforme as regras da plataforma.
- Solicita correções de dados cadastrais.
- Não pode editar ou excluir avaliações de consumidores.

### Administrador/moderador
- Analisa denúncias.
- Modera conteúdo conforme políticas públicas.
- Gerencia usuários, negócios e registros de moderação.

## Descoberta

A pesquisa deverá permitir localizar negócios por nome, categoria, cidade, bairro e localização (quando autorizada). A listagem poderá oferecer filtros e ordenação por avaliação geral e critérios específicos da categoria.

## Avaliações

Proposta inicial:
- Escala de 1 a 5 estrelas;
- Critérios específicos conforme a categoria;
- Comentário textual;
- Fotos opcionais, sujeitas a regras de segurança e moderação;
- Edição e exclusão pelo autor;
- Recalculo das médias após alterações válidas.

**Diretriz definida:** o Elogie Aqui aceitará exclusivamente elogios e relatos de experiências positivas. Não será uma plataforma de reclamações nem um espaço para avaliações negativas.

### Regras decorrentes
- A publicação deve descrever uma experiência genuinamente positiva.
- A nota deverá refletir uma experiência positiva; a escala e os critérios serão definidos para não incentivar avaliações negativas.
- Conteúdo crítico, ofensivo, difamatório ou usado para atacar pessoas/negócios não será publicado como elogio.
- Denúncias continuam disponíveis para sinalizar fraude, conteúdo impróprio, conflito de interesse ou violação das regras.
- A moderação deverá distinguir uma crítica disfarçada de elogio de um relato positivo legítimo.
- A plataforma não deve prometer que todos os negócios terão elogios: ausência de avaliações significa apenas ausência de relatos publicados.

A política editorial positiva não elimina a necessidade de moderação, transparência ou mecanismos para corrigir informações factuais incorretas.

Também deverão ser definidas regras para critérios não aplicáveis, volume mínimo de avaliações, prevenção de fraude e apresentação de notas com baixa amostragem.

## Acesso e monetização

- Cadastro e publicação de avaliações por consumidores gratuitos.
- Visitantes podem pesquisar e consultar informações públicas, com limitações progressivas.
- Recursos pagos direcionados principalmente a representantes de negócios.
- Recursos comerciais futuros: perfil verificado, respostas, análises e gestão de múltiplas unidades.
- Conteúdo patrocinado identificado claramente.
- Pagamento não compra avaliações, remoção de avaliações legítimas ou alteração do ranking orgânico.

As limitações de acesso deverão ser validadas pelo backend, não apenas pela interface.

## Idiomas e acessibilidade

Idiomas planejados: Português (Brasil), Inglês e Espanhol.

Meta de acessibilidade: WCAG 2.2 nível AA. A interface deverá ser responsiva para celular, tablet e desktop.

## Requisitos transversais

- Segurança e proteção contra spam e avaliações falsas;
- Privacidade e conformidade com a LGPD;
- Moderação e trilha de auditoria;
- Desempenho adequado nas pesquisas;
- Páginas públicas preparadas para indexação;
- Testes automatizados e documentação da API;
- Armazenamento seguro de imagens fora do disco efêmero da aplicação.

## Fluxos principais

### Descobrir
Página inicial → pesquisa → filtros → resultados → perfil do negócio → avaliações.

### Publicar
Login → localizar negócio → selecionar critérios → avaliar → comentar → adicionar fotos opcionais → publicar.

### Encontrar os melhores
Selecionar categoria e região → escolher nota geral ou critério → consultar resultados ordenados.

## Escopo inicial sugerido (MVP)

1. Estrutura do projeto e documentação;
2. Cadastro, login e perfil de usuário;
3. Categorias e cadastro de negócios;
4. Pesquisa e página pública do negócio;
5. Publicação e consulta de avaliações;
6. Cálculo e apresentação das notas;
7. Denúncia e moderação básica;
8. Testes, segurança e preparação para publicação.

O escopo será refinado antes de iniciar cada módulo.
