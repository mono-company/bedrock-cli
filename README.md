# bedrock-cli

bedrock-cli is the command line interface to [Bedrock](https://bedrockapp.org/).

### How to install

    npm install -g bedrock-cli

### Usage

#### `bedrock upgrade`

This command upgrades your current Bedrock project to the latest core Bedrock code. Everything in `core/` will be replaced,
along with some other files. Your files in `content/` will not be changed.

#### `bedrock upgrade --dev`

Upgrade referencing Bedrock's `develop` branch instead of master. Warning: for advanced users only.

#### `bedrock upgrade --canary`

Upgrade referencing Bedrock's `canary` branch instead of master. For those who want to be on the cutting edge.

#### `bedrock init [base]`

Initialize a new Bedrock project. You can initialize a Bedrock project from a base where `base` can be either `material` or `bootstrap4`.

## Developing the CLI

### Test the CLI locally

Use this command (point to the right location):

    node ../bedrock-cli/src/cli.js upgrade --dev
