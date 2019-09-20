import jwt from 'express-jwt';

export default (encryption: string) => {
    return jwt({
        secret: encryption,
        credentialsRequired: false,
    });
};


