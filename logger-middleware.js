const express = require("express");
const app = express();
const morgan = require("morgan");

const requestLogger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const ip = req.ip; // IP address
  const timestamp = new Date().toISOString(); // ISO timestamp

  console.log(`[${timestamp}] ${method} ${url} - ${ip}`);

  next(); // Move to the next middleware or route handler
};
app.use(requestLogger);
const infoLogger = (req, res, next) => {
  console.info(`Info: ${req.method} ${req.url}`);
  next();
};
app.use(infoLogger);

const debugLogger = (req, res, next) => {
  console.warn(
    `Debug: ${req.method} ${req.url} - Params: ${JSON.stringify(req.params)} \n`
  );
  next();
};
app.use(debugLogger);

app.use(morgan("combined"));

// Sample route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
