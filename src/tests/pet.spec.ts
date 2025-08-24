import test, { expect } from "playwright/test";
import { PetController } from "../controllers/pet/pet.controller";
import { PostPetBody } from "../controllers/pet/pet.interface";

test.describe('PET API TESTS', () => {
    test('Verify creating PET endpoint', async () => {
        const petApi = new PetController();
        const body: PostPetBody = {
            id: 123,
            name: "doggie",
            category: {
                id: 1,
                name: "Dogs"
            },
            photoUrls: [
                "string"
            ],
            tags: [
                {
                    id: 0,
                    name: "string"
                }
            ],
            status: "available"
        };
        const responseObj = await petApi.postPet(body);
        expect(responseObj.status).toBe(200);
        console.log(JSON.stringify(responseObj.body));
    });
});