import Ajv, { JSONSchemaType, Schema, ValidateFunction } from "ajv";
import { expect } from "playwright/test";

export function validateSchema(
  schema: Schema | JSONSchemaType<unknown>,
  body: unknown
): void {
  const ajv = new Ajv({
    strict: false,
    allErrors: true,
    verbose: true,
    formats: {
      double: "[+-]?\\d*\\.?\\d+",
      int32: /^\d+$/,
      int64: /^\d+$/,
    },
  });

  const validate: ValidateFunction<unknown> = ajv.compile(schema);
  const isSchemaValid = validate(body);

  expect
    .soft(
      isSchemaValid,
      `Validating response body against provided schema ${JSON.stringify(
        { validationErrors: validate.errors },
        null,
        2
      )}`
    )
    .toBeTruthy();
}
