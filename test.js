const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: `http://localhost:3000`,
  credentials: true,
}));

const PORT = process.env.PORT || 4000;

const data = [{"name":"test","type":"data","description":"test","downloaded":0,"owner":"test","Contents":"test","timestamp":"2021-08-27-09-11-49"},
{"name":"iris","type":"data","description":"iris_classfication","downloaded":0,"owner":"R.A.Fisher","Contents":".9,03,4.7a","timestamp":"2021-09-10-14-10-46"}]

const aimodel =[{"type":"ai-model","name":"test","language":"test","price":100,"owner":"test","score":100,"description":"test","Contents":"test","timestamp":"2021-08-27-09-11-49"},
{"type":"ai-model","name":"test_model","language":"Python","price":100,"owner":"CCC","score":81,"description":"test_input","Contents":"testtesttesttest!testtesttesttesttesttest","timestamp":"2021-09-10-15-21-44"}]


const transfer = [{"type":"transfer","from":"bank","to":"hyoeun","amount":300000,"timestamp":"2021-08-27"},{"type":"transfer","from":"bank","to":"hyoeun","amount":300000,"timestamp":"2021-08-27-09-11-49"},
{"type":"transfer","from":"hyoeun","to":"yohan","amount":30,"timestamp":"2021-08-27-09-11-49"}]

//DATA

for(i in data){
  data[i]['num']=parseInt(i)+1;
  delete data[i].Contents;
  delete data[i].type;
}
//AIMODEL
for(var i in aimodel){

  aimodel[i]['num']=parseInt(i)+1;
  delete aimodel[i].Contents;
  delete aimodel[i].type;
}


//TRANSFER

for(var i in transfer){

  transfer[i]['num']=parseInt(i)+1;
  delete transfer[i].type;
}


app.get("/", (req, res) => {
  res.json({ message: "back-end server" });
});

app.post("/data", (req, res) => {
  res.json({data:data});
});

app.post("/aimodel", (req, res) => {
  res.json({data:aimodel});
});

app.post("/transfer", (req, res) => {
  res.json({data:transfer});
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}.`);
});
