import YAML from 'yaml';
import JSON5 from 'json5';
import { globIterateSync } from 'glob';
import { mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join, parse } from 'path';

for (const file of globIterateSync('old-src/**/*.json5')) {
  const content = readFileSync(file).toString();
  const data = JSON5.parse(content);
  const out = YAML.stringify(data);
  const filePath = parse(file);
  const outDir = filePath.dir.replace(/^old-/, '')
  const outPath = join(outDir, filePath.name + '.yml');
  try {
    mkdirSync(outDir, {
      recursive: true,
    })
  } catch { }
  writeFileSync(outPath, out)
}
