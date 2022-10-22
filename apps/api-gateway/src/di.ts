import Container from "typedi";

import {
  CityRepository,
  LocationRepository,
} from "./services";



/** Containers */
export const setFunctionalServices = () => {
  Container.set("LocationRepository", LocationRepository);
  Container.set("CityRepository", CityRepository);

};
