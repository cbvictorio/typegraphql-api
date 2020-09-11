import { 
    Resolver,
    Mutation,
    Arg,
    Query,
    Authorized,
    Ctx
} from 'type-graphql';
import { 
    Repository,
    EntityRepository,
    Transaction,
    EntityManager
} from 'typeorm';
import { AuthenticationError } from 'apollo-server-express';
import { User } from '../entity/User';
import { v4 as uuidv4 } from 'uuid';
import { createToken } from '../security/jwt';
import { UserCredentials, UserEntity, UserInput } from '../types/user';
import { SessionEntity } from '../types/session';
import { Role } from '../types/roles';

@Resolver()
@EntityRepository(User)
export class UserResolver extends Repository<User>{

    @Query(() => SessionEntity, { name: 'login' })
    async findUserByUsernameOrEmail(
        @Arg('credentials', () => UserCredentials) userCredentials: UserCredentials
    ) {
        const { username, email, password } = userCredentials;

        const user = await User.findOne({
            where: [
                { username, password },
                { email, password }
            ]
        })
        
        if (!user) {
            throw new AuthenticationError('Username or password is incorrect');
        }

        const session = new SessionEntity();

        session.token = createToken({
            rls: user.roles,
            usr: user.username
        });

        return session;
    }

    @Authorized(['user', 'admin'])
    @Query(() => UserEntity, { name: 'profile' })
    async getUserInformation(@Ctx() context: any): Promise<User> {
        const { user } = context;
        const userFound = await User.findOne({
            where: { username: user.usr }
        });

        if (!userFound) throw 'Something went wrong!';

        return userFound;
    }

    
    @Transaction()
    @Mutation(() => Boolean, { name: 'register' })
    async createUser(
        _: EntityManager,
        @Arg('userInput', () => UserInput) userInput: UserInput
    ): Promise<Boolean> {
        try {
            const nowUtc = new Date().toISOString();
            const { username } = userInput;
            const foundExistingUser = await User.findOne({
                where: { username }
            });
            
            if (foundExistingUser) throw 'User exists already!';

            const newUser = await User.insert({
                id: uuidv4(),
                createdAt: nowUtc,
                updatedAt: nowUtc,
                roles: [Role.USER],
                ...userInput
            });
            
            return newUser ? true : false;

        } catch (err) {
            return false;
        }
    }
}

