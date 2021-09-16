const express = require("express");
const cors = require("cors");
const app = express();
const db = require('./db/db');
const FabricCAService = require('./fabric/caService');

db.init();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: `http://localhost:3000`,
  credentials: true,
}));

const PORT = process.env.PORT || 4000;

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/chaincode.routes')(app);
require('./app/routes/download.routes')(app);

app.get("/", (req, res) => {
  res.json({ message: "back-end server" });
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}.`);
  await FabricCAService.enrollAdmin('management.pusan.ac.kr');
  await FabricCAService.enrollAdmin('verification-01.pusan.ac.kr');
  await FabricCAService.enrollAdmin('verification-02.pusan.ac.kr');
  await FabricCAService.enrollAdmin('trader.pusan.ac.kr');
});

