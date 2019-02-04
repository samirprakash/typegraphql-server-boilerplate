/* 
User entity maps to User table in the underlying Postgres DB.

This is a TypeORM entity which would be unmarshalled to generate a DB table with
with the column names mapping to the field names provided here.

TypeORM definition for an entity maps directly to 
how one would go about definfing the models to store data.
*/

import { Field, ID, ObjectType, Root } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  @Column("bool", { default: false })
  confirmed: boolean;
}
