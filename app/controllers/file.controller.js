const Chaincode = require('../../fabric/chaincode');
const fs = require('fs');

const upload = async (req, res) => {
  const org = "management.pusan.ac.kr"
  const result = await Chaincode.invoke(org, 'data', 'data', req.body.params);
  res.status(200).send(result);
};

const download = async (req, res) => {
  // const filename = req.params.filename;
  const filename = 'test';
  const version = '1.0';
  const owner = 'hyoeun';
  const downloader = req.body.downloader;
  const type = req.params.type;
  const org = "management.pusan.ac.kr"
  const params = ['GetCommonDataContents', owner, filename, version, downloader]

  const result = await Chaincode.invoke(org, 'data', 'data', params);
  const decodingContents = Buffer.from(result, "base64").toString('utf8');

  if (type === 'data') {
    !fs.existsSync("./download") && fs.mkdirSync("./download/data", { recursive: true });
    const filePath = "./download/data/"+filename+".csv";
    fs.writeFile(filePath, decodingContents, (err) => {
      if (err) {
        res.status(500).send('fail to download at server');
      } else {
        res.download(filePath, (err) => {
          if (err) {
            res.status(500).send('fail to download');
          }
        });
      }
    });
  } else if (type === 'model'){
    !fs.existsSync("./download") && fs.mkdirSync("./download/ai-model", { recursive: true });
    const filePath = "./download/ai-model/"+filename+".h5";
    fs.writeFile(filePath, decodingContents, (err) => {
      if (err) {
        res.status(500).send('fail to download at server');
      } else {
        res.download(filePath, (err) => {
          if (err) {
            res.status(500).send('fail to download');
          }
        });
      }
    });
  }
};

module.exports = {
  download,
  upload
};