import { Admin, ListGuesser, Resource } from "react-admin";
import dataProvider from "./data-provider";
import { CountryCreate, CityCreate, CityEdit } from "./resources";

function App() {
	return (
		<div className="App">
			<Admin dataProvider={dataProvider}>
				<Resource name="country" list={ListGuesser} create={CountryCreate} />;
				<Resource
					name="city"
					list={ListGuesser}
					create={CityCreate}
					edit={CityEdit}
				/>
				;
			</Admin>
		</div>
	);
}

export default App;
