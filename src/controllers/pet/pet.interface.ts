// Ensure the swagger-types file exists at the correct path or update the import path accordingly
import { paths } from "../../../.schema/swagger-types";

export type PostPetBody =
  paths["/pet"]["post"]["requestBody"]["content"]["application/json"];

export type PostPetResponse =
  paths["/pet"]["post"]["responses"]["200"]["content"]["application/json"];

export type GetPetByStatusParam =
  paths["/pet/findByStatus"]["get"]["parameters"]["query"];

export type GetPetByStatusResponse =
  paths["/pet/findByStatus"]["get"]["responses"]["200"]["content"]["application/json"];

export type GetPetByTags =
  paths["/pet/findByTags"]["get"]["parameters"]["query"];

export type UpdatePetWithFormDataParam =
  paths["/pet/{petId}"]["post"]["parameters"]["query"];

export type DeletePetHeader =
  paths["/pet/{petId}"]["delete"]["parameters"]["header"];
