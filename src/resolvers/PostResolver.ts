import { Query, Resolver, Mutation, Ctx, Arg, Authorized } from 'type-graphql';
import { Post } from '../entity/Post';
import { EntityRepository, Repository, EntityManager } from 'typeorm';
import { IPost } from '../entity/Post';
import { User } from '../entity/User';
import { PostInput } from '../types/post';
import { v4 as uuidv4 } from 'uuid';

@Resolver()
@EntityRepository(Post)
export class PostResolver extends Repository<Post> {

    @Authorized(['admin', 'user'])
    @Query(() => [IPost])
    async getAllPosts(@Ctx() context: any) {
        const { usr } = context.user;
        const user = await User.findOne({
            where: { username: usr }
        });

        const posts = await Post.find({
            where: { user },
            relations: ['user']
        });

        return posts;
    }


    @Authorized(['admin', 'user'])
    @Mutation(() => Post)
    async createPost(
        @Ctx() context: any,
        @Arg('postInput', () => PostInput) postInput: PostInput
    ) {
        const { title, description } = postInput;
        const nowUtc = new Date().toISOString();
        const user = await User.findOne({
            where: { username: context.user.usr }
        });

        if (!user) throw 'User not found!';

        const post = await Post.create({
            id: uuidv4(),
            createdAt: nowUtc,
            updatedAt: nowUtc,
            title,
            description,
            user,
            banned: false
        }).save();

        console.log(post);


        return post;
    }


}

