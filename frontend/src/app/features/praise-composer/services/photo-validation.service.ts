import { Injectable } from '@angular/core';
import type { PhotoValidationResult } from '../models/photo-validation.model';

const MAX_PHOTO_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_IMAGE_DIMENSION = 8000;
const MAX_IMAGE_PIXELS = 40_000_000;

const ALLOWED_IMAGE_TYPES: readonly string[] = [
  'image/jpeg',
  'image/png',
  'image/webp'
];

function hasMatchingSignature(bytes: Uint8Array, mimeType: string): boolean {
  if (mimeType === 'image/jpeg') {
    return bytes.length >= 3
      && bytes[0] === 0xff
      && bytes[1] === 0xd8
      && bytes[2] === 0xff;
  }

  if (mimeType === 'image/png') {
    const pngSignature: readonly number[] = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    return pngSignature.every((byte: number, index: number) => bytes[index] === byte);
  }

  if (mimeType === 'image/webp') {
    return bytes.length >= 12
      && bytes[0] === 0x52
      && bytes[1] === 0x49
      && bytes[2] === 0x46
      && bytes[3] === 0x46
      && bytes[8] === 0x57
      && bytes[9] === 0x45
      && bytes[10] === 0x42
      && bytes[11] === 0x50;
  }

  return false;
}

@Injectable({ providedIn: 'root' })
export class PhotoValidationService {
  async validate(file: File): Promise<PhotoValidationResult> {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return {
        valid: false,
        code: 'unsupported-format',
        message: 'Formato não permitido. Escolha uma imagem JPG, PNG ou WebP.'
      };
    }

    if (file.size === 0 || file.size > MAX_PHOTO_SIZE_BYTES) {
      return {
        valid: false,
        code: 'file-too-large',
        message: 'A imagem está vazia ou ultrapassa o limite de 5 MB.'
      };
    }

    try {
      const header = new Uint8Array(await file.slice(0, 12).arrayBuffer());
      if (!hasMatchingSignature(header, file.type)) {
        return {
          valid: false,
          code: 'invalid-signature',
          message: 'O conteúdo do arquivo não corresponde ao formato informado. Escolha outra imagem.'
        };
      }

      const bitmap = await createImageBitmap(file);
      try {
        const exceedsDimensionLimit = bitmap.width > MAX_IMAGE_DIMENSION
          || bitmap.height > MAX_IMAGE_DIMENSION
          || bitmap.width * bitmap.height > MAX_IMAGE_PIXELS;

        if (bitmap.width === 0 || bitmap.height === 0 || exceedsDimensionLimit) {
          return {
            valid: false,
            code: 'excessive-dimensions',
            message: 'A imagem possui dimensões inválidas ou muito grandes. Escolha uma imagem menor.'
          };
        }
      } finally {
        bitmap.close();
      }
    } catch {
      return {
        valid: false,
        code: 'invalid-image',
        message: 'Não foi possível abrir esta imagem. O arquivo pode estar corrompido.'
      };
    }

    return { valid: true };
  }
}
