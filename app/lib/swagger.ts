import path from "path";
import { createSwaggerSpec } from "next-swagger-doc";

const { BASE_URL } = process.env;

export const getApiDocs = () => {
  const spec = createSwaggerSpec({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Team 1 Capstone API",
        version: "1.0",
        description: "Team 1 Capstone API documentation",
      },
      servers: [
        {
          url: BASE_URL || "http://localhost:3000",
        },
      ],
    },
    apis: [path.join(process.cwd(), "app/api/**/*.ts")],
  });

  return spec;
};