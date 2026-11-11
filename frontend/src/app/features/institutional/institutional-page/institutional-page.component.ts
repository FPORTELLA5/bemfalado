import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';

interface InstitutionalSection {
  readonly heading: string;
  readonly paragraphs: readonly string[];
  readonly bullets?: readonly string[];
}

interface InstitutionalPageContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly introduction: string;
  readonly sections: readonly InstitutionalSection[];
  readonly notice?: string;
  readonly draftLabel?: string;
}

const INSTITUTIONAL_PAGES = {
  sobre: {
    eyebrow: 'Nossa proposta',
    title: 'Boas experiências merecem ser compartilhadas.',
    introduction: 'O BemFalado é um espaço para descobrir e valorizar experiências positivas com estabelecimentos, empresas e serviços. Queremos transformar recomendações espontâneas em informação útil para quem está escolhendo onde ir, comprar ou contratar.',
    sections: [
      { heading: 'Por que existimos', paragraphs: ['Nem toda experiência merece uma avaliação complicada. Às vezes, um atendimento atencioso, um serviço bem executado ou um cuidado que fez diferença merece ser contado.', 'O BemFalado nasce para dar visibilidade a essas histórias e facilitar descobertas a partir de experiências compartilhadas por pessoas.'] },
      { heading: 'O que nos guia', paragraphs: ['A proposta é simples: valorizar experiências positivas sem transformar reconhecimento em competição artificial.'] , bullets: ['Autenticidade: relatos devem partir de experiências reais.', 'Respeito: a comunidade deve preservar a dignidade e a privacidade das pessoas.', 'Transparência: indicadores precisam explicar sua base de cálculo.', 'Independência: pagamentos e relações comerciais não compram elogios nem alteram o reconhecimento orgânico.'] },
      { heading: 'Uma plataforma em construção', paragraphs: ['Estamos desenvolvendo o BemFalado por etapas. Durante a fase de demonstração, algumas informações e interações utilizam dados fictícios e não representam estabelecimentos ou usuários reais.'] }
    ]
  },
  'como-funciona': {
    eyebrow: 'Da descoberta ao reconhecimento',
    title: 'Encontrar boas experiências deve ser simples.',
    introduction: 'O BemFalado organiza elogios espontâneos para ajudar você a conhecer estabelecimentos, empresas e serviços a partir do que outras pessoas viveram.',
    sections: [
      { heading: '1. Descubra', paragraphs: ['Pesquise por nome, categoria ou localização e explore os perfis dos estabelecimentos.'] },
      { heading: '2. Conheça as experiências', paragraphs: ['Leia os elogios, veja quais qualidades aparecem com mais frequência e observe o volume e o período dos registros.'] },
      { heading: '3. Compartilhe', paragraphs: ['Se você viveu uma experiência positiva, encontre o estabelecimento, destaque o que foi bom e conte sua história com respeito e sinceridade.'] },
      { heading: 'Como entender o Índice de reconhecimento', paragraphs: ['O índice representa a proporção de experiências válidas registradas na plataforma que resultaram em elogios publicados. Ele deve ser apresentado junto do volume de experiências e do período considerado.', 'Esse indicador não representa uma pesquisa com todos os clientes do estabelecimento e não deve ser interpretado isoladamente.'] },
      { heading: 'O que o BemFalado não é', paragraphs: ['Não é um canal público de reclamações, uma nota de estrelas ou uma garantia de qualidade. Ausência de elogios significa apenas que não há relatos suficientes publicados na plataforma.'] }
    ]
  },
  diretrizes: {
    eyebrow: 'Comunidade',
    title: 'Compartilhe o que foi bom. Respeite quem faz parte da história.',
    introduction: 'As diretrizes ajudam a manter o BemFalado útil, confiável e seguro para quem publica, lê e aparece nos relatos.',
    sections: [
      { heading: 'Conte experiências reais', paragraphs: ['Publique apenas experiências que você realmente viveu. Seja específico sobre o que foi positivo e evite afirmações que não possa sustentar.'] },
      { heading: 'Mantenha o foco no positivo', paragraphs: ['O BemFalado é dedicado a elogios. Reclamações, ataques e acusações públicas não fazem parte da proposta. Não transforme uma experiência negativa em um elogio artificial.'] },
      { heading: 'Respeite a privacidade', paragraphs: ['Não publique telefones particulares, documentos, endereços residenciais, conversas privadas, dados financeiros ou informações sensíveis de outras pessoas. Tenha cuidado especial com imagens que mostrem pessoas, crianças ou telas com dados pessoais.'] },
      { heading: 'Use conteúdo que você pode compartilhar', paragraphs: ['Publique apenas textos e imagens que você criou ou tem autorização para utilizar. Não use o espaço para spam, publicidade não autorizada, links promocionais ou elogios combinados.'] },
      { heading: 'Como funciona a moderação', paragraphs: ['Conteúdos podem ser analisados quando houver sinais de violação. Uma denúncia não remove automaticamente uma publicação. Decisões devem ser justificadas e, quando aplicável, podem ser contestadas pelo autor.'] }
    ],
    notice: 'A política completa de publicação, conteúdo e moderação é uma especificação funcional em evolução e será submetida à revisão jurídica antes do lançamento.'
  },
  contato: {
    eyebrow: 'Fale com a equipe',
    title: 'Sua mensagem ajuda a melhorar o BemFalado.',
    introduction: 'Estamos preparando os canais oficiais de atendimento para dúvidas, solicitações relacionadas à privacidade e assuntos institucionais.',
    sections: [
      { heading: 'Antes do lançamento', paragraphs: ['Os canais oficiais de contato ainda não estão ativos nesta versão de demonstração. Não envie dados pessoais, documentos ou informações confidenciais por canais não indicados oficialmente pelo BemFalado.'] },
      { heading: 'Quando os canais estiverem disponíveis', paragraphs: ['Esta página será atualizada com os meios de contato, orientações de atendimento e informações sobre solicitações relacionadas aos dados pessoais.'] }
    ],
    notice: 'Esta página é informativa. O formulário de contato e o atendimento ainda não estão conectados.'
  },
  empresas: {
    eyebrow: 'Para estabelecimentos e empresas',
    title: 'Boas experiências também merecem ser encontradas.',
    introduction: 'O BemFalado quer aproximar pessoas de empresas e estabelecimentos por meio de experiências positivas compartilhadas pela comunidade.',
    sections: [
      { heading: 'O que sua presença pode oferecer', paragraphs: ['Um perfil organizado ajuda as pessoas a encontrar informações sobre seu negócio e conhecer os elogios publicados por consumidores.'] },
      { heading: 'Reconhecimento construído pela comunidade', paragraphs: ['Os elogios devem ser espontâneos e partir de experiências reais. Empresas não podem comprar publicações, avaliações positivas ou melhor posicionamento orgânico.'] },
      { heading: 'Próximas funcionalidades', paragraphs: ['Recursos de reivindicação e verificação de perfil, respostas a elogios e ferramentas de análise poderão ser avaliados em etapas futuras. A existência de um perfil reivindicado não será uma garantia de qualidade do negócio.'] },
      { heading: 'Como participar', paragraphs: ['A inclusão e a gestão de perfis comerciais serão disponibilizadas conforme a evolução do produto. Nesta demonstração, solicitações e interações não são enviadas para uma equipe real.'] }
    ]
  },
  privacidade: {
    eyebrow: 'Privacidade e dados pessoais',
    title: 'Transparência sobre o uso de informações.',
    introduction: 'A privacidade precisa fazer parte do produto desde o início. Esta página apresenta os princípios de tratamento de dados planejados para o BemFalado, mas ainda não é uma política final de privacidade.',
    sections: [
      { heading: 'Quais informações poderão ser tratadas', paragraphs: ['Conforme as funcionalidades forem ativadas, poderão ser tratados dados de cadastro e autenticação, conteúdo publicado, favoritos, notificações, solicitações de suporte e registros técnicos de segurança. A coleta deverá ser limitada ao necessário para cada finalidade.'] },
      { heading: 'Para que os dados serão utilizados', paragraphs: ['As finalidades poderão incluir criação e proteção de contas, publicação e exibição de elogios, funcionamento de recursos solicitados, prevenção a abuso, moderação, segurança e cumprimento de obrigações legais. Cada finalidade deverá ser explicada ao usuário antes da coleta.'] },
      { heading: 'Conteúdo público e registros privados', paragraphs: ['Elogios publicados poderão ficar visíveis publicamente. Favoritos, registros privados de experiência, denúncias e contestações deverão ter acesso restrito e não poderão ser apresentados como conteúdo público.'] },
      { heading: 'Compartilhamento e fornecedores', paragraphs: ['Compartilhamentos com fornecedores de hospedagem, comunicação, segurança ou análise somente deverão ocorrer quando necessários, com contratos e controles adequados. Não presumimos que fornecedores específicos já estejam contratados.'] },
      { heading: 'Segurança, retenção e direitos', paragraphs: ['O produto deverá adotar controles de acesso, proteção técnica, prazos de retenção e descarte definidos. Os procedimentos para confirmação, acesso, correção, eliminação e demais direitos previstos na LGPD serão detalhados antes do lançamento.'] },
      { heading: 'Demonstração atual', paragraphs: ['A versão atual utiliza dados fictícios e estados temporários no frontend. Isso não equivale a um serviço de produção nem descreve todos os tratamentos que existirão na versão final.'] }
    ],
    draftLabel: 'Rascunho — requer validação jurídica e técnica antes da publicação.'
  },
  termos: {
    eyebrow: 'Termos de uso',
    title: 'Regras claras para uma comunidade confiável.',
    introduction: 'Este conteúdo resume as condições de uso planejadas para o BemFalado. Não constitui contrato final nem deve ser aceito como termo juridicamente vigente nesta versão de demonstração.',
    sections: [
      { heading: 'Uso da plataforma', paragraphs: ['O BemFalado será destinado à descoberta de estabelecimentos e ao compartilhamento de experiências positivas reais. O usuário deverá fornecer informações corretas e manter a segurança de suas credenciais.'] },
      { heading: 'Responsabilidade pelo conteúdo', paragraphs: ['Quem publica é responsável por possuir base legítima para compartilhar o relato e os anexos. O conteúdo não poderá violar direitos de terceiros, expor dados privados, conter ameaças, discriminação, fraude ou publicidade não autorizada.'] },
      { heading: 'Moderação e contestação', paragraphs: ['O BemFalado poderá analisar denúncias e aplicar medidas proporcionais, com justificativa e possibilidade de revisão quando aplicável. Uma denúncia isolada não deverá remover automaticamente um elogio.'] },
      { heading: 'Limites da informação', paragraphs: ['Os relatos representam experiências individuais e não garantem resultados futuros. Indicadores refletem somente os registros válidos existentes na plataforma, conforme sua base e período de cálculo.'] },
      { heading: 'Relações comerciais', paragraphs: ['Recursos pagos destinados a empresas não poderão comprar elogios, remoção de conteúdo legítimo ou alteração do destaque orgânico. Funcionalidades financeiras futuras dependerão de regras e contratos próprios.'] },
      { heading: 'Disponibilidade e alterações', paragraphs: ['Funcionalidades podem evoluir durante o desenvolvimento. Os termos definitivos deverão explicar disponibilidade, suspensão, encerramento de conta, propriedade intelectual, responsabilidades, canais de contato, legislação aplicável e procedimento de atualização.'] }
    ],
    draftLabel: 'Rascunho — requer revisão jurídica, identificação da entidade responsável e definição dos canais oficiais antes do lançamento.'
  }
} satisfies Record<string, InstitutionalPageContent>;

type InstitutionalPageKey = keyof typeof INSTITUTIONAL_PAGES;

function isInstitutionalPageKey(value: string | undefined): value is InstitutionalPageKey {
  return value !== undefined && Object.prototype.hasOwnProperty.call(INSTITUTIONAL_PAGES, value);
}

@Component({
  selector: 'bf-institutional-page',
  standalone: true,
  templateUrl: './institutional-page.component.html',
  styleUrl: './institutional-page.component.scss',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstitutionalPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly routeSegments = toSignal(this.route.url.pipe(map((segments) => segments[0]?.path)), {
    initialValue: this.route.snapshot.url[0]?.path
  });

  readonly page = computed<InstitutionalPageContent>(() => {
    const slug = this.routeSegments();
    if (isInstitutionalPageKey(slug)) return INSTITUTIONAL_PAGES[slug];
    void this.router.navigateByUrl('/');
    return INSTITUTIONAL_PAGES.sobre;
  });
}
