import { UserMap } from './user.map';
import { Mutation } from "./user.mutation";
import { Query } from './user.query';

export const resolver = {
  Query,
  User: UserMap,
  Mutation,
};
