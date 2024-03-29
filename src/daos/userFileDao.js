import UserFile, { UserFileCollection } from '../models/UserFile';


export const bulkSaveFile = async (files) => {
  try {
    const newFiles = await UserFileCollection.forge(files).invokeThen('save');
    return JSON.parse(JSON.stringify(newFiles));
  } catch(err) {
    console.log(err)
    throw err;
  }
}
