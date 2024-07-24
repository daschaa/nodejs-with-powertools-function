import { typescript } from 'projen';
import { NpmAccess } from 'projen/lib/javascript';

const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'nodejs-with-powertools-function',
  projenrcTs: true,
  eslint: false,
  gitignore: ['.idea'],
  deps: ['aws-cdk-lib'],
  devDeps: ['@biomejs/biome', 'ts-jest', 'esbuild'],
  packageName: 'nodejs-with-powertools-function',
  npmAccess: NpmAccess.PUBLIC,
  majorVersion: 1,
  authorName: 'daschaa',
  authorEmail: 'josh@joshuaw.de',
  releaseToNpm: true,
  repository: 'https://github.com/daschaa/nodejs-with-powertools-function',
});
project.tsconfigDev.removeExclude('node_modules');
project.setScript('lint', 'biome lint ./src');
project.addScripts({
  'lint:fix': 'biome check --write ./src',
});

project.synth();
