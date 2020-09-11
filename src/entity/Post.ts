import { 
    Field, 
    ObjectType, 
    InterfaceType,
} from 'type-graphql';
import {
    Entity, 
    PrimaryColumn,
    Column,
    BaseEntity,
    ManyToOne
} from 'typeorm';
import { User } from './User';

@InterfaceType({
    resolveType: value => value.banned ? BannedPost : Post
})
export abstract class IPost {
    @Field()
    id!: string

    @Field()
    title!: String;

    @Field({ defaultValue: false })
    banned: boolean;
}

@ObjectType({ implements: IPost })
class BannedPost implements IPost {
    @Field()
    id!: string;

    @Field()
    title!: String;

    @Field()
    banned: boolean;
}

@ObjectType({ implements: IPost })
@Entity()
export class Post extends BaseEntity implements IPost  {
    
    @Field()
    @PrimaryColumn({ unique: true })
    id!: string;
    
    @Field()
    @Column({ length: 100 })
    title!: String;
    
    @Field({ defaultValue: false })
    @Column()
    banned: boolean;

    @Field()
    @Column({ length: 255 })
    description!: String

    @Field()
    @Column({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @Field()
    @Column({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;

    @Field(type => User)
    @ManyToOne(type => User, user => user.posts)
    user!: User;

}



