import "@babel/polyfill";
import express from 'express';
import routes from './routes/routes';
import http from 'http';
import { setupWebsocket } from './config/websocket';

const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const server = http.Server(app);
const uri = "mongodb+srv://omnistack:omnistack@cluster0-1u44w.mongodb.net/week10?retryWrites=true&w=majority";
const port = process.env.PORT || 3333;

setupWebsocket(server);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

app.use(cors())
app.use(express.json());
app.use(routes);
server.listen(port);

console.log(`Server is running on port: ${port}`);
