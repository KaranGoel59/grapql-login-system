import { Request, Response, NextFunction } from 'express';

export default ((err: Error, req: Request, res: Response, next: NextFunction) => {
    const errorObject = {error: true, message: `${err.name}: ${err.message}`};
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json(errorObject);
    } else {
        return res.status(400).json(errorObject);
    }
});
