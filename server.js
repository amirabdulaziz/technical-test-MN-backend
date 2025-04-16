const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const dotenv = require("dotenv");
const { swaggerUi, specs } = require("./Swagger");
const fetch = require("node-fetch");

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 8081;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

app.set("db", db);

const productRoutes = require("./routes/product");

app.use("/api", productRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


app.get("/ping", (req, res) => {
    res.send("pong");
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);

    // ping the server every 10 minutes
  const SELF_URL = process.env.SELF_URL || `http://localhost:${PORT}`;
  setInterval(() => {
    fetch(`${SELF_URL}/ping`)
      .then(res => res.text())
      .then(data => console.log(`Self-ping: ${data}`))
      .catch(err => console.error("Self-ping failed:", err));
  }, 1000 * 60 * 10);

});


