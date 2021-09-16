// const Chaincode = require('../../fabric/chaincode');
// const fs = require('fs');
const path = require('path');

// const invoke = async (req, res) => {
//   var org = '';
//   if (req.role == "user") {
//     org = "trader.pusan.ac.kr"
//   }
//   else if (req.role == "admin") {
//     org = "management.pusan.ac.kr"
//   }
//   else if (req.role == "verifier") {
//     org = "verification-01.pusan.ac.kr"
//   }
//   const result = await Chaincode.invoke(org, req.body.channel_name, req.body.chaincode_name, req.body.params);
//   res.status(200).send(result);
// };

const download = (req, res) => {
  const filename = req.params.filename;
  const type = req.params.type;
  const directoryPath = path.join(__dirname, "../../../blockchain/upload/" + type + "/" + filename);
  console.log(directoryPath);

  res.download(directoryPath, filename, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  download,
};