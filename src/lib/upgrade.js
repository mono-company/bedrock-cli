const exec = require('child_process').execSync;
const path = require('path');
const fs = require('fs');

const BEDROCK_REPO = {
  ssh: 'git@github.com:mono-company/bedrock.git'
};

const TMP_DIR = '.bedrock-tmp';
const BEDROCK_BASE_DIR = path.join(TMP_DIR, 'base');

module.exports = function (opts) {
  console.log('Upgrading your Bedrock install!');

  // Clone the bedrock repo to a tmp directory
  exec(`git clone ${BEDROCK_REPO.ssh} ${BEDROCK_BASE_DIR}`);
  exec(`rm -rf ${path.join(BEDROCK_BASE_DIR, '.git')}`);

  exec(`cp -r ${BEDROCK_BASE_DIR}/core .`);

  const bedrockPackageJson = JSON.parse(fs.readFileSync(path.join(BEDROCK_BASE_DIR, 'package.json'), 'utf8'));
  const projectPackageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));

  const generatedPackageJson = Object.assign({}, bedrockPackageJson, projectPackageJson);

  if (!projectPackageJson.repository) {
    delete generatedPackageJson.repository;
  }

  if (!projectPackageJson.bugs) {
    delete generatedPackageJson.bugs;
  }

  if (!projectPackageJson.homepage) {
    delete generatedPackageJson.homepage;
  }

  // Clean up tmp directory
  exec(`rm -rf ${TMP_DIR}`);

  fs.writeFileSync('./package.json', JSON.stringify(generatedPackageJson, null, 2) + '\n');
};
