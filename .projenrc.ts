import { typescript } from 'projen';
import { NpmAccess } from 'projen/lib/javascript';
import { DependabotScheduleInterval } from 'projen/lib/github';

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
  dependabot: true,
  keywords: ['aws-cdk', 'construct', 'typescript', 'nodejs', 'powertools', 'esbuild'],
  description: 'Simple wrapper for NodejsFunction that enables the Powertools Layer.',
  github: true,
  githubOptions: {
    mergify: true,
  },
  dependabotOptions: {
    scheduleInterval: DependabotScheduleInterval.WEEKLY,
  },

});
project.setScript('lint', 'biome lint ./src');
project.addScripts({
  'lint:fix': 'biome check --write ./src',
});

project.synth();
