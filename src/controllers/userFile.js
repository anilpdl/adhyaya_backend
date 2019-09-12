import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as User from '../daos/userDao';
import * as UserInvitation from '../daos/userInvitation';

import config from '../config/jsonconfig';

const responseMessage = {
  SIGNIN_SUCCESS: 'Signed in successfully',
  SIGNIN_EMPTY: 'Invalid Credentials Provided',
  SIGNIN_ERROR: 'Incorrect Email or Password '
}

export const bulkSaveFile = async (req, res) => {
  
}