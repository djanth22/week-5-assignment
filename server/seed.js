import { db } from "./server.js";
// import { db } from "..server/server.js";

db.query(`CREATE TABLE IF NOT EXISTS cv (
id SERIAL PRIMARY KEY,
username VARCHAR(50),
firstname TEXT,
lastname TEXT,
user_email TEXT,
personalsummary TEXT,
mainsection TEXT,
education TEXT,
linkstosocials  TEXT,
skills TEXT,
projects TEXT
);`);
