import { resolver } from 'graphql-sequelize';
import { User } from '../../models';

export const UserMap = {
    jwt: (user) => user.getJwt(),
};
