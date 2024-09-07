const express = require("express");
const app = express();

app.use((req, res, next) => {
  const start = Date.now();
  const { method, url } = req;
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${method} ${url} by Rahul`);

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`request took ${duration} ms`);
  });

  next(); //for every request (endpoint) and to pass it to the next route
});
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
