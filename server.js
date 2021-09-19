const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./helpers/dbHelper");
const routers = require("./routers/index");
const customErrorHandler = require("./middlewares/customErrorHandler");
const cors = require("cors");

// Enviroment Variables
dotenv.config();

// Use express as app
const app = express();

//CORS
app.use(cors());

// DB connection
connectDatabase();

// Express - Body Middleware
app.use(express.json());

// Routers Middleware
app.use("/api", routers);

// Error Handling
app.use(customErrorHandler);

// Main Root
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// App Listen
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
