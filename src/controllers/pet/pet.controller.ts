import { BaseController, ParseResponse } from "../base.controller";
import {
  DeletePetHeader,
  GetPetByStatusParam,
  GetPetByStatusResponse,
  GetPetByTags,
  PostPetBody,
  PostPetResponse,
  UpdatePetWithFormDataParam,
} from "./pet.interface";

export class PetController extends BaseController {
  async postPet(data: PostPetBody): Promise<ParseResponse<PostPetResponse>> {
    return this.post("pet", {
      headers: { "Content-Type": "application/json" },
      data,
    });
  }

  async getPetByStatus(
    params: GetPetByStatusParam
  ): Promise<ParseResponse<GetPetByStatusResponse>> {
    return this.get("pet/findByStatus", { params });
  }

  async getPetByTags(params: GetPetByTags) {
    await this.get("/pet/findByTags", {
      params: { tags: params.tags.join(",") },
    });
  }

  async getPetById(id: number) {
    await this.get(`/pet/${id}`);
  }

  async updatePetData(id: number, params: UpdatePetWithFormDataParam) {
    await this.post(`/pet/${id}`, { params });
  }

  async deletePet(id: number, headers: DeletePetHeader) {
    await this.delete(`/pet/${id}`, { headers });
  }
}
