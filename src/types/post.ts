import { InputType, Field } from 'type-graphql';

@InputType()
export class PostInput {
    @Field()
    title!: String

    @Field()
    description!: String
}