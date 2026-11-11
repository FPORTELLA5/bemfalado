import { Injectable, computed, signal } from '@angular/core';
import type {
  CreateModerationAuditEntryInput,
  ModerationAuditAction,
  ModerationAuditEntry
} from '../models/moderation-audit.model';

@Injectable({ providedIn: 'root' })
export class ModerationAuditService {
  private readonly auditRecords = signal<readonly ModerationAuditEntry[]>([]);
  readonly entries = this.auditRecords.asReadonly();
  readonly count = computed<number>(() => this.auditRecords().length);

  append(input: CreateModerationAuditEntryInput): void {
    const entry: ModerationAuditEntry = {
      ...input,
      id: `audit-${Date.now()}-${this.auditRecords().length + 1}`,
      occurredAt: new Date().toISOString()
    };

    this.auditRecords.update((current) => [entry, ...current]);
  }

  actionLabel(action: ModerationAuditAction): string {
    switch (action) {
      case 'report-received': return 'Denúncia recebida';
      case 'report-decision': return 'Decisão sobre denúncia';
      case 'appeal-submitted': return 'Contestação enviada';
      case 'appeal-decision': return 'Decisão sobre contestação';
    }
  }

  formatDate(date: string): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  }
}
