import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import tradeRoutes from "./routes/trade.js";
import TRADE from "./models/TRADE.js";
import GDP from "./models/GDP.js";
import { tradeValues, gdpValues, partners } from "./data/data.js";
import gdpRoutes from './routes/gdp.js'
import partnerRoutes from "./routes/partner.js"
import PARTNERS from './models/PARTNERS.js';

dotenv.config()
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/trade", tradeRoutes);
app.use("/gdp", gdpRoutes);
app.use("/partner", partnerRoutes);

const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME ONLY OR AS NEEDED */
    await mongoose.connection.db.dropDatabase();
    TRADE.insertMany(tradeValues);
    GDP.insertMany(gdpValues);
    PARTNERS.insertMany(partners);
  })
  .catch((error) => console.log(`${error} did not connect`));