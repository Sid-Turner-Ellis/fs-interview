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
import { BaseEntity } from "typeorm";
import { dataSource } from "../../data-source";
import { CityEntity } from "../../entities";
import { CityService } from "../../services/city-services";
import { falsyToInvalidId, whereIdIs } from "../../shared/utils";

@Service()
@Resolver(resolverOf => CityEntity)
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
	async getCity(@Arg("id") id: string): Promise<CityEntity> {
		const cityFound = await this.cityService.findCity(id);

		if (cityFound.isOk()) {
			return cityFound.value;
		}

		throw new Error("CityResolver.getAllCities");
	}

	@Mutation(() => String)
	async deleteCity(@Arg("id") id: string): Promise<string> {
		const deleteResult = await this.cityService.delete(id);

		if (deleteResult.isOk()) {
			return deleteResult.value;
		}

		throw new Error("LocationResolver.deleteLocation");
	}

	@Mutation(() => CityEntity)
	async createCity(@Arg("name") name: string) {
		const createResult = await this.cityService.create(name);

		if (createResult.isOk()) {
			return createResult.value;
		}

		console.log(createResult.error);

		throw new Error("CityResolver.create: ");
	}

	@Mutation(() => CityEntity)
	async updateCity(
		@Arg("cityId") cityId: string,
		@Arg("cityNewName") cityNewName: string
	) {
		console.log("cityId: ", cityId);
		console.log("cityNewName: ", cityNewName);

		const result = await this.cityService.update(cityId, cityNewName);

		if (result.isOk()) {
			return result.value;
		}

		throw new Error("LocationResolver.createCity");
	}
}
