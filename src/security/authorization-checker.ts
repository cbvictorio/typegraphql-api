import { AuthChecker } from 'type-graphql';

export const authChecker : AuthChecker = (
    { context },
    roles
) => {
    try {
        // if validating ONLY roles
        const { user }: any = context;
        const { rls, usr } = user;
        if (!rls || !usr) return false;
        return validateRoles(rls, roles);


        // if validating PERMISSION 
        // return something else
    } catch (e) {
        return false;
    }
}

function validateRoles(rolesFromUser: string[], neededRoles: string[]): boolean {
    let userPermitted: boolean = false;

    for (let role of rolesFromUser) {
        if (neededRoles.find(neededRole => role === neededRole)) {
            userPermitted = true;
            break;
        }
    }

    return userPermitted;
}


function validatePermission() {
    // validate role
    // validate permissions
}