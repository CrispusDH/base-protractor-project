module.exports = {
  name: 'custom parser',

  parse(output) {
    let match = null;
    const failedSpecs = new Set();
    const testsOutput = output.split('------------------------------------');
    const failedTestRegex = /(\sFailed|\sFAILED)/g;
    const erroredTestRegex = /(Runner process exited unexpectedly with error)/g;
    const specFileRegex = /.+Specs:\s(.*\.js)/g;
    testsOutput.forEach((test) => {
      let specfile;
      let result = 'passed';

      // tslint:disable-next-line
      while (match = specFileRegex.exec(test)) {
        specfile = match[1];
      }

      while (erroredTestRegex.exec(test)) {
        result = 'error';
      }

      while (failedTestRegex.exec(test)) {
        result = 'failed';
      }

      if (specfile && (result === 'failed' || result === 'error')) {
        if (!/node_modules/.test(specfile)) {
          failedSpecs.add(specfile);
        }
      }
    });

    return [...failedSpecs];
  }
};
