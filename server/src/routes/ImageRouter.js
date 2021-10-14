import { Router } from 'express';
import { upload } from '../middlewares/file';
import { ImageService } from '../services/ImageService';

export const imageRouter = Router();

const imageService = new ImageService();

imageRouter.post('/', upload.single('image'), async (req, res) => {
    const image = await imageService.uploadFile(req.file);
    res.json(image);
});

imageRouter.get('/', async (req, res) => {
    console.log(req.cookies);
    const images = await imageService.selectImages();
    res.cookie('token', 'abc123');
    res.json(images);
});
