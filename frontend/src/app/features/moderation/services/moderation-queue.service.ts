import { Injectable, computed, inject, signal } from '@angular/core';
import { ModerationAuditService } from './moderation-audit.service';
import { MOCK_BUSINESS_PRAISES } from '../../business-detail/data/mock-business-praises';
import { MOCK_BUSINESS_RESULTS } from '../../search-results/data/mock-business-results';
import { PRAISE_REPORT_REASONS } from '../../business-detail/models/praise-report.model';
import type { PraiseReport, PraiseReportReason } from '../../business-detail/models/praise-report.model';
import type {
  ModerationDecisionInput,
  ModerationPriority,
  ModerationQueueItem
} from '../models/moderation-queue.model';

const DEMO_QUEUE_ITEMS: readonly ModerationQueueItem[] = [
  {
    id: 'demo-queue-001',
    praiseId: 'praise-005',
    businessName: 'Clínica Horizonte',
    praiseAuthor: 'André F.',
    praiseTitle: 'Equipe muito atenciosa',
    praiseContent: 'Desde a recepção até o atendimento, fui tratado com atenção e respeito. As informações foram explicadas com clareza.',
    reason: 'personal-data',
    details: 'Exemplo fictício: revisar se o conteúdo ou anexo expõe informação pessoal.',
    reportedAt: '2026-11-11T09:20:00-03:00',
    priority: 'urgent',
    status: 'pending',
    decisionNote: null,
    decidedAt: null,
    decidedBy: null
  },
  {
    id: 'demo-queue-002',
    praiseId: 'praise-003',
    businessName: 'Casa Ipê Decoração',
    praiseAuthor: 'Paula S.',
    praiseTitle: 'Encontrei exatamente o que procurava',
    praiseContent: 'A loja tem bastante variedade e a equipe ajudou sem pressa. A entrega chegou dentro do prazo e os produtos vieram muito bem embalados.',
    reason: 'spam-manipulation',
    details: 'Exemplo fictício: verificar possível repetição coordenada de publicações.',
    reportedAt: '2026-11-10T15:45:00-03:00',
    priority: 'high',
    status: 'pending',
    decisionNote: null,
    decidedAt: null,
    decidedBy: null
  },
  {
    id: 'demo-queue-003',
    praiseId: 'praise-007',
    businessName: 'Ateliê Ponto de Luz',
    praiseAuthor: 'Bianca T.',
    praiseTitle: 'Uma experiência muito agradável',
    praiseContent: 'Fui recebida com bastante cuidado. O ambiente é tranquilo e o atendimento foi atencioso durante todo o serviço.',
    reason: 'misleading-information',
    details: 'Exemplo fictício: conferir se há contexto que sustente a alegação.',
    reportedAt: '2026-11-09T11:10:00-03:00',
    priority: 'normal',
    status: 'pending',
    decisionNote: null,
    decidedAt: null,
    decidedBy: null
  }
];

@Injectable({ providedIn: 'root' })
export class ModerationQueueService {
  private readonly audit = inject(ModerationAuditService);
  private readonly queueRecords = signal<readonly ModerationQueueItem[]>(DEMO_QUEUE_ITEMS);
  readonly queue = this.queueRecords.asReadonly();
  readonly pendingCount = computed<number>(() => (
    this.queueRecords().filter((item) => item.status === 'pending').length
  ));
  readonly urgentCount = computed<number>(() => (
    this.queueRecords().filter((item) => item.status === 'pending' && item.priority === 'urgent').length
  ));

  addSubmittedReport(report: PraiseReport): void {
    const praise = MOCK_BUSINESS_PRAISES.find((item) => item.id === report.praiseId);
    const business = MOCK_BUSINESS_RESULTS.find((item) => item.id === praise?.businessId);
    const reasonLabel = PRAISE_REPORT_REASONS.find((item) => item.value === report.reason)?.label;

    if (!praise) {
      return;
    }

    const queueItem: ModerationQueueItem = {
      id: report.id,
      praiseId: report.praiseId,
      businessName: business?.name ?? 'Estabelecimento demonstrativo',
      praiseAuthor: praise.authorDisplayName,
      praiseTitle: praise.title,
      praiseContent: praise.content,
      reason: report.reason,
      details: report.details || reasonLabel || 'Sem detalhes adicionais.',
      reportedAt: report.submittedAt,
      priority: this.priorityFor(report.reason),
      status: 'pending',
      decisionNote: null,
      decidedAt: null,
      decidedBy: null
    };

    this.queueRecords.update((items) => [queueItem, ...items]);
    this.audit.append({
      entityType: 'report',
      entityId: report.id,
      praiseId: report.praiseId,
      action: 'report-received',
      actorId: 'community-user-demo',
      actorLabel: 'Usuário da comunidade (demonstração)',
      previousState: null,
      newState: 'pending',
      justification: report.details || reasonLabel || 'Denúncia enviada sem detalhes adicionais.',
      summary: 'Uma denúncia privada foi recebida e adicionada à fila de moderação.'
    });
  }

  decide(input: ModerationDecisionInput): void {
    const currentItem = this.queueRecords().find((item) => item.id === input.reportId);
    const decisionNote = input.decisionNote.trim();

    if (!currentItem || currentItem.status !== 'pending' || decisionNote.length < 10) {
      return;
    }

    const decisionDate = new Date().toISOString();
    this.queueRecords.update((items) => items.map((item) => (
      item.id === input.reportId
        ? {
            ...item,
            status: input.status,
            decisionNote,
            decidedAt: decisionDate,
            decidedBy: 'Equipe de moderação (demonstração)'
          }
        : item
    )));
    this.audit.append({
      entityType: 'report',
      entityId: currentItem.id,
      praiseId: currentItem.praiseId,
      action: 'report-decision',
      actorId: 'moderator-demo',
      actorLabel: 'Equipe de moderação (demonstração)',
      previousState: currentItem.status,
      newState: input.status,
      justification: decisionNote,
      summary: `A denúncia foi analisada. Resultado: ${this.statusLabel(input.status)}.`
    });
  }

  reasonLabel(reason: PraiseReportReason): string {
    return PRAISE_REPORT_REASONS.find((item) => item.value === reason)?.label ?? 'Outro motivo';
  }

  statusLabel(status: ModerationQueueItem['status']): string {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'maintained': return 'Mantido publicado';
      case 'hidden': return 'Ocultado temporariamente';
      case 'removed': return 'Removido';
    }
  }

  priorityLabel(priority: ModerationPriority): string {
    switch (priority) {
      case 'normal': return 'Normal';
      case 'high': return 'Alta';
      case 'urgent': return 'Urgente';
    }
  }

  private priorityFor(reason: PraiseReportReason): ModerationPriority {
    if (reason === 'personal-data' || reason === 'offensive-content') {
      return 'urgent';
    }

    if (reason === 'spam-manipulation' || reason === 'third-party-rights') {
      return 'high';
    }

    return 'normal';
  }
}
