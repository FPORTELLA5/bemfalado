# Política de publicação, conteúdo e moderação — BemFalado

Versão: 1.0 — proposta funcional para o MVP  
Status: documento de produto para orientar UX, frontend, backend e revisão jurídica. Não substitui Termos de Uso, Política de Privacidade ou parecer jurídico.

## 1. Objetivo e princípio editorial

O BemFalado existe para compartilhar experiências positivas sobre estabelecimentos, empresas e serviços oferecidos por empresas. A plataforma não é um canal público de reclamações, denúncias contra empresas ou avaliações negativas.

A política deve proteger quatro interesses ao mesmo tempo:
- a integridade e a finalidade positiva do produto;
- a liberdade de compartilhar elogios legítimos;
- a privacidade e a segurança de usuários e terceiros;
- a possibilidade de corrigir decisões equivocadas de moderação.

A aplicação das regras deve ser proporcional, explicável e consistente. Um sinal isolado não deve resultar automaticamente em punição de conta nem na exclusão definitiva de conteúdo.

## 2. Escopo

Aplica-se a:
- títulos e textos de elogios;
- qualidades selecionadas pelo usuário;
- imagens e arquivos anexados;
- emojis, símbolos, links e caracteres especiais;
- solicitações de inclusão de estabelecimentos;
- denúncias privadas e interações relacionadas à moderação.

As regras também se aplicam a conteúdo editado. A versão alterada deve passar novamente pelas validações pertinentes.

## 3. Conteúdo permitido

É permitido publicar conteúdo que:
- descreva uma experiência realmente vivida pelo usuário;
- tenha relação clara com o estabelecimento, empresa, produto, atendimento ou serviço oferecido;
- comunique uma percepção positiva de forma respeitosa;
- apresente informações verdadeiras segundo o conhecimento do autor;
- não exponha dados pessoais ou conversas privadas de terceiros;
- utilize imagens que o usuário tenha direito de compartilhar e que respeitem a privacidade das pessoas retratadas.

Exemplos:
- “A equipe foi atenciosa e resolveu minha solicitação com agilidade.”
- “O ambiente é organizado e os produtos chegaram bem embalados.”
- “Gostei da qualidade do serviço e da clareza nas orientações.”

A plataforma não exige linguagem formal. Erros de digitação, regionalismos, gírias e emojis comuns não são, por si só, motivo para bloqueio.

## 4. Conteúdo não permitido

### 4.1 Conteúdo incompatível com a proposta positiva
- reclamações, avaliações negativas ou relatos cujo sentido predominante seja depreciar a experiência;
- acusações ou denúncias públicas contra o estabelecimento;
- textos usados para ameaçar, constranger, retaliar ou iniciar conflitos;
- conteúdo sem relação com uma experiência ou com o negócio selecionado.

Quando o texto for claramente uma reclamação, a publicação deve ser impedida com uma mensagem respeitosa explicando que o BemFalado publica apenas experiências positivas. Não se deve converter a tentativa em uma reclamação pública nem incentivar o usuário a reformular artificialmente uma experiência negativa como elogio.

### 4.2 Abuso e violência
- insultos, humilhação, assédio ou perseguição;
- ameaças, incentivo à violência ou celebração de violência;
- conteúdo discriminatório ou de incitação ao ódio, incluindo ataques por raça, cor, origem, nacionalidade, religião, gênero, orientação sexual, deficiência ou outras características protegidas;
- conteúdo sexual explícito, exploração sexual ou assédio sexual.

### 4.3 Privacidade e dados pessoais
- senhas, códigos de autenticação, dados bancários ou de pagamento;
- CPF, RG, passaporte, documentos e números identificadores de terceiros;
- endereço residencial, telefone particular, e-mail pessoal ou localização precisa de terceiros sem base legítima;
- dados de saúde, biometria ou outras informações sensíveis;
- conversas privadas, mensagens, e-mails, prontuários ou documentos de terceiros sem autorização;
- imagens de documentos, cartões, telas ou comprovantes que revelem informações pessoais.

