import { ApolloServer } from 'apollo-server-express';
import express, { Application, Router } from 'express';
import { Sequelize } from 'sequelize';
import to from 'await-to-js';

import { resolver as resolvers, schema, schemaDirectives } from './graphql';
import { createContext, EXPECTED_OPTIONS_KEY } from 'dataloader-sequelize';

import { connect } from './db';
import errorHandler from './middlewares/errorHandler';

class App {

    public express: Application;
    public server: ApolloServer;
    public database: Sequelize;

    constructor() {
        this.express = express();
    }

    public connectDB(dbHost: string, dbPort: string, dbUser: string, dbPass: string, dbName: string): void {
        this.database = connect(dbHost, Number(dbPort), dbUser, dbPass, dbName);
    }

    public start(port: string | number| null) {

        this.server = new ApolloServer({
            typeDefs: schema,
            resolvers,
            schemaDirectives,
            playground: true,
            context: ({ req }) => {
                let nreq = <any> req;
                let user = nreq.user;
                return {
                    [EXPECTED_OPTIONS_KEY]: createContext(this.database),
                    user: user,
                };
            }
        });

        const app = this.express;

        // implicit middleware
        app.use(errorHandler);

        this.server.applyMiddleware({ app });

        port = process.env.PORT || port;

        this.express.listen(port ,async () => {
            console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${this.server.graphqlPath}`);
            let err;
            [err] = await to(this.database.sync(
                // {force: true},
            ));
        
            if(err){
                console.error('Error: Cannot connect to database');
            } else {
                console.log('Connected to database');
            }
        });
    }
}

export default new App();
