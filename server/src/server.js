require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { router } from './routes';

const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use('/uploads', express.static("uploads"));
app.use(express.json());
app.use(cookieParser());

// routers
app.use('/api', router);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(400).json({
        message: err.message
    });
});

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is started on ${PORT}`);
    });
}).catch(err => {
    console.error(err);
});
