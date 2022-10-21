import { Field, ID, ObjectType } from "type-graphql";
import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class LocationEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Field()
	@Column()
	countryName: string;

	@Field(() => [CityEntity])
	@OneToMany(() => CityEntity, city => city.location, {
		cascade: true,
	})
	cities: CityEntity[];
}

@Entity()
@ObjectType()
export class CityEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Field()
	@Column()
	name: string;

	@Field(() => LocationEntity)
	@ManyToOne(() => LocationEntity, location => location.cities, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	location: LocationEntity;
}
