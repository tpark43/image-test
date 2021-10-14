import multer from 'multer';
import {v4 as uuid} from 'uuid';
import mimeType from 'mime-types';

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads'),
    filename: (req, file, cb) => cb(null, `${uuid()}.${mimeType.extension(file.mimetype)}`)
})

export const upload = multer({ 
    storage, 
    fileFilter: (req, file, cb) => {
        if(!['image/png', 'image/jpeg'].includes(file.mimetype)) {
            cb(new Error('Invaild file type'), false);
            return;
        }
        cb(null, true)
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5M
    } 
});