import {
  Resolver,
  Query,
  Mutation,
  Arg,
} from "type-graphql";
import { Service } from "typedi";
import { CityEntity } from "../../entities";
import { CityService } from "../../services/city-service";

@Service()
@Resolver((resolverOf) => CityEntity)
export default class CityResolver {
  constructor(private readonly cityService: CityService) {}

  @Query(() => [CityEntity])
  async getAllCities(): Promise<CityEntity[]> {
    const citiesResult = await this.cityService.findAll();

    if (citiesResult.isOk()) {
      return citiesResult.value;
    }

    throw new Error("CityResolver.getAllCities");
  }

  @Query(() => CityEntity)
  async getOneCity(@Arg("id") id: string): Promise<CityEntity> {
    const citiesResult = await this.cityService.findOne(id);

    if (citiesResult.isOk()) {
      return citiesResult.value;
    }

    throw new Error("CityResolver.getOneCity");
  }


  @Mutation(() => String)
  async deleteCity(@Arg("id") id: string): Promise<string> {
    const deleteResult = await this.cityService.delete(id);

    if (deleteResult.isOk()) {
      return deleteResult.value;
    }

    throw new Error("CityResolver.deleteCity");
  }

  @Mutation(() => CityEntity)
  async createCity(
    @Arg("name") name: string,
  ) {
    const createResult = await this.cityService.create(name);

    if (createResult.isOk()) {
      return createResult.value;
    }

    throw new Error("CityResolver.create");
  }

  @Mutation(() => CityEntity)
  async updateCity(
    @Arg("id") id: string,
    @Arg("name") name: string,
  ) {
    const updateResult = await this.cityService.update(id, name);

    if (updateResult.isOk()) {
      return updateResult.value;
    }

    throw new Error("CityResolver.update");
  }
}
