import { PostPetBody } from "../../../controllers/pet/pet.interface";

export class CreatePetBodyBuilder {
  private body: PostPetBody = {
    name: "",
    photoUrls: [],
  };

  setID(id: number): this {
    this.body.id = id;
    return this;
  }

  setName(name: string): this {
    this.body.name = name;
    return this;
  }

  setCategory(category: { id?: number; name?: string }): this {
    this.body.category = category;
    return this;
  }

  setPhotoUrl(url: string[]): this {
    this.body.photoUrls = url;
    return this;
  }

  setTags(
    tagObj: {
      id?: number;
      name?: string;
    }[]
  ): this {
    this.body.tags = tagObj;
    return this;
  }

  setStatus(status: "available" | "pending" | "sold"): this {
    this.body.status = status;
    return this;
  }

  build(): PostPetBody {
    return this.body;
  }
}
