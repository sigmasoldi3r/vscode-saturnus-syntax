import YAML from 'yaml';
import JSON5 from 'json5';
import { globIterateSync } from 'glob';
import { readFileSync, writeFileSync } from 'fs'
import { join, parse } from 'path';

for (const file of globIterateSync('src/**/*.json5')) {
  const content = readFileSync(file).toString();
  const data = JSON5.parse(content);
  const out = YAML.stringify(data);
  const filePath = parse(file);
  const outPath = join(filePath.dir, filePath.name + '.yml');
  writeFileSync(outPath, out)
}