O sistema deve solicitar a remoção ou ocultação de informação identificável quando isso for tecnicamente possível e seguro. Conteúdo com exposição grave deve ser bloqueado antes da publicação e encaminhado para revisão quando necessário.

### 4.4 Spam, manipulação e fraude
- publicidade, links promocionais ou códigos de desconto não autorizados;
- repetição de conteúdo idêntico ou quase idêntico;
- publicação em massa ou automatizada;
- elogios falsos, experiências inventadas ou conflito de interesse não informado;
- tentativa de comprar, vender ou trocar elogios;
- coordenação para inflar artificialmente o número de elogios ou o Índice de Reconhecimento;
- uso de contas múltiplas para contornar limites ou decisões de moderação.

### 4.5 Direitos de terceiros e segurança
- imagens ou textos sem autorização ou direito de uso;
- arquivos executáveis, formatos não aceitos ou arquivos potencialmente maliciosos;
- conteúdo que facilite fraude, phishing ou obtenção indevida de dados.

## 5. Regras por tipo de conteúdo

### 5.1 Texto, título e qualidades
A validação deve combinar:
1. regras determinísticas para padrões inequívocos, como dados estruturados, termos de ameaça conhecidos e spam evidente;
2. normalização para detectar evasões simples;
3. análise contextual para identificar sentido, alvo e finalidade;
4. revisão humana nos casos ambíguos ou de maior impacto.

A normalização pode considerar caixa, acentuação, espaços repetidos, pontuação excessiva, caracteres invisíveis, repetição artificial e caracteres visualmente semelhantes. O texto original deve ser preservado para auditoria, com acesso restrito.

Uma lista de termos é apenas um sinal, nunca a única base para decidir se uma publicação é inadequada. Palavras como “não”, “problema”, “demora” ou “caro” não devem ser bloqueadas isoladamente: podem aparecer em um elogio legítimo. A classificação deve considerar a frase completa e o contexto.

### 5.2 Imagens e anexos
No MVP, a interface deve aceitar somente JPEG, PNG e WebP, com até 3 imagens por publicação e limite de 5 MB por imagem, conforme o fluxo atual de demonstração. Esses limites deverão ser aplicados novamente no servidor.

Antes de disponibilizar uma imagem publicamente, a solução de backend deverá:
- validar o conteúdo real do arquivo e sua assinatura, não apenas a extensão ou o MIME informado pelo navegador;
- rejeitar arquivos corrompidos, formatos não aceitos e conteúdo malicioso;
- remover metadados EXIF, especialmente coordenadas e dados do dispositivo;
- gerar versões seguras para exibição, sem servir o arquivo original diretamente;
- verificar duplicidade e sinais de abuso;
- analisar conteúdo visual inadequado e, quando aplicável, texto extraído por OCR;
- identificar possíveis documentos, dados pessoais, telas de conversas e comprovantes.

A imagem deve ser bloqueada quando houver conteúdo claramente proibido ou exposição grave de dados pessoais. Conteúdo ambíguo deve ficar pendente de análise, sem publicação pública até a decisão. Fotos com pessoas não são automaticamente proibidas; devem ser avaliados contexto, necessidade, autorização, expectativa de privacidade e proteção especial de crianças e adolescentes.

A validação no navegador serve para orientar o usuário, mas não substitui análise e segurança no servidor. Se o serviço de análise estiver indisponível, não se deve publicar silenciosamente um anexo ainda não verificado.

### 5.3 Emojis, símbolos e caracteres
- Emojis positivos e neutros são permitidos.
- Emojis ambíguos devem ser avaliados no contexto da frase.
- Emojis ou sequências usados para ameaçar, assediar, discriminar ou sexualizar de forma explícita podem ser bloqueados.
- Repetição excessiva, sequências sem sentido ou uso para inundar o conteúdo podem gerar pedido de correção ou sinalização de spam.
- Não bloquear automaticamente um emoji isolado sem considerar contexto, combinação e alvo.

