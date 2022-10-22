import { Admin, ListGuesser, Resource } from "react-admin";
import dataProvider from "./data-provider";
import { CountryCreate } from "./resources/country";
import { CityCreate } from "./resources/city";

function App() {
  return (
    <div className="App">
      <Admin dataProvider={dataProvider}>
        <Resource name="country" list={ListGuesser} create={CountryCreate} />;
        <Resource name="city" list={ListGuesser} create={CityCreate} />;
      </Admin>
    </div>
  );
}

export default App;
