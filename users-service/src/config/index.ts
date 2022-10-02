import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  PORT,
  AWS_REGION,
  QUEUE_URL,
  QUEUE_NAME,
  QUEUE_API_VERSION_LOCAL,
  QUEUE_ENDPOINT_LOCAL,
  ACCESS_KEY_ID_LOCAL,
  SECRET_ACCESS_KEY_LOCAL,
} = process.env;