### 5.4 Links
Links externos não são necessários para um elogio comum. No MVP, recomenda-se não permitir URLs no título ou no corpo do elogio. Se futuramente houver exceção, links deverão passar por validação, proteção contra phishing e política própria. A mensagem de bloqueio deve explicar que o campo é destinado ao relato da experiência, não à divulgação de links.

## 6. Classificação e ações

A classificação deve considerar gravidade, confiança da detecção, contexto, histórico relevante e possibilidade de correção. A ação não deve ser determinada apenas por uma pontuação automática.

| Nível | Situação típica | Ação antes da publicação |
|---|---|---|
| Permitido | Elogio pertinente e respeitoso, sem sinais relevantes | Permitir seguir para publicação |
| Correção solicitada | Excesso de emojis, URL, formatação abusiva ou possível dado removível | Impedir envio até o usuário corrigir |
| Bloqueio | Ameaça explícita, discriminação, assédio, conteúdo sexual explícito, documento exposto ou reclamação clara | Não publicar; explicar a regra em linguagem simples |
| Revisão humana | Ambiguidade contextual, suspeita de fraude, possível conflito de interesse ou classificação automatizada incerta | Manter como pendente, sem exibição pública, até revisão |

Após publicação, uma denúncia ou detecção posterior deve gerar análise. Uma denúncia isolada não remove automaticamente o elogio. Medidas urgentes podem ser necessárias em situações de risco grave ou exposição de dados, com registro do motivo e revisão posterior.

## 7. Mensagens ao usuário

As mensagens devem ser claras, respeitosas e acionáveis. Não devem revelar listas internas de palavras, limiares, regras antifraude ou detalhes que facilitem contornar a proteção.

Exemplos:
- **Fora da proposta:** “O BemFalado é destinado a compartilhar experiências positivas. Este texto não pode ser publicado aqui. Se desejar, você pode registrar uma experiência positiva que realmente tenha vivido.”
- **Possível dado pessoal:** “Identificamos uma informação que pode identificar você ou outra pessoa. Remova esse dado antes de continuar.”
- **Imagem inadequada ou não validada:** “Esta imagem não pode ser publicada. Escolha outra imagem que respeite a privacidade e as regras da comunidade.”
- **Link:** “Não é permitido incluir links neste campo. Conte sua experiência diretamente no texto.”
- **Revisão:** “Seu conteúdo precisa de uma análise adicional antes de ser publicado. Você poderá acompanhar o resultado na sua conta.”

Não afirmar que uma pessoa cometeu fraude ou violou a lei com base apenas em uma classificação automatizada.

## 8. Denúncias privadas

Usuários autenticados poderão denunciar um elogio publicado. A denúncia:
- será privada e visível apenas a pessoas autorizadas na equipe de moderação;
- não será exibida no perfil público do usuário ou do estabelecimento;
- não será enviada ao estabelecimento com a identidade do denunciante;
- não será contabilizada como experiência, elogio ou fator do Índice de Reconhecimento;
- não retirará automaticamente o conteúdo do ar;
- deverá exigir uma categoria de motivo e permitir detalhe opcional, com limite de caracteres e aviso para não incluir dados sensíveis desnecessários.

Motivos iniciais:
1. Conteúdo não relacionado a uma experiência real;
2. Possível informação falsa ou enganosa;
3. Exposição de dados pessoais ou conteúdo privado;
4. Linguagem ofensiva, discriminatória ou ameaçadora;
5. Suspeita de spam, manipulação ou fraude;
6. Uso indevido de imagem ou conteúdo de terceiros;
7. Outro motivo relacionado às regras da comunidade.

O formulário não deve funcionar como canal de reclamação sobre o estabelecimento. A denúncia deve se referir a uma possível violação das regras do conteúdo publicado.

