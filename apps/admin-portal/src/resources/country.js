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

/**
 * Mappings
 */
export const countryMappings = {
	delete: async params => {
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

	create: async params => {
		const {
			data: { countryName },
		} = params;

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
			cities: [],
			countryName,
		});
		return { data: result.createLocation };
	},
	getList: async params => {
		const countries = await request(
			url,
			gql`
				query GetAllLocations {
					getAllLocations {
						countryName
						id
					}
				}
			`
		);

		return {
			data: countries.getAllLocations,
			total: countries.getAllLocations.length,
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
		</SimpleForm>
	</Create>
);
