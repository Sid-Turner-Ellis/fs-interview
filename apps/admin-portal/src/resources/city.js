import {
  Create,
  Edit,
  SimpleForm,
  TextInput,
  required,
} from "react-admin";
import { url } from "../constants";
import { request, gql } from "graphql-request";

/**
 * Mappings
 */
export const cityMappings = {
  delete: async (params) => {
    const { id } = params;

    const query = gql`
      mutation DeleteCity($deleteCityId: String!) {
        deleteCity(id: $deleteCityId)
      }
      `;

    const result = await request(url, query, {
      deleteCityId: id,
    });

    return { data: result.deleteCity };
  },

  create: async (params) => {
    const {
      data: { name },
    } = params;

    const query = gql`
      mutation CreateCity($name: String!) {
        createCity(name: $name) {
          id
          name
        }
      }
      `;

    const result = await request(url, query, {
      name,
    });
    return { data: result.createCity };
  },

  update: async (params) => {
    const {
      id,
      data: { name }
    } = params;
    const query = gql`
      mutation UpdateCity($id: String!, $name: String!) {
        updateCity(id: $id, name: $name) {
          id
          name
        }
      }
      `;

    const result = await request(url, query, {
      id,
      name,
    });
    return { data: result.updateCity };
  },

  getList: async (params) => {
    const query = gql`
      query GetAllCities {
        getAllCities {
          name
          id
        }
      }
    `
    const result = await request(url, query);

    return {
      data: result.getAllCities,
      total: result.getAllCities.length,
    };
  },

  getOne: async (params) => {
    const { id } = params;

    const query = gql`
      query GetOneCity($getCityId: String!) {
        getOneCity(id: $getCityId) {
          name
          id
        }
      }
      `;

    const result = await request(url, query, {
      getCityId: id,
    });

    return { data: result.getOneCity };
  }
};

/**
 * Create
 */

export const CityCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="City Name" validate={[required()]} fullWidth />
    </SimpleForm>
  </Create>
);

/**
 * Edit
 */

export const CityEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="City Name" validate={[required()]} fullWidth />
    </SimpleForm>
  </Edit>
);
