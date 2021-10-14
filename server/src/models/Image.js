import { Schema, model } from 'mongoose';

const ImageSchema = new Schema({
    key: { type: String, required: true },
    originalFileName: { type: String, required: true }
}, {
    timestamps: true
});

export const Image = model("image", ImageSchema);

