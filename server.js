const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, 
}));

const db = require("./app/models");
db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "back-end server" });
});

require("./app/routes/routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});




////////////////////////////////////////////////////////////////////////////////



app.post('/invoke/:channelName/:chaincodeName', async (req, res) => {
  result = await chaincode.invoke(req.params.channelName, req.params.chaincodeName, req.body.params);
  res.send(result);
})

app.get('/query/', async (req, res) => {
  result = await chaincode.invoke(req.body.channelName, req.body.chaincodeName, req.body.params);
  res.send(result);
})



