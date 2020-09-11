import { Field, ObjectType, Authorized } from 'type-graphql';
import { Role } from '../types/roles';
import { Post } from './Post';
import { v4 as uuidv4 } from 'uuid';
import { 
    Entity, 
    PrimaryColumn, 
    Column, 
    BaseEntity,
    OneToMany
} from 'typeorm';

@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Authorized(['admin'])
    @Field()
    @PrimaryColumn({ unique: true })
    id!: String;

    @Field()
    @Column({ unique: true })
    email: String;

    @Field()
    @Column({ unique: true, nullable: true })
    username: String;

    @Field()
    @Column()
    name!: String;

    @Field()
    @Column()
    password!: String;

    @Field()
    @Column({ name: 'created_at', type: 'timestamptz' })
    createdAt!: Date;

    @Field()
    @Column({ name: 'updated_at', type: 'timestamptz' })
    updatedAt!: Date;

    @Field(type => [Role])
    @Column({
        type: 'enum',
        enum: Role,
        array: true
    })
    roles!: Role[];

    @Field(type => [Post])
    @OneToMany(type => Post, post => post.user)
    posts: Post[];
    
}