## 9. Fila, decisões e auditoria de moderação

A fila interna deverá permitir:
- visualizar o conteúdo e o contexto estritamente necessários;
- consultar motivo, data e quantidade de denúncias sem expor a identidade do denunciante ao estabelecimento;
- priorizar risco grave, exposição de dados e conteúdo potencialmente ilegal;
- atribuir análise a moderador autorizado;
- registrar decisão, justificativa, regra aplicada, responsável e data;
- preservar versões anteriores e histórico de alterações;
- impedir que uma pessoa sem permissão visualize ou altere a fila.

Decisões possíveis:
- manter publicação;
- solicitar edição ao autor, quando aplicável;
- ocultar temporariamente enquanto se apura risco relevante;
- remover conteúdo por violação confirmada;
- restringir temporariamente funcionalidades ou conta em caso de abuso comprovado e proporcional;
- encerrar denúncia sem ação quando não houver violação.

Toda ação deverá ter justificativa registrada. Não deve haver remoção automática definitiva baseada apenas em uma denúncia ou em uma classificação de IA.

## 10. Revisão e contestação

Quando uma publicação for bloqueada ou removida, o usuário deverá receber uma explicação adequada e, quando aplicável, poder solicitar revisão. A contestação deverá ser analisada por pessoa autorizada diferente da decisão inicial sempre que operacionalmente possível.

A plataforma deve informar:
- qual regra foi aplicada, em linguagem compreensível;
- se a decisão é preventiva ou final;
- como solicitar revisão;
- se o conteúdo pode ser editado e reenviado.

Regras funcionais propostas para o fluxo:
- a contestação deve ser vinculada à publicação e à decisão específica contestada;
- o autor deve apresentar justificativa, com limite de tamanho e validação no servidor;
- deve ser permitida uma contestação por decisão, com proteção contra envios duplicados;
- a solicitação deve gerar confirmação e atualização privada de status ao autor;
- estados mínimos: aguardando análise, contestação aceita e contestação não aceita;
- a revisão deve ser realizada por pessoa autorizada diferente da decisão inicial sempre que operacionalmente possível;
- a decisão da contestação exige justificativa, responsável, data e histórico;
- aceitar a contestação não deve republicar automaticamente o conteúdo: a equipe deve registrar separadamente o novo status da publicação, considerando o motivo da decisão original e a revisão;
- o envio ou resultado da contestação não altera diretamente o Índice de reconhecimento.

O prazo operacional de resposta será definido antes do lançamento e divulgado nos canais adequados. Não prometer prazo ainda não suportado pela operação.

## 11. Proteção contra abuso e manipulação

O backend deverá prever:
- limites de frequência para publicação, edição e denúncias;
- detecção de duplicidade textual e visual;
- sinais de automação e comportamento coordenado;
- proteção contra enumeração e criação abusiva de contas;
- controles graduais, evitando punição por um único sinal fraco;
- monitoramento de padrões de manipulação do Índice de Reconhecimento;
- mecanismos de revisão de falsos positivos e falsos negativos.

Sinais técnicos, como IP ou dispositivo, devem ser tratados com minimização, finalidade definida, acesso restrito, retenção limitada e revisão jurídica. Não devem ser usados isoladamente para concluir que houve fraude.

## 12. Relação com o Índice de Reconhecimento

- Denúncias não entram no numerador nem no denominador do índice.
- O envio de denúncia não altera o índice.
- Conteúdo ocultado preventivamente deve ter tratamento definido e auditável para evitar mudanças silenciosas no indicador.
- Uma remoção confirmada pode exigir recalcular indicadores, preservando o histórico e a explicação da alteração.
- Registros privados de experiência sem elogio seguem regras próprias de elegibilidade e prevenção a duplicidade; não podem ser confundidos com denúncias.
- A interface deve informar a base de cálculo e o período do indicador.

## 13. Privacidade, acesso e retenção

