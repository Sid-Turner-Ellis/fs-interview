import { errAsync, okAsync, ResultAsync } from "neverthrow";
import { LocationEntity, CityEntity } from "../entities";

import { Service, Inject } from "typedi";
import { dataSource } from "../data-source";
import { falsyToInvalidId, whereIdIs } from "../shared/utils";
import {CityRepository} from "./location-service";



// const CityRepository = dataSource.getRepository(CityEntity).extend({});

@Service()
export class CityService {
  constructor(
    @Inject("CityRepository")
    private cityRepository: typeof CityRepository
  ) {}


  private async _findById(id: string): Promise<CityEntity> {
    const city = await this.cityRepository.findOne({
      ...whereIdIs(id),
    });

    if (!city) {
      throw new Error("Location not found");
    }

    return city;
  }

  public async delete(id: string): Promise<ResultAsync<string, null>> {
    try {
      const city = await this._findById(id);
      if (!city) {
        throw new Error("Location not found");
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
    location?: LocationEntity
  ): Promise<ResultAsync<CityEntity, null>> {
    const existingLocation = await this.cityRepository.findOne({
      where: { name },
    });

    try {
      const city = existingLocation
        ? existingLocation
        : new CityEntity();
      city.name = name;
      city.location = new LocationEntity();


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
    {
      cityIdsToRemove = [],
      cityNamesToAdd = [],
    }: {
      cityNamesToAdd?: string[];
      cityIdsToRemove?: string[];
    }
  ): Promise<ResultAsync<CityEntity, null>> {
    try {
      const city = await this._findById(id);
      if (!city) {
        throw new Error("Location not found");
      }


      const saved = await this.cityRepository.save(city);
      const refreshed = await this._findById(saved.id);
      return okAsync(refreshed);
    } catch (e) {
      console.log("CityService.update", e);
      return errAsync(null);
    }
  }

  public async findAll(): Promise<ResultAsync<CityEntity[], null>> {
    try {
      const city = await this.cityRepository.find({
      });
      return okAsync(city);
    } catch (error) {
      console.log("LocationService.findAll", error);
      return errAsync(null);
    }
  }
}
