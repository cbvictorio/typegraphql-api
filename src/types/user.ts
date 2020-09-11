import { InputType, Field, ObjectType } from 'type-graphql';
import { Role } from '../types/roles';

@InputType()
export class UserInput {
    @Field()
    name!: String

    @Field()
    email!: String

    @Field()
    username!: String

    @Field()
    password!: String
}

@InputType()
export class UserCredentials {
    @Field({ nullable: true })
    email!: String

    @Field({ nullable: true })
    username!: String

    @Field()
    password!: String
}

@ObjectType()
export class UserEntity {
    @Field()
    email!: String

    @Field()
    username: String

    @Field()
    name!: String

    @Field()
    createdAt!: Date

    @Field()
    updatedAt!: Date

    @Field(type => [Role])
    roles!: Role[]
}