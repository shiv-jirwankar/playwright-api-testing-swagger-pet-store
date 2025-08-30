import { expect } from "playwright/test";
import { BaseController } from "../controllers/base.controller";
import { join } from "path";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { execSync } from "child_process";

const swaggerSchemaFolder = join(process.cwd(), ".schema");

class SwaggerController extends BaseController {
  async downloadSwagger(): Promise<string> {
    const response = await this.get(
      "https://petstore3.swagger.io/api/v3/openapi.json",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    expect(response.status, "Failed to fetch Swagger JSON").toBe(200);

    const swaggerJSONPath = join(swaggerSchemaFolder, "swagger.json");

    writeFileSync(
      swaggerJSONPath,
      JSON.stringify(response.body, null, 2),
      "utf-8"
    );

    console.log(`✅✅✅ Saved Swagger JSON to path: ${swaggerJSONPath}`);

    return swaggerJSONPath;
  }
}

export async function setupSwagger() {
  if (!existsSync(swaggerSchemaFolder)) {
    mkdirSync(swaggerSchemaFolder, { recursive: true });
  }
  const swaggerController = new SwaggerController();

  try {
    const swaggerJSONPath = await swaggerController.downloadSwagger();
    const swaggerTypesPath = join(swaggerSchemaFolder, "swagger-types.d.ts");
    console.log(
      "🏗️ Generating types for Pet Store APIs from the Swagger Schema"
    );
    execSync(
      `npx openapi-typescript "${swaggerJSONPath}" --output "${swaggerTypesPath}"`,
      { stdio: "inherit" }
    );
    console.log(
      `✅ Swagger Types generated successfully in the path: '${swaggerTypesPath}'`
    );
  } catch (error) {
    throw new Error(
      `Failed to process swagger generation of Pet Store - ${error}`
    );
  }
}
