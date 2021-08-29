const { authJwt } = require("../middleware");
const controller = require("../controllers/chaincode.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/chaincode/query",
    [authJwt.verifyToken],
    controller.query
  );

  app.post(
    "/api/chaincode/invoke",
    [authJwt.verifyToken],
    controller.invoke
  );
};