export const deleteUserById = {
  handler: "src/handlers/deleteUserById.handler",
  events: [
    {
      http: {
        method: "delete",
        path: "users/{id}",
        cors: true,
      },
    },
  ],
};

export const deleteUsers = {
  handler: "src/handlers/deleteUsers.handler",
  events: [
    {
      http: {
        method: "delete",
        path: "users",
        cors: true,
      },
    },
    {
      schedule: {
        name: "users-obfuscation-scheduler",
        enabled: true,
        rate: ["cron(* * * * * 60)"],
      },
    },
  ],
};
