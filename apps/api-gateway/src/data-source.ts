import { DataSource, DataSourceOptions } from "typeorm";

const datasourceoptions: DataSourceOptions = {
	type: "sqlite",
	database: "./db/test.sql",
	synchronize: true,
	logging: true,
	entities: ["./src/entities/*.ts"],
	subscribers: [],
	migrations: [],
};

export const dataSource = new DataSource(datasourceoptions);
