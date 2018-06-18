import { SpecReporter } from 'jasmine-spec-reporter';
import { browser, Config } from 'protractor';
import * as DescribeFailureReporter from 'protractor-stop-describe-on-failure';

// tslint:disable object-literal-sort-keys
export let config: Config = {
  directConnect: true,
  framework: 'jasmine2',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 60 * 1000,
    showColors: true
  },
  capabilities: {
    browserName: 'chrome',
    shardTestFiles: true,
    maxInstances: 1
  },
  onPrepare: async () => {
    await browser.waitForAngularEnabled(false );

    jasmine.getEnv().addReporter(DescribeFailureReporter(jasmine.getEnv() ) );
    jasmine.getEnv().addReporter(new SpecReporter() );
  },

  SELENIUM_PROMISE_MANAGER: false,
  specs: [
    '../test/*.js'
  ]
};
