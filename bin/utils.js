import chalk from 'chalk';
import enquirer from 'enquirer';
import PackageJson from '@npmcli/package-json';
import shell from 'shelljs';
import validatePackageName from 'validate-npm-package-name';

import readline from 'node:readline';

const { Snippet } = enquirer;

export const SUCCESS_CODE = 0;
const ERROR_CODE = 1;

export function formatSuccessLog(title) {
  return chalk.cyan(title);
}

export function formatErrorLog(errorMessage) {
  return chalk.red(errorMessage);
}

export function exitOnError(errorMessage) {
  shell.echo(formatErrorLog(errorMessage));
  shell.exit(ERROR_CODE);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

export const setupSnippet = new Snippet({
  name: 'package.json',
  message: 'Fill out the fields in package.json',
  required: true,
  template: `{
    "description": "\${description}",
    "version": "\${version:0.0.1}",
    "author": "\${author_name} <\${author_email}> (https://github.com/\${username})"
  }`,
});

export async function getPackageJson() {
  try {
    const pkgJson = await PackageJson.load('./');
    return pkgJson.content;
  } catch {
    exitOnError('Error loading package.json');
  }
}

export async function updatePackageJson(data, path = './') {
  try {
    const pkgJson = await PackageJson.load(path);
    pkgJson.update(data);
    await pkgJson.save();
  } catch (err) {
    exitOnError('Error updating package.json: ' + err.message);
  }
}

export async function getPackageName() {
  const name = await prompt(chalk.cyan('Enter project name: '));
  if (!validatePackageName(name).validForNewPackages) {
    shell.echo(
      formatErrorLog('The provided name must be a valid NPM package name.'),
    );
    return getPackageName();
  }
  return name;
}
