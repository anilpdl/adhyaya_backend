import _ from 'lodash';

import * as AuthController from './authController';
import * as Files from '../daos/fileDao';
import * as UserFile from '../daos/userFileDao';
import { uploader, utils } from '../config/cloudinary';
import { dataUri } from '../middlewares/multer';
import * as UserAvatar from '../daos/userAvatarDao';

const responseMessage = {
  SUCCESS: 'Signed in successfully',
  ERROR: 'Something went wrong when uploading files',
  DELETE_ERROR: 'Error deleting file'
};

export const getAll = async (req, res) => {
  const authData = await AuthController.checkAccess(req, res);
  if (authData.isAdmin) {
    const files = await Files.getAll();
    res.status(200).send(files);
  }
};

export const getUserFiles = async (req, res) => {
  const authData = await AuthController.checkAccess(req, res);
  if (authData.isAdmin) {
    const files = await Files.getUserFiles();
    res.status(200).send({ files });
  }
};

const uploadFileToCloudinary = async file => {
  try {
    const { originalname } = file;
    const fileToUpload = dataUri(file);
    const uploadedFile = await uploader.upload(fileToUpload);

    return { ...uploadedFile, originalname };
  } catch (err) {
    throw err;
  }
};

const saveFiles = async files => {
  try {
    const newFiles = await Files.bulkSave(files);
    return newFiles;
  } catch (err) {
    return err;
  }
};

export const create = async (req, res) => {
  const { userId } = req.params;
  const { files } = req;
  if (files.length) {
    try {
      const uploadedFiles = await Promise.all(
        files.map(file => uploadFileToCloudinary(file))
      );
      const uploadedFileUrls = uploadedFiles.map(
        ({ format, secure_url, originalname }) => ({
          name: originalname,
          url: secure_url,
          format
        })
      );
      const savedFiles = await saveFiles(uploadedFileUrls);
      const userFiles = savedFiles.map(file => ({
        file_id: file.id,
        user_id: parseInt(userId)
      }));
      const savedUserFiles = await UserFile.bulkSaveFile(userFiles);
      return res.status(200).json({
        files: savedUserFiles
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: responseMessage.ERROR
      });
    }
  } else {
    res.status(400).json({
      message: responseMessage.ERROR
    });
  }
};

export const createOrUpdateAvatar = async ({ url, user_id }) => {
  const avatar = await UserAvatar.getDetail(user_id);
  if (avatar) {
    const updatedUrl = await avatar.save({ url });
    return updatedUrl;
  }

  const userAvatar = await UserAvatar.create({ url, user_id });
  return userAvatar;
};

export const createAvatar = async (req, res) => {
  const { userId } = req.params;
  const { file } = req;

  if (file) {
    try {
      const uploadedFile = await uploadFileToCloudinary(file);
      const { secure_url: url } = uploadedFile;
      const userAvatar = await createOrUpdateAvatar({ url, user_id: userId });
      return res.status(200).json(userAvatar);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: responseMessage.ERROR
      });
    }
  } else {
    res.status(400).json({
      message: responseMessage.ERROR
    });
  }
};

export const fetchDetail = async (req, res) => {
  const { fileId } = req.params;
  const authData = await AuthController.checkAccess(req, res);
  if (!authData.isInvalid) {
    try {
      const file = await Files.getDetail(fileId);
      return res.send(file);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: responseMessage.ERROR
      });
    }
  }
};

export const updateDetails = async (req, res) => {
  const { fileId } = req.params;
  const { approverId } = req.body;
  const authData = await AuthController.checkAccess(req, res);
  if (authData.isAdmin) {
    try {
      const file = await Files.updateDetails(fileId, approverId);
      return res.send(file);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: responseMessage.ERROR
      });
    }
  }
};

export const deleteFile = async (req, res) => {
  const { fileId } = req.params;

  try {
    const file = await Files.softDeleteFile(fileId);
    return res.send({
      message: 'File deleted successfully'
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: responseMessage.DELETE_ERROR
    });
  }
};
