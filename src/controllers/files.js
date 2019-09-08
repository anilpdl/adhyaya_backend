import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as User from '../daos/userDao';
import * as UserInvitation from '../daos/userInvitation';
import { uploader, utils } from '../config/cloudinary';
import { dataUri } from '../middlewares/multer';
import config from '../config/jsonconfig';

const responseMessage = {
  SUCCESS: 'Signed in successfully',
  ERROR: 'Something went wrong when uploading files',
}

const uploadFileToCloudinary = async (file) => {
  try {
    const fileToUpload = dataUri(file);
    const uploadedFile = await uploader.upload(fileToUpload);

    return uploadedFile;
  } catch (err) {
    return err;
  }
}

export const create = async (req, res) => {
  const { files } = req;
  if (files.length) {
    try {
      const uploadedFiles = await Promise.all(files.map((file) => uploadFileToCloudinary(file)));
      return res.status(200).json({
        uploadedFiles
      });
    } catch (err) {
      return res.status(400).json({
        message: responseMessage.ERROR
      });
    }
  }
  else {
    res.status(400).json({
      message: responseMessage.ERROR
    })
  }
}
