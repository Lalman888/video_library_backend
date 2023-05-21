import { Request, Response } from 'express';
import { findUserByEmail } from '../user/user.service';
import { StatusCodes } from 'http-status-codes';
import { signJwt } from './auth.utils';
import omit from '../../helpers/omit';
import { LoginBody } from './auth.schema';

export async function loginHandler(req: Request<{},{},LoginBody>, res: Response) {

  const {email, password} = req.body;

//   find user
  const user = await findUserByEmail(email);

//   check user exists
    if (!user || !user.comparePassword(password)) {
        return res.send(StatusCodes.UNAUTHORIZED).send('Invalid email or password');
    }

//   create token

      const payload = omit(user.toJSON(),['password','_id']);
      const jwt = signJwt(payload);

      res.cookie("accessToken",jwt,
      {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
            domain: process.env.COOKIE_DOMAIN || "localhost",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "strict",
      })

      return res.status(StatusCodes.OK).send({
        'token': jwt,
      });

}