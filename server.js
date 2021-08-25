const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: `http://localhost:3000`,
  credentials: true,
}));

const db = require("./app/models");
const Role = db.role;

// db.sequelize.sync();

// ***
// NOTE
// for initial
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "verifier"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
}
// ***

const chaincode = require('./chaincode');

// chaincode.enrollAdmin('management.pusan.ac.kr');

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/chaincode.routes')(app);

app.get("/", (req, res) => {
  res.json({ message: "back-end server" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

