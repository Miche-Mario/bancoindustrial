import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js"
import SequelizeStore from "connect-session-sequelize"
import UsersRoute from "./routes/UsersRoute.js"
import TauxRoute from "./routes/TauxRoute.js"
import DemandePretRoute from "./routes/DemandePretRoute.js"
import TransactionRoute from './routes/TransactionRoute.js'
import MessageTypeRoute from './routes/MessageType.js'
import MessagerieRoute from './routes/MessagerieRoute.js'
import AuthRoute from './routes/AuthRoute.js'
dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res
      .status(200)
      .send('Hello server is running')
      .end();
  });
   
  // Start the server
  const PORT = process.env.PORT || 8080;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

(async()=>{
    await db.sync();
})();

app.use(session({
    secret: "ghhgghgdfhdfhdfhdfhgghghg",
    resave: false,
    saveUninitialized: true,
    store: store,
    proxy: true, // Required for Heroku & Digital Ocean (regarding X-Forwarded-For)
    name: 'Cookie', // This needs to be unique per-host.
    cookie: { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 48, sameSite: 'none' }
}));
app.use(cors({
    credentials: true,
    origin: 'https://www.banco-industrial.net'
}));




/* app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
   
    next();
  }); */

app.use(UsersRoute);
app.use(TauxRoute);
app.use(DemandePretRoute);
app.use(TransactionRoute);
app.use(MessageTypeRoute);
app.use(MessagerieRoute);
app.use(AuthRoute)







// Static Images Folder
app.use('/Images', express.static('./Images'))
store.sync();
app.listen(PORT, ()=> {
    console.log('Server up and running...');
});