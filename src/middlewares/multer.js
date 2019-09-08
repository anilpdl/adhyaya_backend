import multer from 'multer';
import Datauri from 'datauri';
import path from 'path';

const storage = multer.memoryStorage();

const multerUploads = multer({ storage }).array('file');

const dUri = new Datauri();

const dataUri = file => {
  const uri = dUri.format(path.extname(file.originalname).toString(), file.buffer);
  return uri.content;
};

export { multerUploads, dataUri };
