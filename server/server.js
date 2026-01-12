import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import incomeRoute from './routes/incomeRoute.js';


dotenv.config({
    path: './.env'
})
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.use(cors(
    {
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173',process.env.CLIENT_URL],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    }
))


app.use(express.urlencoded({ extended: true }))
app.use('/uploads',express.static(path.join(__dirname,"uploads")))
app.use(cookieParser())

app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/api/auth',authRoute);
app.use('/api/income',incomeRoute);

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`server is running on port ${process.env.PORT || 3000}`);
        })
    })
    .catch((error) => {
        console.log("error in database connection :", error)
    })