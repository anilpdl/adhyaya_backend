import File, { FileCollection } from '../models/File';

export const getAll = async () => {
  try {
    const files = await File.forge().fetchAll({ withRelated: ['user']});
    return files;
  } catch(err) {
    return err;
  }
}
export const bulkSave = async (files) => {
  try {
    const newFiles = await FileCollection.forge(files).invokeThen('save');
    return JSON.parse(JSON.stringify(newFiles));
  } catch(err) {
    return err;
  }
}
