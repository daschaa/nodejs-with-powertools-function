# NodejsWithPowertoolsFunction - CDK Construct

A simple wrapper for the `NodejsFunction` construct that enables the Powertools Layer.

## Getting Started

The construct aims to be a drop-in replacement to the `NodejsFunction`. The only thing that has to be adjusted is, that 
the function calls to the `NodejsFunction` has to be on the property `fn` from the `NodejsWithPowertoolsFunction`.

```typescript
import { NodejsWithPowertoolsFunction } from 'nodejs-with-powertools-function';

class MyStack extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const myFunction = new NodejsWithPowertoolsFunction(this, 'PowertoolsFunction', {
      entry: __dirname + '/my-lambda-function.ts',
      powertoolsVersion: '10',
      powertoolsEnvironmentVariables: {
        POWERTOOLS_SERVICE_NAME: 'my-cool-service'
      }
    });
    
    myFunction.fn.addToRolePolicy(
      new PolicyStatement({
      actions: ['kms:*'],
      resources: ['*'],
      effect: Effect.ALLOW,
    }));
  }
}
```

### Prerequisites

To use this construct, the AWS CDK has to be installed.

```bash
npm i aws-cdk-lib
```

### Installing

To install the construct, just install it with your favorite package manager from the npm registry:

```bash
npm i nodejs-with-powertools-function 
```

## Built With

* [projen](https://projen.io/) - The project generation tool

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details
