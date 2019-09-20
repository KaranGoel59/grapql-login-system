import { Sequelize } from 'sequelize-typescript';
import path from 'path';

export const connect = (dbHost: string, dbPort: number, dbUser: string, dbPass: string, dbName: string) => {

    const database = new Sequelize(dbName, dbUser, dbPass, {
        host: dbHost,
        database: dbName,
        port: dbPort,
        dialect: 'mysql',
        username: dbUser,
        password: dbPass,
        logging: false,
        storage: ':memory:',
        modelPaths: [path.join(__dirname,'../models/*.model.ts')],
        modelMatch: (filename, member) => {
           return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
        },
    });

    return database;
};
