import express from 'express';
import routes from './routes/routes';
const mongoose = require('mongoose');
const app = express();

const uri = "mongodb+srv://omnistack:omnistack@cluster0-1u44w.mongodb.net/week10?retryWrites=true&w=majority";
const port = process.env.PORT | 3333;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

app.use(express.json());
app.use(routes);
app.listen(port);

console.log(`Server is running at port: ${port}`);
