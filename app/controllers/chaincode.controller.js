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

