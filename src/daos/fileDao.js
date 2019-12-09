import File, { FileCollection } from '../models/File';

export const getAll = async () => {
  try {
    const files = await File.where({ is_deleted: false }).fetchAll({ withRelated: ['user', 'approved_by'] });
    return files.toJSON();
  } catch (err) {
    throw err;
  }
}

export const getDetail = async (id) => {
  try {
    const file = await File.forge({ id }).fetch({ withRelated: ['user.user_avatar'] });
    return file;
  } catch (err) {
    throw err;
  }
}

export const updateDetails = async (id, approver_id) => {
  try {
    const file = await getDetail(id);
    const updatedFile = await file.save({ is_approved: true, approver_id });
    return updatedFile;
  } catch (err) {
    throw err;
  }
}

export const getCount = async () => {
  try {
    const count = await File.where({ is_deleted: false }).count();

    return count;
  } catch (err) {
    throw err;
  }
}


export const bulkSave = async (files) => {
  try {
    const newFiles = await FileCollection.forge(files).invokeThen('save');
    return JSON.parse(JSON.stringify(newFiles));
  } catch (err) {
    throw err;
  }
}

export const softDeleteFile = async (fileId) => {
  try {
    const deleteFile = await getDetail(fileId);
    const deleted = await deleteFile.save({ is_deleted: true });
    return JSON.parse(JSON.stringify(deleted));
  } catch (err) {
    throw err;
  }
}
