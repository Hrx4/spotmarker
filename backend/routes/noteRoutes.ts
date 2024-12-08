import express from 'express';
import { createNote, deleteNote, getNote, getNotes, updateNote } from '../controllers/noteControllers';
import multer from 'multer';
import fs from 'fs';

const uploadFolder = process.env.UPLOADS_FOLDER || "uploads";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

const router = express.Router();

router.route('/').post( upload.single('image'), createNote)
router.route('/:id').get(getNotes)
router.route('/currentnote/:id/').get(getNote).delete(deleteNote).put(updateNote)
export default router;
