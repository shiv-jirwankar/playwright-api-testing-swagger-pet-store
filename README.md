# Playwright API Testing - Swagger Pet Store

This project showcases an API automation testing framework built to automate and validate Swagger's PetStore API: https://petstore3.swagger.io/

## Project Structure

- `src/controllers/`
  - `base.controller.ts`: Base class for API controllers, handles HTTP requests.
  - `pet/pet.controller.ts`: Controller for Pet endpoints (create, get by status, get by tags, etc.).
  - `pet/pet.interface.ts`: TypeScript types for Pet API requests and responses, generated from Swagger.

- `src/testData/`
  - `pet/builders/createPetBody.builder.ts`: Builder class for constructing request bodies for creating pets.
  - `pet/createPetBody.json`: Example request body for creating a pet.
  - `pet/jsonSchema/`: JSON schemas for validating API responses (e.g., `createPet.schema.json`, `findPetByStatus.schema.json`).

- `src/tests/`
  - `pet.spec.ts`: Playwright test suite for Pet API endpoints (create, find by status, etc.).

- `src/utils/`
  - `generateTypes.ts`: Utility for generating TypeScript types from Swagger/OpenAPI.
  - `schemaValidator.ts`: Utility for validating API responses against JSON schemas using AJV.
  - `swagger.util.ts`: Swagger/OpenAPI related utilities.

## Scripts

- `npm run lint:fix`: Runs ESLint with auto-fix to format and fix code style issues.
- (Add a script for type generation if you use `openapi-typescript`).

## How to Use

1. **Install dependencies:**  
   `npm install`

2. **(Optional) Generate types from Swagger:**  
   If you have a script, run:  
   `npm run generate-types`

3. **Run tests:**  
   `npx playwright test`

4. **Lint and auto-fix code:**  
   `npm run lint:fix`

## Testing Approach

- Uses Playwright’s test runner for API tests.
- Controllers encapsulate API logic for reusability.
- Request/response types are generated from Swagger for type safety.
- JSON schema validation ensures API responses match the contract.

---
For more details, see the code and comments in each file.
