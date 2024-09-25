import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();
export const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const PORT = 8080;
app.listen(PORT, function () {
  console.log(`server is running in port ${PORT}`);
});

app.get("/", function (req, res) {
  res.json({ message: "this is the root route" });
});

app.post("/add", async function (req, res) {
  const queryResponse = await db.query(
    "SELECT * FROM sign_in WHERE user_email= $1 AND user_password = $2",
    [req.body.formValues.your_name, req.body.formValues.your_pass]
  );

  console.log(queryResponse.rowCount);
  if (queryResponse.rowCount === 1) {
    console.log("welcome");
    res.json({ massage: "Welcome User" });
  } else {
    console.log("error");
    res.json({ massage: "Invalid Login" });
  }
});
