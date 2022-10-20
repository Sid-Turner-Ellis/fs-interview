import { errAsync, okAsync, ResultAsync } from "neverthrow";
import { CityEntity } from "../entities";

import { Service, Inject } from "typedi";
import { dataSource } from "../data-source";
import { whereIdIs } from "../shared/utils";

export const CityRepository = dataSource.getRepository(CityEntity).extend({});

@Service()
export class CityService {
  constructor(
    @Inject("CityRepository")
    private cityRepository: typeof CityRepository,
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
    name: string,
  ): Promise<ResultAsync<CityEntity, null>> {
    const existingCity = await this.cityRepository.findOne({
      where: { name },
    });

    try {
      const city = existingCity
        ? existingCity
        : new CityEntity();
      city.name = name;

      const saved = await this.cityRepository.save(city);
      const refreshed = await this._findById(saved.id);
      return okAsync(refreshed);
    } catch (error) {
      console.log("CityService.create", error);
      return errAsync(null);
    }
  }

  public async update(
    id: string,
    name: string,
  ): Promise<ResultAsync<CityEntity, null>> {
    const city = await this.cityRepository.findOneBy({ id })
    try {
      city.name = name;

      const saved = await this.cityRepository.save(city);
      const refreshed = await this._findById(saved.id);
      return okAsync(refreshed);
    } catch (error) {
      console.log("CityService.update", error);
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

  public async findOne(id: string): Promise<ResultAsync<CityEntity, null>> {
    try {
      const city = await this._findById(id);
      return okAsync(city);
    } catch (error) {
      console.log("CityService.findOne", error);
      return errAsync(null);
    }
  }
}
