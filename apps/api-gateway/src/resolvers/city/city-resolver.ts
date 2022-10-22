import { Context, UserInputError } from "apollo-server-core";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  FieldResolver,
  Root,
} from "type-graphql";
import { Service } from "typedi";
import { CityEntity } from "../../entities";
import { CityService } from "../../services";
import { falsyToInvalidId, whereIdIs } from "../../shared/utils";

@Service()
@Resolver((resolverOf) => CityEntity)
export default class CityResolver {
  constructor(private readonly cityService: CityService) {}

  @Query(() => [CityEntity])
  async getAllCities(): Promise<CityEntity[]> {
    const cityResult = await this.cityService.findAll();

    if (cityResult.isOk()) {
      return cityResult.value;
    }

    throw new Error("CityResolver.getAllCities");
  }

  @Mutation(() => String)
  async deleteCity(@Arg("id") id: string): Promise<string> {
    const deleteResult = await this.cityService.delete(id);

    if (deleteResult.isOk()) {
      return deleteResult.value;
    }

    throw new Error("CityResolver.deleteLocation");
  }


  @Mutation(() => CityEntity)
  async createCity(
    @Arg("name") name: string,
    @Arg("location") location: string,
  ) {
    const createResult = await this.cityService.create(name, {
      cities: [],
      id: '5c4dbce0-1ea4-42f2-bbe5-dc79c43a45f1',
      countryName: 'London'
    });

    if (createResult.isOk()) {
      return createResult.value;
    }

    throw new Error("CityResolver.create");
  }


}
