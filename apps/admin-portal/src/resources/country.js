import {
  Admin,
  Create,
  SimpleForm,
  TextInput,
  required,
  ListButton,
  Edit,
  TopToolbar,
  ShowButton,
} from "react-admin";
import { url } from "../constants";
import { request, gql } from "graphql-request";

/**
 * Mappings
 */
export const countryMappings = {
  update: async (params) => {
    const citiesToRemove = params.previousData.cities.map((item) => item.id);
    const citiesToAdd = params.data.cities.map((item) => item.name);
    const countryName = params.data.countryName;
    const query = gql`
      mutation UpdateCity(
        $countryName: String!
        $cityNamesToAdd: [String!]!
        $cityIdsToRemove: [String!]!
        $locationId: String!
      ) {
        updateCity(
          countryName: $countryName
          cityNamesToAdd: $cityNamesToAdd
          cityIdsToRemove: $cityIdsToRemove
          locationId: $locationId
        ) {
          id
          countryName
          cities {
            name
            id
          }
        }
      }
    `;

    const result = await request(url, query, {
      countryName,
      cityNamesToAdd: citiesToAdd,
      cityIdsToRemove: citiesToRemove,
      locationId: params.id,
    });

    return { data: result.updateCity };
  },

  delete: async (params) => {
    const { id } = params;

    const query = gql`
      mutation DeleteLocation($deleteLocationId: String!) {
        deleteLocation(id: $deleteLocationId)
      }
    `;

    const result = await request(url, query, {
      deleteLocationId: id,
    });

    return { data: result.deleteLocation };
  },

  create: async (params) => {
    const {
      data: { countryName, cityName },
    } = params;
    console.log(cityName, countryName);
    console.log("city", cityName.split(","));
    const cities = cityName.split(",");
    const query = gql`
      mutation CreateLocation($cities: [String!]!, $countryName: String!) {
        createLocation(cities: $cities, countryName: $countryName) {
          id
          countryName
          cities {
            name
            id
          }
        }
      }
    `;

    const result = await request(url, query, {
      cities,
      countryName,
    });
    console.log(result);
    return { data: result.createLocation };
  },
  getList: async (params) => {
    const countries = await request(
      url,
      gql`
        query GetAllLocations {
          getAllLocations {
            countryName
            id
            cities {
              name
              id
            }
          }
        }
      `
    );
    return {
      data: countries.getAllLocations,
      total: countries.getAllLocations.length,
    };
  },
  getOne: async (params) => {
    const { id } = params;
    const query = gql`
      query Query($getLocationId: String!) {
        getLocation(id: $getLocationId) {
          id
          countryName
          cities {
            name
            id
          }
        }
      }
    `;
    const data = await request(url, query, {
      getLocationId: id,
    });
    return {
      data: data.getLocation,
    };
  },
};

/**
 * Create
 */

export const CountryCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="countryName" validate={[required()]} fullWidth />
      <TextInput source="cityName" validate={[required()]} fullWidth />
    </SimpleForm>
  </Create>
);
