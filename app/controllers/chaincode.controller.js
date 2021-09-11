const Chaincode = require('../../fabric/chaincode');

// TODO orgName
exports.query = async (req, res) => {
  var org = '';
  if (req.role == "user") {
    org = "trader.pusan.ac.kr"
  }
  else if (req.role == "admin") {
    org = "management.pusan.ac.kr"
  }
  else if (req.role == "verifier") {
    org = "verification-01.pusan.ac.kr"
  }
  const result = await Chaincode.query(org, req.body.channel_name, req.body.chaincode_name, req.body.params);
  res.status(200).send(result);
};

exports.invoke = async (req, res) => {
  var org = '';
  if (req.role == "user") {
    org = "trader.pusan.ac.kr"
  }
  else if (req.role == "admin") {
    org = "management.pusan.ac.kr"
  }
  else if (req.role == "verifier") {
    org = "verification-01.pusan.ac.kr"
  }
  const result = await Chaincode.invoke(org, req.body.channel_name, req.body.chaincode_name, req.body.params);
  res.status(200).send(result);
};

exports.model = async (req, res) => {
  var org = 'management.pusan.ac.kr';
  const result = await Chaincode.query(org, req.body.channel_name, req.body.chaincode_name, req.body.params);
  res.status(200).send(result);
};

exports.allmodel = async (req, res) => {
  var org = 'management.pusan.ac.kr';
  const result = await Chaincode.query(org, 'ai-model', 'ai-model', 'GetAllAIModelInfo');
  let aimodel = [];
  for(var i in result){
    aimodel[i] = JSON.parse(result[i]);
    aimodel[i]['num']=parseInt(i)+1;
    delete aimodel[i].Contents;
    delete aimodel[i].type;
  }
  res.status(200).send(aimodel);
};

exports.alldata = async (req, res) => {
  var org = '';
  if (req.role == "user") {
    org = "trader.pusan.ac.kr"
  }
  else if (req.role == "admin") {
    org = "management.pusan.ac.kr"
  }
  else if (req.role == "verifier") {
    org = "verification-01.pusan.ac.kr"
  }
  const result = await Chaincode.query(org, 'data', "data", 'GetAllCommonDataInfo');
  //TODO 처리..
  res.status(200).send(result);
};

