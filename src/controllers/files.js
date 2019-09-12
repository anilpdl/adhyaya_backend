import _ from 'lodash';

import * as AuthController from './authController';
import * as Files from '../daos/fileDao';
import * as UserFile from '../daos/userFileDao';
import { uploader, utils } from '../config/cloudinary';
import { dataUri } from '../middlewares/multer';

const responseMessage = {
  SUCCESS: 'Signed in successfully',
  ERROR: 'Something went wrong when uploading files',
}

export const getAll = async (req, res) => {
  const authData = await AuthController.checkAccess(req, res);
  if (authData.isAdmin) {
    const files = await Files.getAll();
    res.status(200).send(files);
  }
}

export const getUserFiles = async (req, res) => {
  const authData = await AuthController.checkAccess(req, res);
  if (authData.isAdmin) {
    const files = await Files.getUserFiles();
    res.status(200).send({ files });
  }
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

const saveFiles = async (files) => {
  try {
    const newFiles = await Files.bulkSave(files);
    return newFiles;
  } catch(err) {
    return err;
  }
}

export const create = async (req, res) => {
  const { userId } = req.params;
  const { files } = req;
  if (files.length) {
    try {
      const uploadedFiles = await Promise.all(files.map((file) => uploadFileToCloudinary(file)));
      console.log(uploadedFiles)
      const uploadedFileUrls = uploadedFiles.map(({format, secure_url}) => ({ name: format, url:secure_url }));
      const savedFiles = await saveFiles(uploadedFileUrls);
      const userFiles = savedFiles.map(file => ({ file_id: file.id, user_id: parseInt(userId) }));
      const savedUserFiles = await UserFile.bulkSaveFile(userFiles);
      return res.status(200).json({
        files: savedUserFiles
      });
    } catch (err) {
      console.log(err)
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
