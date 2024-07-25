import { NodejsWithPowertoolsFunction } from '../src/nodejs-with-powertools-function';
import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

test('render initial function', () => {
  const stack = new Stack();
  new NodejsWithPowertoolsFunction(stack, 'TestFunction', {
    entry: __dirname + '/test-function.ts',
    powertoolsEnvironmentVariables: {
      POWERTOOLS_SERVICE_NAME: 'my-cool-service'
    }
  });
  expect(Template.fromStack(stack).toJSON()).toMatchSnapshot();
});
