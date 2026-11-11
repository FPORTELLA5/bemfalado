import { readdir, readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const sourceDirectory = new URL('../src/', import.meta.url);
const allowedExtensions = new Set(['.ts', '.html']);
const forbiddenPattern = /\bany\b|\$any\s*\(/;
const violations = [];

async function inspectDirectory(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      await inspectDirectory(entryPath);
      continue;
    }

    if (!allowedExtensions.has(extname(entry.name))) {
      continue;
    }

    const source = await readFile(entryPath, 'utf8');
    const lines = source.split(/\r?\n/);

    lines.forEach((line, index) => {
      if (forbiddenPattern.test(line)) {
        violations.push(`${entryPath}:${index + 1}: uso de any não permitido.`);
      }
    });
  }
}

await inspectDirectory(sourceDirectory);

if (violations.length > 0) {
  process.stderr.write(`${violations.join('\n')}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write('Verificação aprovada: nenhum any ou $any() encontrado no frontend.\n');
}
