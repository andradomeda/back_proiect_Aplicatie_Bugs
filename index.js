import express from 'express';
import env from 'dotenv';
import DB_Init from './enteties/DB_init.js';
import createDbRouter from './routes/createDbRoute.js';
import echipaRouter from './routes/EchipaRouter.js';
import proiectRouter from './routes/ProiectRouter.js';
import membruRouter from './routes/MembruRouter.js';
import testerRouter from './routes/TesterRouter.js';
import bugRouter from './routes/BugRouter.js';

env.config();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to set unrestricted access headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH ,DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Initialize database
DB_Init();

// Attach route handlers
app.use("/api", createDbRouter);
app.use("/api", echipaRouter);
app.use("/api", proiectRouter);
app.use("/api", membruRouter);
app.use("/api", testerRouter);
app.use("/api", bugRouter);

// Start the server
const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log('API is running at ' + port);
});
