import test, { expect } from "playwright/test";
import { PetController } from "../controllers/pet/pet.controller";
import { CreatePetBodyBuilder } from "../testData/pet/builders/createPetBody.builder";

test.describe("PET API TESTS", () => {
  test("Verify creating PET endpoint", async () => {
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
  });
});
