import { NodejsWithPowertoolsFunction } from '../src/nodejs-with-powertools-function';
import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

test('render initial function', () => {
  const stack = new Stack();
  new NodejsWithPowertoolsFunction(stack, 'TestFunction', {
    entry: __dirname + '/test-function.ts',
  });
  expect(Template.fromStack(stack).toJSON()).toMatchSnapshot();
});
