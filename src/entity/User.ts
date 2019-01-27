/* 
User entity deifned here creats a User table in the underlying Postgres DB.

This is a TypeORM entity which would be unmarshalled to generate a DB table with
with the column names mapping to the field names provided here.

TypeORM definition for an entity maps directly to 
how one would go about definfing the models to store data.
*/

import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
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
  @Column("text", { unique: true })
  email: string;

  @Column()
  password: string;
}
