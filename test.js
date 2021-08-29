// const FabricCAService = require('./fabric/caService');
const FabricChaincodeService = require('./fabric/chaincode');

const testFunction = async () => {
  // await FabricCAService.enrollAdmin('management.pusan.ac.kr');
  // await FabricCAService.enrollAdmin('verification-01.pusan.ac.kr');
  // await FabricCAService.enrollAdmin('verification-02.pusan.ac.kr');
  // await FabricCAService.enrollAdmin('trader.pusan.ac.kr');

  const result = await FabricChaincodeService.invoke("management.pusan.ac.kr", "trade", "trade", ["GetCurrentMeow","bank"]);
  console.log(result);
}

testFunction();