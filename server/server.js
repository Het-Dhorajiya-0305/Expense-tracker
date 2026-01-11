import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import cookieParser from 'cookie-parser';

dotenv.config({
    path: './.env'
})

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
app.use(express.static("public"))
app.use(cookieParser())

app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/api/auth',authRoute);

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`server is running on port ${process.env.PORT || 3000}`);
        })
    })
    .catch((error) => {
        console.log("error in database connection :", error)
    })