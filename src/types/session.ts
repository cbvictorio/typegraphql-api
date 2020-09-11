import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class SessionEntity {
    @Field()
    token!: string
}