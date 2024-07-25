import { Stack } from "aws-cdk-lib";
import { LayerVersion } from "aws-cdk-lib/aws-lambda";
import {
  NodejsFunction,
  type NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

/**
 * The supported environment variables for Powertools
 */
export type PowertoolsEnvironmentVariables =
  | "POWERTOOLS_SERVICE_NAME"
  | "POWERTOOLS_METRICS_NAMESPACE"
  | "POWERTOOLS_TRACE_ENABLED"
  | "POWERTOOLS_TRACER_CAPTURE_RESPONSE"
  | "POWERTOOLS_TRACER_CAPTURE_ERROR"
  | "POWERTOOLS_TRACER_CAPTURE_HTTPS_REQUESTS"
  | "POWERTOOLS_LOGGER_LOG_EVENT"
  | "POWERTOOLS_LOGGER_SAMPLE_RATE"
  | "POWERTOOLS_DEV"
  | "POWERTOOLS_LOG_LEVEL"
  | "POWERTOOLS_PARAMETERS_MAX_AGE"
  | "POWERTOOLS_PARAMETERS_SSM_DECRYPT"
  | "POWERTOOLS_IDEMPOTENCY_DISABLED";

export type NodejsWithPowertoolsFunctionProps = {
  /**
   * Sets the environment variables that are specific for Lambda Powertools.
   *
   * @see https://docs.powertools.aws.dev/lambda/typescript/latest/#environment-variables
   */
  readonly powertoolsEnvironmentVariables?: {
    [key in PowertoolsEnvironmentVariables]?: string;
  };
  /**
   * Sets the version of the Powertools layer in the layer version ARN.
   *
   * @default 10
   */
  readonly powertoolsVersion?: string;
};

/**
 * Create a NodejsFunction that has the Lambda Powertools Layer enabled.
 */
export class NodejsWithPowertoolsFunction extends Construct {

  /**
   * The underlying NodejsFunction construct.
   */
  public readonly fn: NodejsFunction;

  constructor(
    scope: Construct,
    id: string,
    props?: NodejsFunctionProps & NodejsWithPowertoolsFunctionProps,
  ) {
    super(scope, id);
    const powertoolsLayer = LayerVersion.fromLayerVersionArn(
      this,
      "PowertoolsLayer",
      `arn:aws:lambda:${Stack.of(this).region}:094274105915:layer:AWSLambdaPowertoolsTypeScriptV2:${props?.powertoolsVersion ?? "10"}`,
    );

    this.fn = new NodejsFunction(this, "Resource", {
      ...props,
      layers: [powertoolsLayer],
      environment: {
        ...props?.environment,
        ...props?.powertoolsEnvironmentVariables,
      },
      bundling: {
        ...props?.bundling,
        externalModules: [
          ...(props?.bundling?.externalModules ?? []),
          "@aws-lambda-powertools/*",
          "@aws-sdk/*",
        ],
      },
    });
  }
}
