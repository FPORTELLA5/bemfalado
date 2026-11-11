import { Injectable } from '@angular/core';
import type {
  TextModerationIssue,
  TextModerationResult
} from '../models/text-moderation.model';

const BLOCKED_PHRASES: readonly string[] = [
  'nao recomendo',
  'nao volto mais',
  'foi pessimo',
  'foi horrivel',
  'atendimento horrivel',
  'atendimento pessimo',
  'fui mal atendido',
  'fui mal atendida',
  'me decepcionei',
  'experiencia horrivel',
  'experiencia pessima',
  'servico porco'
];

const ABUSIVE_TERMS: readonly string[] = [
  'idiota',
  'imbecil',
  'retardado',
  'retardada',
  'vagabundo',
  'vagabunda',
  'lixo humano'
];

const THREAT_PATTERNS: readonly RegExp[] = [
  /\bvou te matar\b/,
  /\bvou acabar com voce\b/,
  /\bquero te ver morto\b/,
  /\bquero te ver morta\b/
];

function normalizeText(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .toLocaleLowerCase('pt-BR')
    .replace(/(.)\1{2,}/g, '$1$1')
    .replace(/[^a-z0-9@.+:/\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

@Injectable({ providedIn: 'root' })
export class TextModerationService {
  validate(value: string): TextModerationResult {
    const normalized = normalizeText(value);
    const issues: TextModerationIssue[] = [];

    if (!normalized) {
      return { status: 'allowed', issues, message: '' };
    }

    if (/https?:\/\/|www\.|\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/i.test(normalized)) {
      issues.push({
        code: 'external-link',
        status: 'correction',
        message: 'Remova links e endereços de e-mail. Este campo é destinado ao relato da experiência.'
      });
    }

    if (/\b\d{3}[.\s-]?\d{3}[.\s-]?\d{3}[-.\s]?\d{2}\b/.test(normalized)) {
      issues.push({
        code: 'personal-data',
        status: 'blocked',
        message: 'O texto pode conter um CPF. Remova dados pessoais antes de continuar.'
      });
    }

    if (THREAT_PATTERNS.some((pattern: RegExp) => pattern.test(normalized))) {
      issues.push({
        code: 'threat',
        status: 'blocked',
        message: 'O texto contém uma ameaça ou expressão de violência, que não pode ser publicada.'
      });
    }

    const normalizedWords = normalized.split(' ');
    if (ABUSIVE_TERMS.some((term: string) => (
      term.includes(' ') ? normalized.includes(term) : normalizedWords.includes(term)
    ))) {
      issues.push({
        code: 'abusive-language',
        status: 'blocked',
        message: 'Remova insultos ou linguagem ofensiva para continuar.'
      });
    }

    if (BLOCKED_PHRASES.some((phrase: string) => normalized.includes(phrase))) {
      issues.push({
        code: 'negative-experience',
        status: 'blocked',
        message: 'O BemFalado publica experiências positivas. Este texto parece expressar uma avaliação negativa; não tente reformular uma experiência negativa como elogio.'
      });
    }

    const excessiveEmojiSequence = /(?:\p{Extended_Pictographic}|\p{Emoji_Presentation}){9,}/u.test(value);
    if (excessiveEmojiSequence) {
      issues.push({
        code: 'emoji-spam',
        status: 'correction',
        message: 'Há uma sequência muito longa de emojis. Mantenha apenas os que ajudam a expressar o elogio.'
      });
    }

    const excessiveRepeatedPunctuation = /([!?.,])\1{5,}/.test(value);
    if (excessiveRepeatedPunctuation) {
      issues.push({
        code: 'excessive-repetition',
        status: 'correction',
        message: 'Reduza a repetição de sinais de pontuação.'
      });
    }

    const status = issues.some((issue: TextModerationIssue) => issue.status === 'blocked')
      ? 'blocked'
      : issues.length > 0
        ? 'correction'
        : 'allowed';

    return {
      status,
      issues,
      message: issues.map((issue: TextModerationIssue) => issue.message).join(' ')
    };
  }
}
