import { Injectable, signal } from '@angular/core';
import type { CreatePraiseReportInput, PraiseReport } from '../models/praise-report.model';

@Injectable({ providedIn: 'root' })
export class PraiseReportsService {
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

    return report;
  }
}
