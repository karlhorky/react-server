var fs = require('fs');
var path = require('path');
const cli = require(".");

cli.parseCliArgs().then(args => {
  const config = args.rulesPath ? JSON.parse(fs.readFileSync(path.resolve(args.rulesPath + '/.babelrc'))) : {};
  require("babel-core/register")(config);
  cli.run(args);
}).catch(console.error);
