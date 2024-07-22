import express from 'express';
import dbConnect from './db/dbconnect.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import productRoute from './routes/productRoute.js';
import itemRoute from './routes/itemRoute.js';
import cartRoute from './routes/cartRoute.js';
import userRoute from './routes/userRoute.js';



const PORT = process.env.PORT || 5000;
const app = express();
const options = [
  cors({
    origin: '*',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
];

app.use(options);
app.use(bodyParser.json()); 
app.use(express.static('public'));
dbConnect();
app.use(express.json());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// app.use(isAuth);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/carts",cartRoute);
app.use("/api/items",itemRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));