const fs = require("node:fs/promises");
const readline = require("node:readline");

const { Password, Select, Snippet } = require("enquirer");
const chalk = require("chalk");
const PackageJson = require("@npmcli/package-json");
const shell = require("shelljs");
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
  template: `{
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

async function setGithubAccessToken() {
  const prompt = new Password({ message: "GitHub PAT token" });
  const token = await prompt.run();
  if (!token) return;
  const registry = "@harvard-lxp:registry=https://npm.pkg.github.com/";
  const creds = `//npm.pkg.github.com/:_authToken=${token}`;
  return fs.writeFile("./.npmrc", `${registry}\n${creds}`);
}

async function updatePackageJson(data, path = "./") {
  try {
    const pkgJson = await PackageJson.load(path);
    pkgJson.update(data);
    await pkgJson.save();
  } catch (err) {
    exitOnError("Error updating package.json: " + err.message);
  }
}

async function resolveTemplateBranch() {
  const prompt = new Select({
    name: "template",
    message: "Select a template",
    choices: ["default", "hlxp (requires credentials)"],
  });
  const input = await prompt.run();
  return input === "default" ? "main" : "hlxp";
}

async function getPackageName() {
  const name = await prompt(chalk.cyan("Enter project name: "));
  if (!validatePackageName(name).validForNewPackages) {
    shell.echo(
      formatErrorLog("The provided name must be a valid NPM package name.")
    );
    return getPackageName();
  }
  return name;
}

module.exports = {
  SUCCESS_CODE,
  setupSnippet,
  formatSuccessLog,
  formatErrorLog,
  setGithubAccessToken,
  resolveTemplateBranch,
  exitOnError,
  updatePackageJson,
  getPackageJson,
  getPackageName,
};
