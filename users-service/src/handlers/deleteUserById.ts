import { APIGatewayProxyEvent } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { EventType, UserEvent } from "@models/User";
import { middyfy } from "@libs/lambda";
import { QUEUE_URL } from "../config";

const AWS = require("aws-sdk");

const deleteUserById = async function (event: APIGatewayProxyEvent) {
  const id = event.pathParameters.id;
  const sqs = new AWS.SQS();

  try {
    const userEvent: UserEvent = {
      eventType: EventType.USER_OBFUSCATION,
      data: id,
    };
    console.log("Sending message to the queue: ", userEvent);
    await sqs
      .sendMessage({
        QueueUrl: QUEUE_URL,
        MessageBody: JSON.stringify(userEvent),
      })
      .promise();
    return formatJSONResponse(200, userEvent);
  } catch (error) {
    return formatJSONResponse(500, error);
  }
};

export const handler = middyfy(deleteUserById);
