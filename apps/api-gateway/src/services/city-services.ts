import { errAsync, okAsync, ResultAsync } from "neverthrow";
import { LocationEntity, CityEntity } from "../entities";

import { Service, Inject } from "typedi";
import { dataSource } from "../data-source";
import { falsyToInvalidId, whereIdIs } from "../shared/utils";

export const LocationRepository = dataSource
	.getRepository(LocationEntity)
	.extend({});

export const CityRepository = dataSource.getRepository(CityEntity).extend({});

@Service()
export class CityService {
	constructor(
		@Inject("LocationRepository")
		private locationRepository: typeof LocationRepository,
		@Inject("CityRepository")
		private cityRepository: typeof CityRepository
	) {}

	private async _findById(id: string): Promise<CityEntity> {
		const city = await this.cityRepository.findOne({
			...whereIdIs(id),
		});

		if (!city) {
			throw new Error("City not found");
		}

		return city;
	}

	public async delete(id: string): Promise<ResultAsync<string, null>> {
		try {
			const city = await this._findById(id);
			if (!city) {
				throw new Error("City not found");
			}
			await this.cityRepository.remove(city);
			return okAsync(id);
		} catch (error) {
			console.log("CityService.delete", error);
			return errAsync(null);
		}
	}
	public async create(
		name: string
		// location: string
	): Promise<ResultAsync<CityEntity, null>> {
		const existingCity = await this.cityRepository.findOne({
			where: { name },
		});

		try {
			const city = existingCity ? existingCity : new CityEntity();
			city.name = name;

			const saved = await this.cityRepository.save(city);
			const refreshed = await this._findById(saved.id);
			return okAsync(refreshed);
		} catch (error) {
			console.log("LocationService.create", error);
			return errAsync(null);
		}
	}

	public async update(
		id: string,
		cityNewName: string
	): Promise<ResultAsync<CityEntity, null>> {
		try {
			const city = await this._findById(id);
			console.log("city found: ", city);

			if (!city) {
				throw new Error("Location not found");
			}

			city.name = cityNewName;

			const saved = await this.cityRepository.save(city);
			console.log("saved response: ", saved);

			const refreshed = await this._findById(saved.id);
			return okAsync(refreshed);
		} catch (e) {
			console.log("LocationService.update", e);
			return errAsync(null);
		}
	}

	public async findAll(): Promise<ResultAsync<CityEntity[], null>> {
		try {
			const cities = await this.cityRepository.find({});

			return okAsync(cities);
		} catch (error) {
			console.log("CityService.findAll", error);
			return errAsync(null);
		}
	}

	public async findCity(id: string): Promise<ResultAsync<CityEntity, null>> {
		try {
			const city = await this._findById(id);

			return okAsync(city);
		} catch (error) {
			console.log("CityService.findCity", error);
			return errAsync(null);
		}
	}
}
