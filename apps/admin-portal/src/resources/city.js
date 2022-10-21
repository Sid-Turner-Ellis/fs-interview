import {
	Admin,
	Create,
	Edit,
	SimpleForm,
	TextInput,
	ListGuesser,
	Resource,
	required,
} from "react-admin";
import { url } from "../constants";
import { request, gql } from "graphql-request";

export const cityMappings = {
	delete: async params => {
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
	getList: async params => {
		const cities = await request(
			url,
			gql`
				query GetAllCities {
					getAllCities {
						name
						id
					}
				}
			`
		);

		return {
			data: cities.getAllCities,
			total: cities.getAllCities.length,
		};
	},
	create: async params => {
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
	update: async params => {
		const {
			data: { id, name },
		} = params;

		const query = gql`
			mutation UpdateCity($id: String!, $name: String!) {
				updateCity(cityId: $id, cityNewName: $name) {
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
	getCity: async params => {
		const { id } = params;

		const query = gql`
			query GetCity($id: String!) {
				getCity(id: $id) {
					id
				}
			}
		`;

		const result = await request(url, query, {
			id,
		});
		return { data: result.getCity };
	},
};

export const CityCreate = () => (
	<Create>
		<SimpleForm>
			<TextInput source="name" validate={[required()]} fullWidth />
		</SimpleForm>
	</Create>
);

export const CityEdit = () => (
	<Edit title="Edit city">
		<SimpleForm>
			<TextInput source="name" validate={[required()]} fullWidth />
		</SimpleForm>
	</Edit>
);
