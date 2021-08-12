const chaincode = require('./chaincode');
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.post('/invoke/:channelName/:chaincodeName', async (req, res) => {
    result = await chaincode.invoke(req.params.channelName, req.params.chaincodeName, req.body.params);
    res.send(result);
})

app.get('/query/', async (req, res) => {
    result = await chaincode.invoke(req.body.channelName, req.body.chaincodeName, req.body.params);
    res.send(result);
})
    
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})