import { globSync } from 'glob';
import YAML from 'yaml';
import { readFileSync, writeFileSync } from 'fs';
import merge from 'deepmerge';

let seed = {};

for (const file of globSync('src/**/*.yml')) {
  const content = readFileSync(file).toString();
  const data = YAML.parse(content);
  seed = merge(seed, data);
}

writeFileSync('syntaxes/saturnus.tmLanguage.json', JSON.stringify(seed, null, 2));
