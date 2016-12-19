var fs = require('fs');
var path = require('path');
var configPath = process.env.RULES_CONFIG_PATH; //eslint-disable-line no-process-env

if (!configPath) {
	require("babel-core/register");
} else {
	var babelrc = fs.readFileSync(path.resolve(__dirname, '../../@kununu/react-universal-scripts/.babelrc'));
	var config;

	try {
	  config = JSON.parse(babelrc);
	} catch (err) {
	  console.error('==>     ERROR: Error parsing your babelrc');
	  console.error(err);
	}

	require("babel-core/register")(config);
}

const cli = require(".");
cli.parseCliArgs().then(cli.run).catch(console.error);
