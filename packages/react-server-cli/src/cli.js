// FIXME: Get the config path from the CLI args
var fs = require('fs');
var path = require('path');
var babelrc = fs.readFileSync(path.resolve(__dirname, '../../@kununu/react-universal-scripts/.babelrc'));
var config;

try {
  config = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your babelrc');
  console.error(err);
}

require("babel-core/register")(config);

const cli = require(".");
cli.parseCliArgs().then(cli.run).catch(console.error);
