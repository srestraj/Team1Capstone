import path from "path";
import fs from "fs";
import { createSwaggerSpec } from "next-swagger-doc";

const spec = createSwaggerSpec({
  apiFolder: "app/api",
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Team 1 Capstone API",
      version: "1.0",
      description: "Team 1 Capstone API documentation",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:3000",
      },
    ],
  },
  apis: [
    path.join(process.cwd(), "app/api/**/*.ts"),
    path.join(process.cwd(), "app/api/**/*.tsx"),
    "!**/api/auth/**",
  ],
});

fs.writeFileSync("./public/swagger.json", JSON.stringify(spec, null, 2));