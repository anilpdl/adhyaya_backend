import jwt from 'jsonwebtoken';

import * as User from '../daos/userDao';
import config from '../config/jsonconfig';

export const checkAccess = async (req, res) => {
  const { userId } = req.params;
  const authToken = req.headers.authorization;
  const token = authToken.replace('Bearer ', '');
  const authData = await verifyToken(token, userId);
  if (authData.isInvalid) {
    return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
  }

  if (!authData.isSameUser && !authData.isAdmin) {
    return res.status(403).send({ message: 'Access Forbidden' });
  }

  return authData;
}

export const verifyToken = async (token, userId) => {
  try {
    const tokenData = jwt.verify(token, config.secret);
    const _isAdmin = await isAdmin(tokenData);
    const _isSameUser = isSameUser(tokenData, userId);
    return ({ isInvalid: false, isAdmin: _isAdmin, isSameUser: _isSameUser });
  } catch (err) {
    return ({ isInvalid: true });
  }
}

const isAdmin = async (tokenData) => {
  const { id } = tokenData;
  const user = await User.getDetail(id);
  const role = user.get('role');

  return role == 'admin';
}

const isSameUser = (tokenData, userId) => {
  const { id } = tokenData;
  return id == userId;
}

export const getDetail = async (req, res) => {
  const { userId } = req.params;
  const authToken = req.headers.authorization;
  const token = authToken.replace('Bearer ', '');
  const dec = jwt.verify(token, config.secret);
  console.log(dec)

  jwt.verify(token, config.secret, async function (err, decoded) {
    if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
    const { id } = decoded;
    const user = await User.getDetail(id);
    const role = user.get('role');
    if (role != 'admin') {
      if (id != userId) {
        return res.status(403).send({ message: 'Access Forbidden' })
      }
    }
    if (userId) {
      const user = await User.getDetail(userId);
      return res.status(200).json({
        user
      });
    }
  });
}
