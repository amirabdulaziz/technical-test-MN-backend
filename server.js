const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { swaggerUi, specs } = require("./Swagger");

const app = express();
const PORT = 8081;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12773505",
  password: "RIfhJtUX3A",
  database: "sql12773505",
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
