# Padrões de desenvolvimento TypeScript — BemFalado

## Regra obrigatória: sem `any`

O uso de `any` é proibido em todo o código da aplicação, incluindo componentes, serviços, modelos, testes e templates Angular.

## Tipagem

- Ativar e preservar `strict: true` no TypeScript.
- Preservar `strictTemplates: true` no compilador Angular.
- Declarar tipos de parâmetros, retornos, propriedades, estados e contratos de dados.
- Usar `interface` para contratos de objetos e `type` para uniões, aliases e tipos derivados.
- Usar `unknown` para dados externos ainda não validados; fazer narrowing antes do uso.
- Não contornar a tipagem com `$any()`, coerções inseguras ou asserções sem justificativa.
- Preferir imports do tipo `import type` quando o símbolo existir apenas em tempo de compilação.

## Angular

- Preferir componentes standalone.
- Preferir a API moderna de sinais para estado local e comunicação entre componentes (`signal`, `input`, `output`).
- Usar `ChangeDetectionStrategy.OnPush` nos componentes.
- Manter componentes pequenos, com responsabilidade única.
- Tipar eventos como `Event` e validar o alvo com `instanceof` antes de acessar propriedades específicas.
- Manter regras de negócio e acesso a dados fora dos templates.

## Revisão antes de cada commit

- [ ] Nenhum `any` ou `$any()`.
- [ ] Nenhum parâmetro ou retorno implicitamente tipado.
- [ ] Templates compatíveis com `strictTemplates`.
- [ ] Tipos compartilhados em `shared/models` quando usados por mais de uma feature.
- [ ] Build Angular executado e aprovado antes de considerar a entrega validada.
