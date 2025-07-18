#! /usr/bin/env node
const chalk = require('chalk');
const degit = require('degit');
const shell = require('shelljs');

const {
  setupSnippet,
  exitOnError,
  formatSuccessLog,
  updatePackageJson,
  getPackageJson,
  getPackageName,
  SUCCESS_CODE,
} = require('./utils.cjs');

function validateEnvironment() {
  ['git', 'node', 'pnpm'].forEach((prerequisite) => {
    if (!shell.which(prerequisite)) {
      exitOnError(`This script requires ${prerequisite}`);
    }
  });
}

async function cloneRepository() {
  shell.echo(formatSuccessLog('1/4 Cloning respository'));
  const name = await getPackageName();
  await degit('tailor-cms/tce-template', { mode: 'git' }).clone(name);
  shell.cd(`./${name}`);
  await updatePackageJson({ name });
}

function installDependencies() {
  shell.echo(formatSuccessLog('\n2/4 Installing dependencies'));
  const installRootDepsCommand = shell.exec('pnpm i');
  if (installRootDepsCommand.code !== SUCCESS_CODE) {
    exitOnError('Installing dependencies via pnpm failed');
  }
  const buildDepsCommand = shell.exec('pnpm build');
  if (buildDepsCommand.code !== SUCCESS_CODE) {
    exitOnError('Building dependencies via pnpm failed');
  }
}

async function runSetup() {
  shell.echo(formatSuccessLog('\n3/4 Setting up project'));
  try {
    const answer = await setupSnippet.run();
    shell.echo(answer.result);
    const packageInfo = JSON.parse(answer.result);
    await updatePackageJson(packageInfo);
    const subpackages = ['edit', 'display', 'server', 'manifest'];
    for (const packageName of subpackages) {
      await updatePackageJson(packageInfo, `./packages/${packageName}`);
    }
  } catch {
    exitOnError('Project setup failed');
  }
}

async function cleanup() {
  shell.echo(formatSuccessLog('\n4/4 Cleanup'));
  await updatePackageJson({ dependencies: {}, bin: {} });
  const deleteBinCommand = shell.exec('rm -rf bin');
  if (deleteBinCommand.code !== SUCCESS_CODE) {
    exitOnError('Cleanup failed');
  }
}

async function displayInstructions() {
  const packageName = (await getPackageJson()).name;
  shell.echo(chalk.green('Done!\n'));
  shell.echo('Your next steps are:');
  shell.echo(chalk.blue(`📂 cd ${packageName}`));
  shell.echo(`🚀 Start development server with ${chalk.blue('pnpm dev')}`);
}

const SCRIPT_STEPS = [
  validateEnvironment,
  cloneRepository,
  installDependencies,
  runSetup,
  cleanup,
  displayInstructions,
];

async function executeScript() {
  for (const step of SCRIPT_STEPS) {
    await step();
  }

  shell.exit(SUCCESS_CODE);
}

executeScript();
