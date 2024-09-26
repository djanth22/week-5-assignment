import { db } from "./server.js";
// import { db } from "..server/server.js";

db.query(`CREATE TABLE IF NOT EXISTS cv (
id SERIAL PRIMARY KEY,
firstname TEXT,
lastname TEXT,
useremail TEXT,
personalsummary TEXT,
mainsection TEXT,
education TEXT,
linkstosocials  TEXT,
skills TEXT,
projects TEXT
);`);
