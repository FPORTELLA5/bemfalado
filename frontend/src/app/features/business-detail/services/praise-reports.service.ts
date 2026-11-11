import { Injectable, inject, signal } from '@angular/core';
import type { CreatePraiseReportInput, PraiseReport } from '../models/praise-report.model';
import { ModerationQueueService } from '../../moderation/services/moderation-queue.service';

@Injectable({ providedIn: 'root' })
export class PraiseReportsService {
  private readonly moderationQueue = inject(ModerationQueueService);
  private readonly reportRecords = signal<readonly PraiseReport[]>([]);
  readonly reports = this.reportRecords.asReadonly();

  submit(input: CreatePraiseReportInput): PraiseReport {
    const report: PraiseReport = {
      id: `demo-report-${this.reportRecords().length + 1}`,
      praiseId: input.praiseId,
      reason: input.reason,
      details: input.details.trim(),
      submittedAt: new Date().toISOString()
    };

    this.reportRecords.update((currentReports: readonly PraiseReport[]) => [
      ...currentReports,
      report
    ]);
    this.moderationQueue.addSubmittedReport(report);

    return report;
  }
}