A implementação deverá seguir minimização de dados, finalidade, transparência, segurança e controle de acesso. Identidade de denunciante, dados de anexos, sinais antifraude e histórico de moderação devem ter acesso restrito por função.

Antes do lançamento, definir com assessoria jurídica:
- base legal e avisos aplicáveis a cada tratamento;
- prazos de retenção e descarte de denúncias, anexos e logs;
- atendimento a solicitações de titulares;
- tratamento de dados de crianças e adolescentes;
- procedimento para solicitações legais e incidentes de segurança;
- responsabilidades dos fornecedores de análise de texto e imagem e transferências internacionais, se houver.

Não coletar documentos ou dados sensíveis no formulário de denúncia como padrão. Não reter indefinidamente imagens rejeitadas ou cópias desnecessárias.

## 14. Escopo de implementação

### MVP — obrigatório para lançamento
- validação de campos e regras básicas no frontend para orientar o usuário;
- validação autoritativa no backend antes de publicar;
- bloqueio de URLs no texto do elogio;
- regras determinísticas para padrões claros de abuso, dados pessoais estruturados e spam;
- análise contextual para reclamações e conteúdo ambíguo;
- validação segura de arquivos e imagens no servidor;
- remoção de metadados EXIF e armazenamento privado até aprovação;
- denúncia privada com motivos estruturados;
- fila de análise humana e decisões auditáveis;
- controle de acesso por função no backend;
- revisão/contestação de decisões;
- limites de frequência e prevenção básica a duplicidade;
- mensagens de erro acessíveis e orientação para correção.

### Evolução planejada
- análise multimodal mais avançada e OCR em escala;
- detecção aprimorada de contas coordenadas e redes de manipulação;
- modelos de risco calibrados com revisão de desempenho;
- painel de métricas de moderação e auditoria;
- automação de priorização da fila, sem retirar a responsabilidade humana em decisões sensíveis.

### Dependências e limites
- O frontend Angular não é uma barreira de segurança. Todas as regras devem ser revalidadas no backend.
- IA e serviços externos de análise não devem ser presumidos como gratuitos ou configurados. Avaliar custo, precisão, privacidade, localização do processamento e termos do fornecedor antes da escolha.
- A tela administrativa pode ser prototipada no frontend, mas não deve ser exposta como funcional nem considerada segura até existir autenticação, autorização e auditoria no backend.
- A política e os textos legais devem passar por revisão jurídica antes da publicação.

## 15. Critérios de aceite

Uma implementação estará apta à validação funcional quando:
- um elogio positivo e pertinente puder prosseguir;
- uma reclamação clara não puder ser publicada como elogio;
- conteúdo com ameaça, discriminação ou exposição grave de dados for bloqueado;
- palavras ambíguas não forem bloqueadas sem análise contextual;
- imagem inválida, perigosa ou não verificada não puder ser publicada;
- emojis comuns forem aceitos e uso abusivo puder ser corrigido;
- links no texto forem impedidos conforme a regra;
- uma denúncia permanecer privada e não alterar diretamente o índice;
- uma denúncia isolada não remover automaticamente uma publicação;
- cada decisão de moderação registrar regra, justificativa, responsável e data;
- usuário afetado receber orientação e mecanismo de revisão;
- nenhuma rota ou interface de moderação depender apenas de ocultação visual para controlar acesso.

## 16. Questões a fechar antes da integração com o backend

1. Fornecedor e orçamento para análise de texto e imagem.
2. Limites finais de caracteres, quantidade e tamanho de anexos.
3. Prazo de retenção por tipo de dado e evento.
4. Prazo operacional para análise e contestação.
5. Política específica para imagens com pessoas e conteúdo envolvendo menores.
6. Critérios mínimos e processo de verificação de experiência real.
7. Regras de reincidência e sanções proporcionais.
8. Aprovação jurídica da política, dos termos e dos avisos de privacidade.
