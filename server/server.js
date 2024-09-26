import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();
export const db = new pg.Pool({
  connectionString: process.env.Database_URL
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
    // "SELECT * FROM cv WHERE user_email= $1 AND user_password = $2",
    // [req.body.formValues.your_name, req.body.formValues.your_pass]
    "SELECT * FROM cv WHERE useremail= $1",
    [req.body.formValues.your_name]
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


app.get("/read-data", async (request, response) => {
  const query = await db.query(`SELECT * FROM cv`);
  response.json(query.rows);
  console.log(query);
});

app.post("/addcv", function (req, res) {
  const bodyData = req.body;
  console.log(bodyData);
  res.json({
    message: "Body data received",
  });
  db.query(
    `INSERT INTO cv(firstname,
lastname,
personalsummary,
mainsection,
education,
linkstosocials,
skills,
projects,
useremail) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9);`,
    [
      `${bodyData.formValues.firstname}`,
      `${bodyData.formValues.lastname}`,
      `${bodyData.formValues.personalsummary}`,
      `${bodyData.formValues.mainsection}`,
      `${bodyData.formValues.education}`,
      `${bodyData.formValues.socials}`,
      `${bodyData.formValues.skills}`,
      `${bodyData.formValues.projects}`,
      `${bodyData.formValues.email}`,
    ]
  );
});

// signup form add data
app.post("/addData", function(req,res){
  console.log(req.body);
  db.query(`INSERT INTO cv (useremail) VALUES ($1)`,
        [req.body.formValues.email]);
});