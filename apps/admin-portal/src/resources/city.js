import {
    Admin,
    Create,
    SimpleForm,
    TextInput,
    ListGuesser,
    Resource,
    required,
} from "react-admin";
import { url } from "../constants";
import { request, gql } from "graphql-request";


export const cityMappings = {
    delete: async (params) => {
        const { id } = params;

        const query = gql`
      mutation DeleteCity($deleteCityId: String!, $cityLocation: String!) {
        deleteCity(id: $deleteCityId, location: $cityLocation) 
      }
    `;

        const result = await request(url, query, {
            cityLocationId: id,
        });

        return { data: result.deleteCity };
    },

    create: async (params) => {
        const {
            data: { name, location },
        } = params;

        const query = gql`
      mutation CreateCity($name: String!, $location: String!) {
        createCity(name: $name, location: $location) {
          id
          name
          location
        }
      }
    `;

        const result = await request(url, query, {
            name,
            location
        });
        return { data: result.createCity };
    },
    getList: async (params) => {
        const cities = await request(
            url,
            gql`
        query GetAllCities {
          getAllCities {
          id
          name
          }
        }
      `
        );

        return {
            data: cities.getAllCities,
            total: cities.getAllCities.length,
        };
    },
};


export const CityCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" validate={[required()]} fullWidth />
            <TextInput source="location" validate={[required()]} fullWidth />
        </SimpleForm>
    </Create>
);
