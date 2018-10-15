// tslint:disable-next-line:no-var-requires
const protractorFlake = require('protractor-flake');
// tslint:disable-next-line:no-var-requires
const customParser = require('./custom-parser');

process.on('unhandledRejection', (err) => {
  throw err;
});

const run = () => {
  const protractorArgs = [];

  if (process.env.LOCAL) {
    protractorArgs.push('dist/config/protractor.dev.conf.js');
  }

  protractorFlake({
    color: 'magenta',
    maxAttempts: 2,
    nodeBin: 'node',
    parser: customParser,
    protractorArgs
  }, (status) => {
    process.exit(status);
  });
};

run();
