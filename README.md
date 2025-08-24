# Playwright API Testing - Swagger Pet Store

This project demonstrates API testing for the Swagger Pet Store using Playwright and TypeScript.

## Key Libraries
- **@playwright/test**: End-to-end testing framework for browser and API automation.
- **openapi-typescript**: Generates TypeScript types from Swagger/OpenAPI schemas for type-safe API requests and responses.
- **typescript**: Type safety and modern JavaScript features.

## Approach
- **Type-Safe API Calls**: Types for request/response are generated from the Swagger schema using `openapi-typescript`.
- **Reusable Controllers**: API endpoints are organized into controller classes (e.g., `PetController`) that extend a common `BaseController` for HTTP methods.
- **Playwright Test Runner**: Tests are written using Playwright's test runner, making requests to the live Swagger Pet Store API and validating responses.
- **Automated Schema Sync**: Utility scripts download the latest Swagger schema and regenerate types to keep tests up-to-date.

## Structure
- `src/controllers/`: API controllers and interfaces
- `src/tests/`: Playwright test specs
- `src/utils/`: Swagger schema and type generation utilities

## Getting Started
1. Install dependencies: `npm install`
2. Generate types: `npm run generate-types` (if available)
3. Run tests: `npx playwright test`

---
For more details, see the code and comments in each file.
