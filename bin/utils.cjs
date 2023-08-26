const readline = require("node:readline");

const chalk = require("chalk");
const PackageJson = require("@npmcli/package-json");
const shell = require("shelljs");
const { Snippet } = require("enquirer");
const validatePackageName = require("validate-npm-package-name");

const SUCCESS_CODE = 0;
const ERROR_CODE = 1;

function formatSuccessLog(title) {
  return chalk.cyan(title);
}

function formatErrorLog(errorMessage) {
  return chalk.red(errorMessage);
}

function exitOnError(errorMessage) {
  shell.echo(formatErrorLog(errorMessage));
  shell.exit(ERROR_CODE);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

const setupSnippet = new Snippet({
  name: "package.json",
  message: "Fill out the fields in package.json",
  required: true,
  template:
  `{
    "description": "\${description}",
    "version": "\${version:0.0.1}",
    "author": "\${author_name} <\${author_email}> (https://github.com/\${username})"
  }`,
});

async function getPackageJson() {
  try {
    const pkgJson = await PackageJson.load("./");
    return pkgJson.content;
  } catch {
    exitOnError("Error loading package.json");
  }
}

async function updatePackageJson(data) {
  try {
    const pkgJson = await PackageJson.load("./");
    pkgJson.update(data);
    await pkgJson.save();
  } catch {
    exitOnError("Error updating package.json");
  }
}

async function getPackageName() {
  const name = await prompt(chalk.cyan("Enter project name: "));
  if (!validatePackageName(name).validForNewPackages) {
    shell.echo(formatErrorLog("The provided name must be a valid NPM package name."));
    return getPackageName();
  }
  return name;
}

module.exports = {
  SUCCESS_CODE,
  setupSnippet,
  formatSuccessLog,
  formatErrorLog,
  exitOnError,
  updatePackageJson,
  getPackageJson,
  getPackageName
}
