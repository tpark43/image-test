import { Image } from '../models/Image';

export class ImageService {
    constructor() {
        this.image = Image;
    }

    uploadFile(file) {
        return new Image({
            key: file.filename,
            originalFileName: file.originalname
        }).save();
    }

    selectImages() {
        return this.image.find();
    }
}