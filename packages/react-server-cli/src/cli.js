var fs = require('fs');
var path = require('path');
const cli = require(".");

cli.parseCliArgs().then(args => {
  const config = args.rulesPath ? JSON.parse(fs.readFileSync(path.resolve(args.rulesPath + '/.babelrc'))) : {};
  require("babel-core/register")(Object.assign(config, { ignore: /node_modules\/(?!example-review-module)/ }));
  cli.run(args);
}).catch(console.error);
