import type { AWS } from "@serverless/typescript";
import { deleteUserById, deleteUsers } from "@functions/users";
import {
  ACCESS_KEY_ID_LOCAL,
  AWS_REGION,
  PORT,
  QUEUE_API_VERSION_LOCAL,
  QUEUE_ENDPOINT_LOCAL,
  QUEUE_NAME,
  SECRET_ACCESS_KEY_LOCAL,
} from "./src/config";

const serverlessConfiguration: AWS = {
  service: "users-service",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-offline-sqs-external",
    "serverless-offline",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "eu-central-1",
    stage: "dev",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      SQS_QUEUE_URL: { Ref: "UsersQueue" },
    },
  },
  functions: { deleteUserById, deleteUsers },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    "serverless-offline": {
      httpPort: PORT,
    },
    "serverless-offline-sqs-external": {
      autoCreate: true,
      apiVersion: QUEUE_API_VERSION_LOCAL,
      endpoint: QUEUE_ENDPOINT_LOCAL,
      region: AWS_REGION,
      accessKeyId: ACCESS_KEY_ID_LOCAL,
      secretAccessKey: SECRET_ACCESS_KEY_LOCAL,
      skipCacheInvalidation: false,
    },
  },
  resources: {
    Resources: {
      UsersQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: QUEUE_NAME,
          VisibilityTimeout: 60,
          MessageRetentionPeriod: 345600,
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
