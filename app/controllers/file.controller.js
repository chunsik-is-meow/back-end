const Chaincode = require('../../fabric/chaincode');
const fs = require('fs');

const upload = async (req, res) => {
  const filename = req.params.filename;
  const org = "management.pusan.ac.kr"
  const type = req.params.type;
  if (type === 'data') {
    const result = await Chaincode.invoke(org, 'data', 'data', req.body.params);
    res.status(200).send(result);
  } else if (type === 'model') {
    //TODO yohan
    var options = {
      scriptPath: path.join(__dirname, "../../evaluate/"),
      args: [JSON.stringify({ result }), JSON.stringify({ inputData })]
    };
    PythonShell.run("evaluate_model.py", options, function(err, data) {
      res.status(200).json({ data: JSON.parse(data), success: true });
    });

    const score = 90;
    const params = [...req.body.params, score]
    const result = await Chaincode.invoke(org, 'ai-model', 'ai-model', params);
    res.status(200).send(result);
  }
};

const download = async (req, res) => {
  const filename = req.params.filename;
  const version = req.body.version;
  const owner = req.body.uploader;
  const downloader = req.body.downloader;
  const type = req.params.type;
  const org = "management.pusan.ac.kr"

  if (type === 'data') {
    const params = ['GetCommonDataContents', owner, filename, version, downloader]
    const result = await Chaincode.invoke(org, 'data', 'data', params);
    const decodingContents = Buffer.from(result, "base64").toString('utf8');

    // !fs.existsSync("./download") && fs.mkdirSync("./download/data", { recursive: true });
    !fs.existsSync("./download") && fs.mkdirSync("./download");
    !fs.existsSync("./download/data") && fs.mkdirSync("./download/data");

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
    const params = ['GetAIModelContents', owner, filename, version, downloader]
    const result = await Chaincode.invoke(org, 'ai-model', 'ai-model', params);
    const decodingContents = Buffer.from(result, "base64").toString('utf8');

    !fs.existsSync("./download") && fs.mkdirSync("./download");
    !fs.existsSync("./download/ai-model") && fs.mkdirSync("./download/ai-model");

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