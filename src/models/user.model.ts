import { Table, Column, Model, HasMany, BelongsTo, ForeignKey, BeforeSave } from 'sequelize-typescript';
import { ENV } from './../config';

import bcrypt from 'bcrypt';
import to from 'await-to-js';
import jsonwebtoken from 'jsonwebtoken';

const { JWT_ENCRYPTION, JWT_EXPIRATION } = ENV;

@Table({timestamps: true})
export class User extends Model<User> {

  @Column({primaryKey: true, autoIncrement: true})
  id: number;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({unique: true})
  email: string;

  @Column
  password: string;

  jwt: string;
  login: boolean;
  @BeforeSave
  static async hashPassword(user: User) {
    let err;
    if (user.changed('password')){
        let salt, hash;
        [err, salt] = await to(bcrypt.genSalt(10));
        if(err) {
          throw err;
        }

        [err, hash] = await to(bcrypt.hash(user.password, salt));
        if(err) {
          throw err;
        }
        user.password = hash;
    }
  }

  async comparePassword(pw: string) {
      let err, pass;
      if(!this.password) {
        throw new Error('Does not have password');
      }

      [err, pass] = await to(bcrypt.compare(pw, this.password));
      if(err) {
        throw err;
      }

      if(!pass) {
        throw 'Invalid password';
      }

      return this;
  }

  getJwt(){
      return 'Bearer ' + jsonwebtoken.sign({
          id: this.id,
      }, JWT_ENCRYPTION, { expiresIn: JWT_EXPIRATION });
  }
}