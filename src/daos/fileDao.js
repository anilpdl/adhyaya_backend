import File, { FileCollection } from '../models/File';

export const getAll = async () => {
  try {
    const files = await File.forge().fetchAll({ withRelated: ['user', 'approved_by'] });
    return files.toJSON();
  } catch (err) {
    throw err;
  }
}

getAll().then(console.log)

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
    console.log(file.toJSON());
    const updatedFile = await file.save({ is_approved: true, approver_id });
    console.log(updatedFile);
    return updatedFile;
  } catch (err) {
    throw err;
  }
}

export const getCount = async () => {
  try {
    const count = await File.forge().count();

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
