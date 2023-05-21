import { Request,Response,NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

function requireUser(req: Request, res: Response, next: NextFunction) {
   const user = res.locals.user;

    if (!user) {
        return res.send(StatusCodes.FORBIDDEN).send( { error: 'Unauthorized' });
    }

    return next();
}

export default requireUser;