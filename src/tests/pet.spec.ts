import test, { expect } from "playwright/test";
import { PetController } from "../controllers/pet/pet.controller";
import { CreatePetBodyBuilder } from "../testData/pet/builders/createPetBody.builder";
import createPetSchema from "../testData/pet/jsonSchema/createPet.schema.json";
import findPetByStatusSchema from "../testData/pet/jsonSchema/findPetByStatus.schema.json";
import { validateSchema } from "../utils/schemaValidator";
import { GetPetByStatusParam } from "../controllers/pet/pet.interface";

const statuses: GetPetByStatusParam["status"][] = [
  "available",
  "pending",
  "sold",
];

test.describe("PET API TESTS", () => {
  test("Verify creating PET endpoint", async () => {
    // TODO: create a page object fixture and use them here
    const petApi = new PetController();

    const body = new CreatePetBodyBuilder()
      .setID(123)
      .setName("Austin")
      .setCategory({
        id: 1,
        name: "Dogs",
      })
      .setPhotoUrl([""])
      .setTags([
        {
          id: 0,
          name: "string",
        },
      ])
      .setStatus("available")
      .build();

    const responseObj = await petApi.postPet(body);
    expect(
      responseObj.status,
      "Status code of Create Pet API should be valid"
    ).toBe(200);

    expect(
      responseObj.body,
      "Response Body of Create Pet API should be valid"
    ).toMatchObject(body);

    await test.step("Validate JSON schema", async () => {
      validateSchema(createPetSchema, body);
    });
  });

  statuses.forEach((status) => {
    test(`Verify finding pets by status - '${status}'`, async () => {
      // TODO: create a page object fixture and use them here
      const petApi = new PetController();
      console.log("status is", status);
      const responseObj = await petApi.getPetByStatus({
        status,
      });

      expect(
        responseObj.status,
        "Response Status of Find pet by status should be valid"
      ).toBe(200);

      const responseBody = responseObj.body;

      await test.step("Validate JSON schema", async () => {
        validateSchema(findPetByStatusSchema, responseBody);
      });
    });
  });
});
