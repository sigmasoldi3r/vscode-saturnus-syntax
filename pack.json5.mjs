import { globSync } from 'glob';
import JSON5 from 'json5';
import { readFileSync, writeFileSync } from 'fs';
import merge from 'deepmerge';

let seed = {};

for (const file of globSync('src/**/*.json5')) {
  const content = readFileSync(file).toString();
  const data = JSON5.parse(content);
  seed = merge(seed, data);
}

writeFileSync('syntaxes/saturnus.tmLanguage.json', JSON.stringify(seed, null, 2));
